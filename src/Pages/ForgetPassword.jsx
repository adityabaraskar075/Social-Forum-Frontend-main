import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";


const resetPasswordToken = import.meta.env.VITE_API_URL + '/reset-password-token'




const ForgetPassword = () => {

    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(false)



    const handleForgetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(resetPasswordToken, {
                email
            });

            const success = response?.data?.success
            const message = response?.data?.message
            if (success === true) {
                toast.success(message)
            } else {
                toast.error(message)
            }
            setEmailSent(true)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    };

    return (
        <div className='bg-gradient-to-r from-purple-500 to-voilet-500 min-h-screen flex items-center justify-center flex-col'>
            <div className='p-4 bg-white rounded-md min-h-[200px] w-[300px]'>
                <h2 className='font-[600] text-[35px] text-center mb-[20px]'>Reset Password</h2>
                <form onSubmit={handleForgetPassword} className='flex flex-col gap-3'>
                    {
                        emailSent ? (
                            <p className="text-black">
                                We have sent the resent email to {email}
                            </p>
                        )
                            :
                            (
                                <div >
                                    <label className='block text-[14px] font-[400]' htmlFor='email' >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        id='email'
                                        className='p-1.5 rounded-md shadow-lg bg-purple-200 outline-none focus:border-blue-600 focus:border-2 w-full'
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            )
                    }
                    <br />
                    {
                        emailSent ? (
                            <button
                                type="submit"
                                className='p-2 bg-purple-700 rounded-md hover:bg-purple-400 text-white'>Resend Email</button>
                        ) : (
                            <button
                                type="submit"
                                className='p-2 bg-purple-700 rounded-md hover:bg-purple-400 text-white'>Send Email</button>
                        )
                    }
                </form>
                <p className='text-[14px] mt-[40px]'>Back to <Link to='/login' className='text-blue-700 text-[14px]'>Login</Link></p>
            </div>
        </div>
    )
}

export default ForgetPassword