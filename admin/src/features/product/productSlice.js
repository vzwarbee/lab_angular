import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productService from './productService'
import { toast } from 'react-toastify'

export const getProducts = createAsyncThunk('product/get-products', async (thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const creProduct = createAsyncThunk('product/create-products', async (product, thunkAPI) => {
    try {
        return await productService.createProduct(product);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});
export const delProduct = createAsyncThunk('product/delete-products', async (id, thunkAPI) => {
    try {
        return await productService.deleteProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});




const initialState = {
    products: [],
    createdProduct: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.products = action.payload;
        }).addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(creProduct.pending, (state) => {
            state.isLoading = true
        }).addCase(creProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdProduct = action.payload;
            state.message = "success"
            if (state.isSuccess === true) {
                toast.success("Thêm thành công")
            }
        }).addCase(creProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
            if (state.isError === true) {
                toast.error(action.error)
            }
        }).addCase(delProduct.pending, (state) => {
            state.isLoading = true
        }).addCase(delProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.deleteProduct = action.payload;
            state.message = "success"
        }).addCase(delProduct.rejected, (state, action) => {
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

export default productSlice.reducer;
