import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const updatePassword = import.meta.env.VITE_API_URL + '/reset-password'

const UpdatePassword = () => {


    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate  = useNavigate()
    const location=useLocation()

    const updatePasswordFunction = async (e) => {
        e.preventDefault();
        const token= location.pathname.split('/').at(-1)

        try {
            await axios.post(updatePassword, {
                password,
                confirmPassword,
                token,
            });
            
            toast.success('Password updated')
            navigate('/login')
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    };

    return (
        <div className='bg-gradient-to-r from-purple-500 to-voilet-500 min-h-screen flex items-center justify-center flex-col'>
            <div className='p-4 bg-white rounded-md min-h-[380px] w-[300px]'>
                <h2 className='font-[600] text-[35px] text-center mb-[20px]'>Signup</h2>
                <form onSubmit={updatePasswordFunction} className='flex flex-col gap-3'>
                    <div>
                        <label className='block text-[14px] font-[400]' htmlFor='password'>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            id='password'
                            className='p-1.5 rounded-md shadow-lg bg-purple-200 outline-none focus:border-blue-600 focus:border-2 w-full'
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label className='block text-[14px] font-[400]' htmlFor='confirmPassword'>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            id='confirmPassword'
                            className='p-1.5 rounded-md shadow-lg bg-purple-200 outline-none focus:border-blue-600 focus:border-2 w-full'
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <br />
                    <button
                        type="submit"
                        className='p-2 bg-purple-700 rounded-md hover:bg-purple-400 text-white'>Reset Password</button>
                </form>
                <p className='text-[14px] mt-[40px]'>Already a user, <Link to='/login' className='text-blue-700 text-[14px]'>Login</Link></p>
            </div>
        </div>
    )
}

export default UpdatePassword