module nft_tutorial::onchain_identity {

    use std::option::{Self, Option};

    use sui::transfer;
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use std::string::{Self, String};

    const EProfileMismatch: u64 = 0;

    struct AdminCap has key { id: UID }

    struct UserProfile has key {
        id: UID,
        user_address: address,
        name: String,
        bio: Option<String>,
        twitter_handler: Option<String>,
    }

    public entry fun create_profile(name: vector<u8>, ctx: &mut TxContext) {

        let user_profile = UserProfile {
            id: object::new(ctx),
            user_address: tx_context::sender(ctx),
            name: string::utf8(name),
            bio: option::none(),
            twitter_handler: option::none(),
        };

        transfer::transfer(user_profile, tx_context::sender(ctx));
    }

    public entry fun change_bio(user_profile: &mut UserProfile, new_bio: vector<u8>, ctx: &mut TxContext) {

        // Assert that only the user can modify its own profile
        assert!(user_profile.user_address == tx_context::sender(ctx), EProfileMismatch);

        let old_bio = option::swap_or_fill(&mut user_profile.bio, string::utf8(new_bio));
        _ = old_bio; // delete old bio

    }

    public entry fun delete_profile(_: &AdminCap, user_profile: UserProfile) {
        let UserProfile {
            id,
            user_address: _,
            name: _,
            bio: _,
            twitter_handler: _,
        } = user_profile;

        object::delete(id);
        
    }

}