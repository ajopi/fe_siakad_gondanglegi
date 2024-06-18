import * as toolkit from "@reduxjs/toolkit";

const { configureStore, createSlice } = toolkit.default ?? toolkit;

// konsep slice ini adalah konsep yg ada pada redux toolkit
// berfungsi untuk menggabungkan reducer dengan action (simplified code)


// contoh slice, didalam slice ini terdapat reducers, didalam reducers (addToCart) terdapat action
const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart(state, action) {
            state.push(action.payload);
        }

    }
})

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
})

// subscribe
console.log("onCreate:", store.getState());
store.subscribe(() => {
    console.log("on subscribe:", store.getState());
})


// store
store.dispatch(cartSlice.actions.addToCart({ id: 1, qty: 20 }))