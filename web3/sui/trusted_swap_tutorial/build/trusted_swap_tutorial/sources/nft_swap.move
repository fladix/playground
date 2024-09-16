module trusted_swap_tutorial::nft_swap {

    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::object::{Self, UID};
    use sui::sui::SUI;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    const MIN_FEE: u64 = 1000;

    struct Object has key, store {
        id: UID,
        scarcity: u64,
        style: u64,
    }

    struct ObjectWrapper has key {
        id: UID,
        original_owner: address,
        to_swap: Object,
        fee: Balance<SUI>,
    }

    // Anyone can create an object 
    public entry fun create_object(scarcity: u64, style: u64, ctx: &mut TxContext) {
        let object = Object { id: object::new(ctx), scarcity, style };
        transfer::transfer(object, tx_context::sender(ctx)); // Original code uses public_transfer
    }

    // Anyone who owns an Object can request swapping their object..
    // The Object is wrapped into ObjectWrapper and sent to service_address.
    // Object is passed by value, hence removed from Sui's global storage.
    public entry fun request_swap(object: Object, fee: Coin<SUI>, service_address: address, ctx: &mut TxContext) {
        assert!(coin::value(&fee) >= MIN_FEE, 0);
        let wrapper = ObjectWrapper {
            id: object::new(ctx),
            original_owner: tx_context::sender(ctx),
            to_swap: object,
            fee: coin::into_balance(fee),
        };
        transfer::transfer(wrapper, service_address);
    }

    // When the admin has two swap requests with objects that are tradeable, 
    // they execute the swapp and send the ojects to the opposite owner
    public entry fun execute_swap(wrapper1: ObjectWrapper, wrapper2: ObjectWrapper, ctx: &mut TxContext) {
        //Only swap if the objects have equivalent scarcity and distinct styles
        assert!(wrapper1.to_swap.scarcity == wrapper2.to_swap.scarcity, 0);
        assert!(wrapper1.to_swap.style != wrapper2.to_swap.style, 0);

        // Unpack both wrappers and send them to the other owner
        let ObjectWrapper {
            id: id1,
            original_owner: owner1,
            to_swap: object1,
            fee: fee1,
        } = wrapper1;

        let ObjectWrapper {
            id: id2,
            original_owner: owner2,
            to_swap: object2,
            fee: fee2,
        } = wrapper2;

        // Perform the swap
        transfer::transfer(object1, owner2);
        transfer::transfer(object2, owner1);

        // The service provider collects the fees
        let service_address = tx_context::sender(ctx);
        balance::join(&mut fee1, fee2);
        // Here, public_transfer is mandatoy because coin::Coin is an object
        // defined outside our module.
        transfer::public_transfer(coin::from_balance(fee1, ctx), service_address);

        // Effectively delete the wrapper objects
        object::delete(id1);
        object::delete(id2);
    }

}
