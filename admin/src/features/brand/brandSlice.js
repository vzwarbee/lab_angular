import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import brandService from './brandService'
import { toast } from 'react-toastify';


export const getBrands = createAsyncThunk('brand/get-brands', async (thunkAPI) => {
    try {
        return await brandService.getBrands();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});


export const creBrand = createAsyncThunk('brand/create-brands', async (brand, thunkAPI) => {
    try {
        return await brandService.createBrand(brand);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

const initialState = {
    brands: [],
    createdBrand: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBrands.pending, (state) => {
            state.isLoading = true
        }).addCase(getBrands.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.brands = action.payload;
            state.message = 'success'
        }).addCase(getBrands.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
            .addCase(creBrand.pending, (state) => {
                state.isLoading = true
            }).addCase(creBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.createdBrand = action.payload;
                state.message = 'success'
                if (state.isSuccess === true) {
                    toast.success("thêm thành công")
                }
            }).addCase(creBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
    },
})

export default brandSlice.reducer;
