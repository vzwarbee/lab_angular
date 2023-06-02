import React from 'react'
import InputCustom from '../component/UI/InputCustom'
import { Link } from 'react-router-dom'
const Resetpassword = () => {
    return (
        <div className='py-5 bg-primary d-flex align-items-center' style={{ minHeight: "100vh", background: "#5698f8" }}>
            <div className='py-5 w-25 bg-white rounded-3 mx-auto p-3'>
                <h4 className='text-center mb-4'>Reset Password</h4>
                <form action=''>
                    <InputCustom type="password" id="pass" label="New Password" />
                    <InputCustom type="password" id="confirmpass" label="Confirm Password" />

                    <Link to="/" type="submit" class="btn btn-primary mb-3 w-100">Reset Password</Link>
                </form>
            </div>
        </div>
    )
}

export default Resetpassword