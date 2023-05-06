module objects_tutorial::color_object {

    use sui::tx_context::{Self, TxContext};
    use sui::object::{Self, UID};
    use sui::transfer;

    // Defining Admin Capability and assignint it to the contract publisher
    struct AdminCap has key { id: UID }

    // Module initializer called only when contract is published
    fun init(ctx: &mut TxContext) {
        transfer::transfer(AdminCap { id: object::new(ctx)}, tx_context::sender(ctx))
    }

    struct ColorObject has key {
        id: UID,
        red: u8,
        green: u8,
        blue: u8,
    }

    fun new (red: u8, green: u8, blue: u8, ctx: &mut TxContext): ColorObject {
        ColorObject {
            id: object::new(ctx),
            red,
            green,
            blue,
        }
    }

    public fun get_color(self: &ColorObject): (u8, u8, u8) {
        (self.red, self.green, self.blue)
    }

    // Entry function can only be called if AdminCap is passed. Since the module publisher received
    // the AdminCap during module initialization time, noone else can create ColorObjects
    public entry fun create(_: &AdminCap, red: u8, green: u8, blue: u8, ctx: &mut TxContext) {
        let color_object = new(red, green, blue, ctx);
        transfer::transfer(color_object, tx_context::sender(ctx));
    }

    #[test]
    fun test_color_object() {

        use sui::test_scenario;
        use std::vector;

        //  Create addresses
        let owner = @0xDEF1;
        let not_owner = @0xDEAD;

        // First transaction to emulate module initiatlization
        let scenario_val = test_scenario::begin(owner);
        let scenario = &mut scenario_val;
        {
           init(test_scenario::ctx(scenario));
        };

        // Create a ColorObject and send it to the owner (has AdminCap)
        test_scenario::next_tx(scenario, owner);
        {
            let adm = test_scenario::take_from_sender<AdminCap>(scenario); 
            create(&adm, 255, 0, 255, test_scenario::ctx(scenario));
            test_scenario::return_to_sender(scenario, adm);
        };

        // Verify that @0xDEAD cannot create a ColorObject (has no AdminCap)
        test_scenario::next_tx(scenario, not_owner);
        {
            let adm = test_scenario::ids_for_sender<AdminCap>(scenario);
            assert!(vector::length<object::ID>(&adm) == 0, 0);
        };
        
        // Verify that @0xDEF1 is the actual owner and object's field has expected values 
        test_scenario::next_tx(scenario, owner);
        {
            let object = test_scenario::take_from_sender<ColorObject>(scenario);
            let (red, green, blue) = get_color(&object);
            assert!(red == 255 && green == 0 && blue == 255, 0);
            test_scenario::return_to_sender(scenario, object);
        };

        // Close test scenario properly disposing of scenario_val
        test_scenario::end(scenario_val);

    }

}