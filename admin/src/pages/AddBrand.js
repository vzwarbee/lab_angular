import React, { useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'react-quill/dist/quill.snow.css';
import InputCustom from '../component/UI/InputCustom';
import * as yup from 'yup';
import { useFormik } from 'formik'
import HeadTitle from '../component/UI/titleHead'
import { useNavigate } from 'react-router-dom';
import { creBrand } from '../features/brand/brandSlice';




let schema = yup.object().shape({
    title: yup.string().required("Trường title bắt buộc"),


});
const AddBrand = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            title: "",

        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(creBrand(values))

            formik.resetForm()
            setTimeout(() => {
                navigate('/admin/brand-list')
            }, 3000)

        }
    });




    return (
        <div>
            <HeadTitle title="Add brand" />
            <h3 className='mb-4 title'>Add blog</h3>
            <div className=''>
                <form action='' onSubmit={formik.handleSubmit}>
                    <div className='mt-4'>
                        <InputCustom
                            type="text"
                            i_id="title"
                            name="title"
                            label="Enter title brand..."
                            val={formik.values.title}
                            onCh={formik.handleChange('title')}
                            onBlr={formik.handleBlur('title')}
                        />

                    </div>
                    <div className=' error mb-3'>{formik.touched.title && formik.errors.title}</div>

                    <button className='btn btn-success border-0 rounded-3 mt-4' type='submit'>Add Brand</button>
                </form>
            </div>
        </div>
    )
}

export default AddBrand