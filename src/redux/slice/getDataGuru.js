import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const fetchDataGuru = createAsyncThunk(
    'getDataGuru/fetchDataGuru',
    async (_, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem('token')
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/guru`, {
                headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)



const getDataGuru = createSlice({
    name: "getDataGuru",
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
        getDataGuruReducer: (state, action) => {
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDataGuru.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchDataGuru.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload.guru
        })
        builder.addCase(fetchDataGuru.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const { getDataGuruReducer } = getDataGuru.actions
export default getDataGuru.reducer