import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"
import Loading from "./Loading";
import Error from './Error'

const baseUrl = import.meta.env.VITE_API_URL + '/getUserDetails'

const User = () => {
  const tempuser = localStorage.getItem('user')
  const tempUser = JSON.parse(tempuser)
  // console.log(user);
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const token = tempUser.token
      try {
        setIsLoading(true)
        const res = await axios.get(baseUrl,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            }
          })
        const data = res.data.data
        console.log(data);
        setUser(data)
        console.log(user);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setError(error)
        toast.error(error?.response?.data?.message, 'Login again')
        console.log(error);
      }

    }
    fetchData()
  }, [])

  const navigate = useNavigate()

  const handleLogout = () => {
    const tempuser = localStorage.getItem('user')
    const user = JSON.parse(tempuser)
    console.log(user);
    localStorage.removeItem('user');
    if (localStorage.getItem('user') === null) {
      toast.success('Logged out')
    } else {
      toast.error("Logout failed");
    }
    navigate('/')
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <section className='bg-gradient-to-r from-purple-500 to-voilet-500 min-h-screen flex items-center justify-center flex-col'>
      <div className='p-4 bg-white rounded-md min-h-[380px] w-[300px]'>
        <h2 className='font-[600] text-[35px] text-center mb-[20px]'>User details</h2>
        <div className='flex flex-col gap-3'>
          <h2 className='block text-[18px] font-[700]'>
            Email : <span className="font-[500]">{user?.email}</span>
          </h2>
          <br />
          <h2 className='block text-[18px] font-[700]'>
            First Name : <span className="font-[500]">{user?.firstName}</span>
          </h2>
          <br />
          <h2 className='block text-[18px] font-[700]'>
            Last Name : <span className="font-[500]">{user?.lastName}</span>
          </h2>
          <Link
            to='/updateUser'
            className='p-2 bg-purple-700 rounded-md hover:bg-purple-400 text-white text-center flex items-center justify-center'>
            Update User
          </Link>
          <button
            onClick={handleLogout}
            className='p-2 bg-red-700 rounded-md hover:bg-red-400 text-white text-center flex items-center justify-center'>
            Logout
          </button>
        </div>
        <p className='text-[14px] mt-[40px] text-center'><Link to='/' className='text-blue-700 text-[14px]'>Back to home</Link></p>
      </div>
    </section>
  )
}

export default User