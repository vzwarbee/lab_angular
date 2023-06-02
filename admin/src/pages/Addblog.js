import React, { useEffect, } from 'react'
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux'
import 'react-quill/dist/quill.snow.css';
import InputCustom from '../component/UI/InputCustom';
import * as yup from 'yup';
import { useFormik } from 'formik'
import Dropzone from 'react-dropzone'
import { InboxOutlined } from '@ant-design/icons';
import { uploadImg, deleteImg } from '../features/upload/uploadSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getBlogCates } from '../features/blogCate/blogCateSlice';
import { creBlog } from '../features/blog/blogSlice';


let schema = yup.object().shape({
    title: yup.string().required("Trường title bắt buộc"),
    description: yup.string().required("Trường description bắt buộc"),
    category: yup.string().required("Phải chọn 1 category product"),

});

const Addblog = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getBlogCates())
        dispatch(uploadImg());
    }, [dispatch])

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: "",
            image: " ",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values))
            dispatch(creBlog(values))
            formik.resetForm()
            setTimeout(() => {
                navigate('/admin/blog-list')
            }, 3000)

        }
    });

    const blogCateState = useSelector((state) => state.blogCate.blogCates)
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
            <h3 className='mb-4 title'>Add blog</h3>
            <div className=''>
                <form action='' onSubmit={formik.handleSubmit}>
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
                    <div className=' error mb-3'>{formik.touched.image && formik.errors.image}</div>


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
                    <div className='mt-4'>
                        <InputCustom type="text"
                            i_id="title"
                            name="title"
                            label="Enter title blogs..."
                            val={formik.values.title}
                            onCh={formik.handleChange('title')}
                            onBlr={formik.handleBlur('title')} />

                    </div>
                    <div className=' error mb-3'>{formik.touched.title && formik.errors.title}</div>

                    <select
                        className="form-control py-3 mb-3"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Select product category</option>
                        {blogCateState.map((i, key) => (
                            <option key={key} value={i.title}>
                                {i.title}
                            </option>
                        ))}
                    </select>
                    <div className=' error mb-3'>{formik.touched.category && formik.errors.category}</div>
                    <ReactQuill
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange('description')}
                        className='bg-white'
                        theme="snow"
                    />
                    <div className=' error mb-3'>{formik.touched.description && formik.errors.description}</div>

                    <button className='btn btn-success border-0 rounded-3 mt-4' type='submit'>Add blog</button>
                </form>
            </div>
        </div>
    )
}

export default Addblog