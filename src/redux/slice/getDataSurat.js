import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDataSurat = createAsyncThunk(
    'getDataSurat/fetchDataSurat',
    async (_, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/dinas`, {
                headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const getDataSurat = createSlice({
    name: 'getDataSurat',
    initialState: {
        loading: false,
        data: [],
        error: null,
    },
    reducers: {
        getDataSuratReducer: (state, action) => {
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDataSurat.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchDataSurat.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.dinas;
        })
        builder.addCase(fetchDataSurat.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

    }
})

export const { getDataSuratReducer } = getDataSurat.actions;
export default getDataSurat.reducer 