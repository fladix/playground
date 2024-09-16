module rpg_tutorial::hero {

    use sui::coin::{Self, Coin};
    use sui::event;
    use sui::object::{Self, ID, UID};
    use sui::math;
    use sui::sui::SUI;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use std::option::{Self, Option};


/***************** GAME OBJECTS ******************/

    // Our hero!
    struct Hero has key, store {
        id: UID,
        // Hit points. If zero, the hero can't do anything
        hp: u64,
        // Experience of the hero
        experience: u64,
        // Hero's minimal inventory
        sword: Option<Sword>,
        // ID of the game user
        game_id: ID,
    }

    // The Hero's trusty sword
    struct Sword has key, store {
        id: UID,
        // Constant set at creation time. Act as multiplier for sword's strenght.
        // Swords with high magic are rarer (cost more).
        magic: u64,
        // Sword grows in strength as we use it
        strength: u64,
        // An ID of the game
        game_id: ID,
    }

    // For healing wounded heroes
    struct Potion has key, store {
        id: UID,
        // Effectiveness of the potion
        potency: u64,
        // An ID of the game
        game_id: ID,
    }

    // A creature that the hero can slay to level up
    struct Boar has key {
        id: UID,
        // Hit points before the boar is slain
        hp: u64,
        // Strenght of this particular boar
        strength: u64,
        // An ID of the game
        game_id: ID,
    }

    // An immutable object that contains information about the
    // game admin. Created only once in the module initializer,
    // hence it cannot be recreated or falsified.
    struct GameInfo has key {
        id: UID,
        admin: address,
    }

    // Capability conveying the authority to create boars and potions
    struct GameAdmin has key {
        id: UID,
        // Total number of boards the admin has created
        boars_created: u64,
        // Total number of potions the admin has created
        potions_created: u64,
        // ID of the game where current user is admin
        game_id: ID,
    }

/***************** EVENTS ************************/

    // Event emitted each time a Hero slains a boar
    struct BoarSlainEvent has copy, drop {
        // Address of the user that slayed the boar
        slayer_address: address,
        // ID of the Hero that slayed the boar
        hero: ID,
        // ID of the now-deceased boar
        boar: ID,
        // ID of the game where the event happened
        game_id: ID,
    }

/***************** CONSTANTS *********************/

    // Upper bound on player's hp
    const MAX_HP: u64 = 1000;
    // Upper bound on how magical a sword can be
    const MAX_MAGIC: u64 = 10;
    // Minimal amount you can pay for a sword
    const MIN_SWORD_COST: u64 = 100;

/***************** ERROR CODES *******************/

    // The boar won the battle
    const EBOAR_WON: u64 = 0;
    // The hero is too tired to fight
    const EHERO_TIRED: u64 = 1;
    // Trying to initialize from a non-admin account
    const ENOT_ADMIN: u64 = 2;
    // Not enough money to purchase the given item
    const EINSUFFICIENT_FUNDS: u64 = 3;
    // Trying to remove a sword, but the hero does not have one
    const ENO_SWORD: u64 = 4;
    // Game integrity error due to failed id cheking
    const EID_MISMATCH: u64 = 5;
    // Assertion errors for testing
    const ASSERT_ERR: u64 = 6;


/***************** GAME CREATION *****************/

    // On module publish, sender creates a new game. 
    // But once it is published, anyone can create a new game.
    fun init(ctx: &mut TxContext) {
        create(ctx);
    }

    // Anyone can create and run their own game, all game objects
    // will be linked to this game
    public entry fun new_game(ctx: &mut TxContext) {
        create(ctx);
    }

    fun create(ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx);
        let id = object::new(ctx);
        let game_id = object::uid_to_inner(&id);

        transfer::freeze_object(
            GameInfo {
                id, 
                admin: sender
            }
        );

        transfer::transfer(
            GameAdmin {
                game_id,
                id: object::new(ctx),
                boars_created: 0,
                potions_created: 0
            }, 
            sender
        );
    }

