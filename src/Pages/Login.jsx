import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SmallLoader from '../Components/SmallLoader';



const login = import.meta.env.VITE_API_URL + '/login'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requestLoader, setRequestLoader] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setRequestLoader(true)
      const response = await axios.post(login, {
        email,
        password,
      });
      const user = response?.data?.user;
      setRequestLoader(false)
      localStorage.setItem("user", JSON.stringify(user));
      if (user.approved) {
        toast.success('Login successfull')
        navigate('/')
      }
    } catch (error) {
      setRequestLoader(false)
      toast.error(error?.response?.data?.message)
    }
  };

  return (
    <section className='bg-gradient-to-r from-purple-500 to-voilet-500 min-h-screen flex items-center justify-center flex-col'>
      <div className='p-4 bg-white rounded-md min-h-[380px] w-[300px]'>
        <h2 className='font-[600] text-[35px] text-center mb-[20px]'>Login</h2>
        <form onSubmit={handleLogin} className='flex flex-col gap-3'>
          <div >
            <label className='block text-[14px] font-[400]' htmlFor='email' >
              Email
            </label>
            <input
              type="email"
              value={email}
              id='email'
              className='p-1.5 rounded-md shadow-lg bg-purple-200 outline-none focus:border-blue-600 focus:border-2 w-full'
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <br />
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
          <br />
          <p className='text-[14px]'> <Link to='/forget-password' className='text-blue-700 text-[14px]'>Forgot password</Link></p>
          <button
            type="submit"
            className='p-2 bg-purple-700 rounded-md hover:bg-purple-400 text-white text-center flex items-center justify-center'>
            {
              requestLoader ? <SmallLoader /> : <>Login</>
            }
          </button>
        </form>
        <p className='text-[14px] mt-[40px]'>Not a user, <Link to='/signup' className='text-blue-700 text-[14px]'>Signup</Link></p>
        <p className='text-[14px] mt-[10px]'>Back to <Link to='/' className='text-blue-700 text-[14px]'>Home</Link></p>
      </div>
    </section>
  );
};

export default Login;
