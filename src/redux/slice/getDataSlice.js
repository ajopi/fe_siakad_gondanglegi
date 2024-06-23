import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDataApi = createAsyncThunk(
    'getDataSiswa/fetchDataApi',
    async (_, { rejectWithValue }) => {
        try {
            const user_token = sessionStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/siswa`, {
                headers: {
                    'x-access-token': user_token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    });

const getDataSlice = createSlice({
    name: "getDataSiswa",
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
        getSiswaData: (state, action) => {
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataApi.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDataApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.siswa;
                // console.log(state.data)
            })
            .addCase(fetchDataApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export const { getSiswaData } = getDataSlice.actions;
export default getDataSlice.reducer