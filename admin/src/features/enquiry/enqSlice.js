import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import enqService from './enqService'


export const getEnqs = createAsyncThunk('enquiry/get-enquirys', async (thunkAPI) => {
    try {
        return await enqService.getEnq();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState = {
    enquirys: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const enqSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEnqs.pending, (state) => {
            state.isLoading = true
        }).addCase(getEnqs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.enquirys = action.payload;
            state.message = 'success'
        }).addCase(getEnqs.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
    },
})

export default enqSlice.reducer;