/***************** GAMEPLAY **********************/

    // Slay the boar with hero's sword, get experience.
    // Aborts if hero has 0 HP or if is not strong enough to slay the boar
    public entry fun slay(game: &GameInfo, hero: &mut Hero, boar: Boar, ctx: &TxContext) {

        check_id(game, hero.game_id);
        check_id(game, boar.game_id);
        
        // Destructuring and destroying the boar: all fields must be specified. 
        // Any fields not used must use _ to avoid compiler error.
        let Boar {id: boar_id, strength: boar_strength, hp, game_id: _} = boar;
        let boar_hp = hp; // we'll use the original hp later to calculate Hero's gained experience
        let hero_strength = hero_strength(hero);
        let hero_hp = hero.hp;
    
        // Attack the boar with the sword until its HP goes to zero
        while (boar_hp > hero_strength) {
            // First, the Hero attacks
            boar_hp = boar_hp - hero_strength;
            // Then, the boar gets a turn to attack. If the boar would kill
            // the Hero, abort, we can't let the boar win
            assert!(hero_hp >= boar_strength, EBOAR_WON);
            hero_hp = hero_hp - boar_strength;
        };
        
        // Hero takes their licks
        hero.hp = hero_hp;
        
        // Hero gains experience proportional to the boar, sword grows in
        // strength by one (if hero is using sword)
        hero.experience = hero.experience + hp; // hp: boar original hit points
        if (option::is_some(&hero.sword)) {
            level_up_sword(option::borrow_mut(&mut hero.sword), 1)
        };
        
        // Let the world knows about the Hero's triumph by emitting an event!
        event::emit(
            BoarSlainEvent {
                slayer_address: tx_context::sender(ctx),
                hero: object::uid_to_inner(&hero.id),
                boar: object::uid_to_inner(&hero.id),
                game_id: id(game)
            }
        );
        // Delete boar object
        object::delete(boar_id);

    }

    public fun hero_strength(hero: &Hero): u64 {
        
        // A Hero with 0 HP is too tired to fight
        if (hero.hp == 0) {
            return 0;
        };

        // Hero can fight without a sword, but will not be very strong
        let sword_strength = 
            if (option::is_some(&hero.sword)) {
                sword_strength(option::borrow(&hero.sword))
            } else {
                0
            };

        // Hero is weaker if he has lower HP
        (hero.experience * hero.hp) + sword_strength
    } 

    fun level_up_sword(sword: &mut Sword, amount: u64) {
        sword.strength = sword.strength + amount
    }

    public fun sword_strength(sword: &Sword): u64 {
        sword.magic + sword.strength
    }

/***************** INVENTORY *********************/

    // Heal the weary Hero with a potion
    public fun heal(hero: &mut Hero, potion: Potion) {
        
        // Check integrity
        assert!(hero.game_id == potion.game_id, EID_MISMATCH);
        
        // Destruct potion and delete it after usage
        let Potion { id, potency, game_id: _ } = potion;
        let new_hp = hero.hp + potency;
        object::delete(id);
        
        // Cap Hero's HP at MAX_HP to avoid int overflows
        hero.hp = math::min(new_hp, MAX_HP); 
    }

    // Add new_sword to the Hero's inventory and return old sword (if any)
    public fun equip_sword(hero: &mut Hero, new_sword: Sword): Option<Sword> {
        option::swap_or_fill(&mut hero.sword, new_sword)
    }

    // Disarm the Hero by returning his sword.
    // Aborts if the Hero does not have one.
    public fun remove_sword(hero: &mut Hero): Sword {
        assert!(option::is_some(&hero.sword), ENO_SWORD);
        option::extract(&mut hero.sword)
    }

/***************** OBJECT CREATION ***************/

    //

/***************** GAME INTEGRITY ****************/

    public fun check_id(game_info: &GameInfo, id: ID) {
        assert!(id(game_info) == id, EID_MISMATCH);
    }

    public fun id(game_info: &GameInfo): ID {
        object::id(game_info)
    }

}