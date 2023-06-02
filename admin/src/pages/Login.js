import React, { useEffect } from 'react'
import InputformCustom from '../component/UI/inputForm'
import { useNavigate } from 'react-router-dom'
import "../style/login-admin.css"
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'
const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    let schema = yup.object().shape({
        email: yup.string().email("Email không hợp lệ!").required("Trường này bắt buộc nhập!"),
        password: yup.string().required("Trường này bắt buộc nhập!"),

    });

    const formik = useFormik({

        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(login(values))
        }
    });
    const { user, isSuccess, isLoading, message } = useSelector((state) => state.auth)
    useEffect(() => {
        if (!user == null || isSuccess) {
            navigate("admin")
        }
    }, [user, isSuccess, isLoading, message, navigate])
    return (

        <div className='section-loginAdmin'>
            <div class="login-box flex-column" >
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className='text-center'>
                        <h6 className='text-danger'>{message.message === "Rejected" ? "Gmail hoặc mật khẩu không đúng" : ""}</h6>
                    </div>
                    <h2>login</h2>
                    <div class="input-box mb-2">
                        <InputformCustom
                            val={formik.values.email}
                            onCh={formik.handleChange('email')}
                            onBlr={formik.handleBlur('email')}
                            type="text"
                            name="email"
                            id="email"
                            label="Email"
                        />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                        <div className='mb-2 error fs-5'>{formik.errors.email}</div>
                    ) : null}
                    <div class="input-box mb-2">
                        <InputformCustom
                            type="password"
                            name="password"
                            id="password"
                            label="password"
                            val={formik.values.password}
                            onCh={formik.handleChange('password')} />
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className='mb-2 error fs-6'>{formik.errors.password}</div>
                    ) : null}
                    <button type="submit" className='button'>Login</button>
                </form>
            </div>
        </div>

    )
}

export default Login