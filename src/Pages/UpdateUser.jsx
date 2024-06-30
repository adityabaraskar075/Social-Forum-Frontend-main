import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import SmallLoader from "../Components/SmallLoader"
import Loading from "./Loading"
import Error from "./Error"
import toast from "react-hot-toast"

const Url = import.meta.env.VITE_API_URL + '/updateUserDetails'
const baseUrl = import.meta.env.VITE_API_URL + '/getUserDetails'

const UpdateUser = () => {

    const tempuser = localStorage.getItem('user')
    const tempUser = JSON.parse(tempuser)
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [requestLoader, setRequestLoader] = useState(false)
    const navigate = useNavigate()

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setIsLoading(true)
    //             setEmail(user?.email)
    //             setFirstName(user?.firstName)
    //             setLastName(user?.lastName)
    //             setIsLoading(false)
    //         } catch (error) {
    //             setIsLoading(false)
    //             setError(error)
    //             toast.error(error?.response?.data?.message)
    //         }

    //     }
    //     fetchData()
    // }, [])

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
                setEmail(data?.email)
                setFirstName(data?.firstName)
                setLastName(data?.lastName)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setError(error)
                toast.error(error?.response?.data?.message)
            }

        }
        fetchData()
    }, [])

    const handleUpdateUser = async (e) => {
        e.preventDefault()
        try {
            setRequestLoader(true)
            const token = tempUser.token
            const data = {
                email,
                firstName,
                lastName
            }
            axios.put(Url, data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                })
            setRequestLoader(false)
            toast.success('User details updated')
            navigate('/user')
        } catch (error) {
            setRequestLoader(false)
            toast.error(error?.response?.data?.message)
        }
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
                <h2 className='font-[600] text-[35px] text-center mb-[20px]'>Update User</h2>
                <form onSubmit={handleUpdateUser} className='flex flex-col gap-3'>
                    <div >
                        <label className='block text-[18px] font-[800]' htmlFor='email' >
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
                        <label className='block text-[18px] font-[800]' htmlFor='firstName'>
                            First Name
                        </label>
                        <input
                            type="text"
                            value={firstName}
                            id='firstName'
                            className='p-1.5 rounded-md shadow-lg bg-purple-200 outline-none focus:border-blue-600 focus:border-2 w-full'
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <br />
                    <div>
                        <label className='block text-[18px] font-[800]' htmlFor='lastName'>
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={lastName}
                            id='lastName'
                            onChange={(e) => { setLastName(e.target.value) }}
                            className='p-1.5 rounded-md shadow-lg bg-purple-200 outline-none focus:border-blue-600 focus:border-2 w-full'
                        />
                    </div>
                    <br />
                    <button
                        type="submit"
                        className='p-2 bg-purple-700 rounded-md hover:bg-purple-400 text-white text-center flex items-center justify-center'>
                        {
                            requestLoader ? <SmallLoader /> : <>Update User</>
                        }
                    </button>
                </form>
                <p className='text-[14px] mt-[10px] text-center'>Back to <Link to='/' className='text-blue-700 text-[14px]'>Home</Link></p>
            </div>
        </section>
    )
}

export default UpdateUser