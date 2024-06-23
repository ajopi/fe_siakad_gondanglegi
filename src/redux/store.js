import { configureStore } from "@reduxjs/toolkit";
import getDataSlice from "./slice/getDataSlice";

const store = configureStore({
    reducer: {
        getDataSiswa: getDataSlice
    }
})

console.log("oncreate Store: ", store.getState());

store.subscribe(() => { console.log("store changed", store.getState()) })

export default store;