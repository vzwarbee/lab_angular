import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import prodCateService from './prodCateService'
import { toast } from 'react-toastify'


export const getProdCategorys = createAsyncThunk('prodCategory/get-prodCategorys', async (thunkAPI) => {
    try {
        return await prodCateService.getProdCategorys();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});


export const creProdCategory = createAsyncThunk('prodCategory/create-prodCategories', async (prodCate, thunkAPI) => {
    try {
        return await prodCateService.createProdCate(prodCate);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

const initialState = {
    productCategorys: [],
    createdprodCategory: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const prodCateSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProdCategorys.pending, (state) => {
            state.isLoading = true
        }).addCase(getProdCategorys.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.productCategorys = action.payload;
            state.message = 'success'
        }).addCase(getProdCategorys.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
            .addCase(creProdCategory.pending, (state) => {
                state.isLoading = true
            }).addCase(creProdCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.createdprodCategory = action.payload;
                state.message = 'success'
                if (state.isSuccess === true) {
                    toast.success("them thanh cong")
                }
            }).addCase(creProdCategory.rejected, (state, action) => {
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

export default prodCateSlice.reducer;
