import { configureStore } from "@reduxjs/toolkit";
import getDataSlice from "./slice/getDataSlice";
import getDataGuru from "./slice/getDataGuru";
import getDataSurat from "./slice/getDataSurat";

const store = configureStore({
    reducer: {
        getDataSiswa: getDataSlice,
        getDataGuruReducer: getDataGuru,
        getDataSuratReducer: getDataSurat
    }
})

console.log("oncreate Store: ", store.getState());

store.subscribe(() => { console.log("store changed", store.getState()) })

export default store;