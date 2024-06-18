import * as toolkit from "@reduxjs/toolkit";

const { configureStore, createAction, createReducer } = toolkit.default ?? toolkit;


// action
const addToCart = createAction("ADD_TO_CART");

// untuk membuat reducer di react toolkit ini bisa menggunakan function createReducer yg mana 
// function tsb memerlukan 2 parameter input, input pertama adalah initialState, parameter kedua builder callback
// didalam builder berfungsi untuk menghandle action tapi tidak menggunakan switch case

// reducer
const cartReducer = createReducer([], (builder) => {
    builder.addCase(addToCart, (state, action) => {
        state.push(action.payload);
    });

})

// store
const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
})




// handle action and dispatch
const action = addToCart({ id: 1, qty: 2 });

// subscribe
console.log("onCreate:", store.getState());
store.subscribe(() => {
    console.log("on subscribe:", store.getState());
})
store.dispatch(action)
