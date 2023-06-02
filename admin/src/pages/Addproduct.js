import React, { useEffect, } from 'react'
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux'
import 'react-quill/dist/quill.snow.css';
import InputCustom from '../component/UI/InputCustom';
import * as yup from 'yup';
import { useFormik } from 'formik'
import HeadTitle from '../component/UI/titleHead'
import { getBrands } from '../features/brand/brandSlice';
import { getProdCategorys } from '../features/proCate/prodCateSlice';
import Dropzone from 'react-dropzone'
import { InboxOutlined } from '@ant-design/icons';
import { uploadImg, deleteImg } from '../features/upload/uploadSlice';
import { creProduct } from '../features/product/productSlice';
import { useNavigate } from 'react-router-dom';



let schema = yup.object().shape({
    title: yup.string().required("Trường title bắt buộc"),
    description: yup.string().required("Trường description bắt buộc"),
    price: yup.number().required("Trường price bắt buộc"),
    prodCategory: yup.string().required("Phải chọn 1 category product"),
    brand: yup.string().required("Phải chọn 1 brand"),
    quantity: yup.number().required("Bắt buộc nhập số lượng"),

});



const Addproduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProdCategorys())
        dispatch(getBrands());
        dispatch(uploadImg());
    }, [dispatch])

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: "",
            prodCategory: "",
            brand: "",
            quantity: "",
            image: " ",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(creProduct(values))
            formik.resetForm()
            setTimeout(() => {
                navigate('/admin/product-list')
            }, 3000)

        }
    });

    const prodCateState = useSelector((state) => state.productCategory.productCategorys
    );
    const brandState = useSelector((state) => state.brand.brands);
    const imageState = useSelector((state) => state.upload.images);


    const img = [];

    imageState.forEach(i => {
        img.push(
            {
                public_id: i.public_id,
                url: i.url
            }
        );
    });

    useEffect(() => {
        formik.values.image = img;
    }, [img]);





    return (
        <div>
            <HeadTitle title="Add product" />
            <h3 className='mb-4 title'>Add Product</h3>
            <div>
                <form action='' onSubmit={formik.handleSubmit} >
                    <InputCustom
                        type="text"
                        i_id="title"
                        name="title"
                        label="Enter title product..."
                        val={formik.values.title}
                        onCh={formik.handleChange('title')}
                        onBlr={formik.handleBlur('title')} />
                    <div className=' error mb-3'>{formik.touched.title && formik.errors.title}</div>

                    <ReactQuill
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange('description')}
                        className='bg-white'
                        theme="snow"
                    />

                    <InputCustom
                        type="text"
                        i_id="price"
                        name="price"
                        label="Enter title price..."
                        val={formik.values.price}
                        onCh={formik.handleChange('price')}
                        onBlr={formik.handleBlur('price')} />

                    <div className=' error mb-3'>{formik.touched.price && formik.errors.price}</div>

                    <select
                        className="form-control py-3 mb-3"
                        name="prodCategory"
                        value={formik.values.prodCategory}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Select product category</option>
                        {prodCateState.map((i, key) => (
                            <option key={key} value={i.title}>
                                {i.title}
                            </option>
                        ))}
                    </select>

                    <div className=' error mb-3'>{formik.touched.prodCategory && formik.errors.prodCategory}</div>

                    <select
                        className="form-control py-3 mb-3"
                        name="brand"
                        value={formik.values.brand}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Select product category</option>
                        {brandState.map((i, key) => (
                            <option key={key} value={i.title}>
                                {i.title}
                            </option>
                        ))}
                    </select>
                    <div className=' error mb-3'>{formik.touched.brand && formik.errors.brand}</div>

                    <InputCustom i_class='mb-4' type="text" label="Enter title quantity..."
                        name="quantity"
                        val={formik.values.quantity}
                        onCh={formik.handleChange('quantity')}
                        onBlr={formik.handleBlur('quantity')} />
                    <div className=' error mb-3'>{formik.touched.quantity && formik.errors.quantity}</div>

                    <div className='d-flex justify-content-center align-items-center bg-light p-5 mb-4'>
                        <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section >
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <InboxOutlined className='fs-1 red text-center' />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>

                    <div className='d-flex flex-wrap gap-3 showImages'>
                        {imageState?.map((i, j) => {
                            return (
                                <div key={j} className='position-relative'>
                                    <button onClick={() => dispatch(deleteImg(i.public_id))}
                                        type='button'
                                        className='text-danger btn-close position-absolute' style={{ top: "15px", right: "7px" }}>

                                    </button>
                                    <img src={i.url} alt={i.public_id} style={{ width: "10rem", height: "10rem" }} />
                                </div>
                            )
                        })}
                    </div>
                    <div className=' error mb-3'>{formik.touched.image && formik.errors.image}</div>

                    <button className='btn btn-success border-0 rounded-3 my-4' type='submit'>Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default Addproduct