module first_package::my_module {

    // Part 1: Imports
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    // Part 2: Struct definitions
    // The key ability indicates the struct is a Sui object 
    // that you can transfer between addresses
    // The store ability allow the struct to appear 
    // in other struct fields and be transferred freely
    struct Sword has key, store {
        id: UID,
        magic: u64,
        strenght: u64,
    }

    struct Forge has key, store {
        id: UID,
        swords_created: u64,
    }

    // Part 3: Module initializer executed during publish time
    // Special function invoked exactly once when the module is published
    fun init(ctx: &mut TxContext) {
        let admin = Forge {
            id: object::new(ctx),
            swords_created: 0,
        };
        // Transfer the forge object to the module/package publisher
        transfer::transfer(admin, tx_context::sender(ctx));
    }

    // Part 4: Accessors required to read the struct attributes
    public fun magic(self: &Sword): u64 {
        self.magic
    }

    public fun strenght(self: &Sword): u64 {
        self.strenght
    }

    public fun swords_created(self: &Forge): u64 {
        self.swords_created
    }

    // Part 5: Public/entry functions (introduced later in the tutorial)
    public entry fun sword_create(forge: &mut Forge, magic: u64, strenght: u64, recipient: address, ctx: &mut TxContext) {
        use sui::transfer;

        // Create a sword
        let sword = Sword {
            id: object::new(ctx),
            magic: magic,
            strenght: strenght,
        };
        forge.swords_created = forge.swords_created + 1;
        // Transfer sword
        transfer::transfer(sword, recipient);
    }

    public entry fun sword_transfer(sword: Sword, recipient: address, _ctx: &mut TxContext) {
        use sui::transfer;

        // Transfer sword
        transfer::transfer(sword, recipient);
    }

    // Part 6: Private functions (if any)

    // *************************** Tests *******************************
    #[test]
    public fun test_sword_create() {
        use sui::tx_context;
        use sui::transfer;

        // Create a dummy TxContext for testing
        let ctx = tx_context::dummy();

        // Creare a sword
        let sword = Sword {
            id: object::new(&mut ctx),
            magic: 42,
            strenght: 7,
        };

        // Check if acessor functions return correct values
        assert!(magic(&sword) == 42 && strenght(&sword) == 7, 1);

        // Create a dummy address and transfer the sword to avoid
        // compiler and build error "does not have the drop ability)
        let dummy_address = @0xCAFE;
        transfer::transfer(sword, dummy_address);
    }

    #[test]
    fun test_sword_transactions() {
        use sui::test_scenario;
        use std::debug;

        // Create test addresses representing users
        let admin = @0xBABE;
        let initial_owner = @0xCAFE;
        let final_owner = @0xFACE;

        // First transaction to emulate module initiatlization
        let scenario_val = test_scenario::begin(admin);
        let scenario = &mut scenario_val;
        {
            init(test_scenario::ctx(scenario));
        };

        // Second transaction executed by admin to create the sword
        test_scenario::next_tx(scenario, admin);
        {
            // Extract the forge object created during module init
            let forge = test_scenario::take_from_sender<Forge>(scenario);
            let created: u64 = swords_created(&forge); 
            assert!(created == 0, 1);
            debug::print(&x"01");
            debug::print(&created);
            
            // Create the sword and transfer it to the initial owner
            let mforge = &mut forge;
            sword_create(mforge, 42, 7, initial_owner, test_scenario::ctx(scenario));
            created = swords_created(&forge);
            assert!(created == 1, 0);
            debug::print(&x"02");
            debug::print(&created);
            
            // Return the forge to the object pool (it cannot be simply "dropped")
            test_scenario::return_to_sender(scenario, forge);
        };

        // Third transaction executed by the initial owner
        test_scenario::next_tx(scenario, initial_owner);
        {
            // Extract the sword owned by the initial owner
            let sword = test_scenario::take_from_sender<Sword>(scenario);

            // Transfer the sword to the final owner
            sword_transfer(sword, final_owner, test_scenario::ctx(scenario));
        };

        // Fourth transaction executed by the final owner
        test_scenario::next_tx(scenario, final_owner);
        {
            // Extract the sword owned by the final owner
            let sword = test_scenario::take_from_sender<Sword>(scenario);
            
            // Verify the sword has the expected properties
            assert!(magic(&sword) == 42 && strenght(&sword) == 7, 1);

            // Return the sword to the object pool (it cannot be simply "dropped")
            test_scenario::return_to_sender(scenario, sword);
        };
        test_scenario::end(scenario_val);
    }
}