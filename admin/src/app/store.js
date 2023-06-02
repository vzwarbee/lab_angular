import { configureStore } from '@reduxjs/toolkit';
import authR from '../features/auth/authSlice'
import customerR from '../features/customers/customerSlice';
import productR from '../features/product/productSlice';
import orderR from '../features/auth/authSlice'
import blogR from '../features/blog/blogSlice';
import blogCateR from '../features/blogCate/blogCateSlice';
import enqSliceR from '../features/enquiry/enqSlice';
import brandR from '../features/brand/brandSlice';
import prodCateR from '../features/proCate/prodCateSlice';
import uploadR from '../features/upload/uploadSlice';
export const store = configureStore({
    reducer: { auth: authR, customer: customerR, product: productR, order: orderR, blog: blogR, blogCate: blogCateR, enquiry: enqSliceR, brand: brandR, productCategory: prodCateR, upload: uploadR },
})