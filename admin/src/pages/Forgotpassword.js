import React from 'react'
import InputCustom from '../component/UI/InputCustom'

const Forgotpassword = () => {
    return (
        <div className='py-5 bg-primary d-flex align-items-center' style={{ minHeight: "100vh", background: "#5698f8" }}>
            <div className='py-5 w-25 bg-white rounded-3 mx-auto p-3'>
                <h4 className='text-center mb-4'>Send Link Forgot Password</h4>
                <form action=''>
                    <InputCustom type="text" id="email" label="Enter your email" />
                    <button type="submit" class="btn btn-primary mb-3 w-100">Send Link</button>
                </form>
            </div>
        </div>
    )
}

export default Forgotpassword