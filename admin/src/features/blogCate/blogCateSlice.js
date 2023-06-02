import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogCateService from './blogCateService'
import { toast } from 'react-toastify'

export const getBlogCates = createAsyncThunk('blogCategory/get-blogcategory', async (thunkAPI) => {
    try {
        return await blogCateService.getBlogCate();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const creBlogCate = createAsyncThunk('blogCate/create-blogCates', async (blogCate, thunkAPI) => {
    try {
        return await blogCateService.createBlogCate(blogCate);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});


const initialState = {
    blogCates: [],
    createdBlogCate: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const blogCateSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBlogCates.pending, (state) => {
            state.isLoading = true
        }).addCase(getBlogCates.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.blogCates = action.payload;
            state.message = 'success'
        }).addCase(getBlogCates.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
            .addCase(creBlogCate.pending, (state) => {
                state.isLoading = true
            }).addCase(creBlogCate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.createdBlogCate = action.payload;
                state.message = 'success'
                if (state.isSuccess === true) {
                    toast.success("Thêm thành công")
                }
            }).addCase(creBlogCate.rejected, (state, action) => {
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

export default blogCateSlice.reducer;
