import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogService from './blogService'
import { toast } from "react-toastify"

export const getBlogs = createAsyncThunk('blog/get-blogs', async (thunkAPI) => {
    try {
        return await blogService.getBlogs();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const creBlog = createAsyncThunk('blog/create-Blogs', async (blog, thunkAPI) => {
    try {
        return await blogService.createBlog(blog);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState = {
    blogs: [],
    createdBlogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBlogs.pending, (state) => {
            state.isLoading = true
        }).addCase(getBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.blogs = action.payload;
            state.message = 'success'
        }).addCase(getBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
            .addCase(creBlog.pending, (state) => {
                state.isLoading = true
            }).addCase(creBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.createdBlogs = action.payload;
                state.message = 'success'
                if (state.isSuccess === true) {
                    toast.success("Thêm thành công")
                }
            }).addCase(creBlog.rejected, (state, action) => {
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

export default blogSlice.reducer;
