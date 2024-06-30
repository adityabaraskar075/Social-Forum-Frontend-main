import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "./Loading"
import Error from "./Error"
import toast from "react-hot-toast"

const baseUrl = import.meta.env.VITE_API_URL + '/getAllUsers'
const approveUrl = import.meta.env.VITE_API_URL + '/approveUser'
const deleteUrl = import.meta.env.VITE_API_URL + '/deleteUser'

const Dashboard = () => {

  const tempuser = localStorage.getItem('user')
  const user = JSON.parse(tempuser)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  const fetchData = async () => {

    try {
      const token = user.token
      setIsLoading(true)
      const res = await axios.get(baseUrl,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        })
      const data = res.data.data
      console.log(data);
      const Users = data.filter(user => user?.accountType === "Admin");
      setUsers(Users)
      console.log(users);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error)
    }

  }

  const handleUserApproval = async (id) => {
    console.log(id);
    const token = user.token
    let data
    try {
      if (user?.approved) {
        data = {
          userId: id, approve: true
        }
        await axios.put(approveUrl, data, {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        }
        )
        toast.success('User approved')
        fetchData()
      } else {
        data = {
          userId: id, approve: false
        }
        await axios.put(approveUrl, data, {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        }
        )
        toast.success('User disapproved')
        fetchData()
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const deleteUser = async (id) => {
    console.log(id);
    const token = user.token
    console.log(user?.approved);
    const url = deleteUrl + `/${id}`
    // const url = deleteUrl + '/id'
    try {
      await axios.delete(url,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        })
      toast.success('User deleted')
      fetchData()
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <section className='min-h-screen flex items-center flex-col'>
      <h1 className="text-[35px] font-[600] my-5">Super Admin Dashboard</h1>
      <div className="flex flex-col p-4 gap-4 w-full lg:w-[1080px]">
        {
          users.map((user) => {
            return (
              <div key={user?._id} className="w-full flex gap-2 md:justify-between flex-col  md:flex-row items-center p-2 bg-purple-200 rounded-md shadow-md">
                <h2 className="text-[20px] font-[600] text-center">{user?.firstName} {user?.lastName}</h2>
                <h2 className="text-[18px] font-[400]">{user?.email}</h2>
                <div className="flex items-center justify-evenly gap-2">
                  <button
                    onClick={() => handleUserApproval(user?._id)}
                    className={`p-2 rounded-md min-h-[30px] flex justify-center items-center text-center text-white font-[500] text-[12px] md:text-[16px] ${user?.approved ? ' bg-green-800 hover:bg-green-700' : ' bg-blue-800 hover:bg-blue-600'}`}>{user?.approved ? <>Approved</> : <>Not approved</>}</button>
                  <button
                    onClick={() => deleteUser(user?._id)}
                    className="p-2 rounded-md bg-red-800 hover:bg-red-700 min-h-[30px] flex justify-center items-center text-center text-white font-[500] text-[12px] md:text-[16px]">Delete user</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Dashboard