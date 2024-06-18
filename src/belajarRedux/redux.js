import { legacy_createStore } from "redux"

// reducer

const cartReducer = (
    state = {
        cart: [{id: 1, qty: 1}]
    },
    action) => {
    switch (action.type) {
        // value pada case adalah nama fungsinya
        case "ADD_TO_CART":
            return {
                ...state,
                // payload adalah data
                cart: [...state.cart, action.payload]
            }

        default:
            return state
    }
}

// store/wadah dari state
const store = legacy_createStore(cartReducer);
console.log("oncreate store:", store.getState());

// subscribe
store.subscribe(() => {
    console.log("on subscribe:", store.getState());
})


// dispatch
const addCart = { type: "ADD_TO_CART", payload: { id: 2, qty: 1 } };
store.dispatch(addCart)