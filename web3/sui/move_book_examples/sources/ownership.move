module move_book_examples::ownership {

    use move_book_examples::mod_s;
    use std::debug;

    fun main() {

        let s = mod_s::create(10);
        mod_s::value(s);
        debug::print(&s); // compiling error cause s was moved out of main to value()

    }

}

module move_book_examples::mod_s {

    struct S { value: u8 }

    public fun create(value: u8): S {
        S { value }
    }

    public fun value(s: S): u8 {
        let S { value: v } = s;
        v
    }

}