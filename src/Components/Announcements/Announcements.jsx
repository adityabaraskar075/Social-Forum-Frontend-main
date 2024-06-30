import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Loading from "../../Pages/Loading"
import Error from "../../Pages/Error"
import { GrUpdate } from "react-icons/gr"
import { ImCross } from "react-icons/im"
import SmallLoader from "../SmallLoader"


const baseUrl = import.meta.env.VITE_API_URL + '/getAllannouncements'
const createAnnouncement = import.meta.env.VITE_API_URL + '/createAnnouncement'
const deleteAnnouncement = import.meta.env.VITE_API_URL + '/deleteAnnouncement'
const updateAnnouncement = import.meta.env.VITE_API_URL + '/updateAnnouncement'


const Announcements = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [announcements, setAnnouncements] = useState([])
    const [error, setError] = useState(null)
    const [title, setTitle] = useState('')
    const [requestLoader, setRequestLoader] = useState(false)
    const [description, setDescription] = useState('')
    const [createModal, setCreateModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const tempuser = localStorage.getItem('user')
    const user = JSON.parse(tempuser)


    const fetchData = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(baseUrl)
            const data = res.data.data
            console.log(data);
            setAnnouncements(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError(error)
            toast.error(error?.response?.data?.message)
        }

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setTitle(value)
        }
        if (name === 'description') {
            setDescription(value)
        }
    };

    const handleCreateAnnouncement = async (e) => {
        e.preventDefault();

        try {
            setRequestLoader(true)
            const token = user.token
            if (!title || !description) {
                toast.error('Enter all fields')
            }

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);

            const request = await axios.post(createAnnouncement, formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            console.log(request);
            setRequestLoader(false)
            toast.success('Announcement created')
            setCreateModal(false)
            fetchData()
        } catch (error) {
            setRequestLoader(false)
            toast.error(error?.response?.data?.message)
        }
    };

    const handleUpdateAnnouncement = async (e, id) => {
        e.preventDefault();

        try {
            setRequestLoader(true)
            const token = user.token

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);

            await axios.put(`${updateAnnouncement}/${id}`, formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            setRequestLoader(false)
            toast.success('Announcement updated')
            setUpdateModal(false)
            fetchData()
        } catch (error) {
            setRequestLoader(false)
            toast.error(error?.response?.data?.message)
        }
    };

    const handleDeleteAnnouncement = async (id) => {
        console.log(id);
        try {
            const token = user.token
            await axios.delete(`${deleteAnnouncement}/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            )
            setRequestLoader(false)
            toast.success('Announcement deleted')
            fetchData()
        } catch (error) {
            setRequestLoader(false)
            toast.error(error?.response?.data?.message)
        }
    }




    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <article className="my-[20px] w-full lg:w-[980px] p-2 flex flex-col gap-8 relative">
            <h1 className="text-[45px] text-center font-[700]">Announcements</h1>
            <div className="flex flex-col gap-6">
                {
                    announcements.map((announcement) => {
                        return <p className="flex justify-between bg-purple-300 min-h-[25px] rounded-sm items-center p-1" key={announcement?._id}>
                            <span className="flex-1 text-left text-[18px] font-bold capitalize">{announcement?.announcement}</span>
                            <span className="text-left flex-1 text-ellipsis text-[18px] font-light">{announcement?.description}</span>
                            {
                                user?.accountType === 'Admin' || user?.accountType === 'SuperAdmin' ? (
                                    <div className="flex gap-4 mx-2">
                                        <button onClick={() => setUpdateModal(true)} className="text-green-800 font-[800]"><GrUpdate /></button>
                                        <button onClick={() => handleDeleteAnnouncement(announcement?._id)} className="text-red-700"><ImCross /></button>
                                    </div>
                                ) : (<></>)
                            }
                            {
                                updateModal ? (
                                    <form onSubmit={(e) => handleUpdateAnnouncement(e, announcement?._id)} className="h-[400px] w-[400px] absolute rounded-md ring-purple-400 z-10 bg-purple-400/90 m-auto right-0 -bottom-10 transition flex flex-col items-center justify-center gap-5">
                                        <div className="flex items-center gap-4">
                                            <h2 className="text-[25px] text-black font-semibold">Update Announcement</h2>
                                            <button onClick={() => setUpdateModal(false)} className="text-red-700"><ImCross /></button>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="title" className="text-[18px] font-[500]">Title</label>
                                            <input
                                                value={title}
                                                type="text"
                                                name="title"
                                                id="title"
                                                className="p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md"
                                                onChange={handleInputChange} />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="description" className="text-[18px] font-[500]">Description</label>
                                            <input
                                                value={description}
                                                type="text"
                                                name="description"
                                                id="description"
                                                className="p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md"
                                                onChange={handleInputChange} />
                                        </div>
                                        <button
                                            type="submit"
                                            className='p-2 mt-3 bg-green-700 rounded-md hover:bg-green-400 text-white text-center flex items-center justify-center'>
                                            {
                                                requestLoader ? <SmallLoader /> : <>Update Announcement</>
                                            }
                                        </button>
                                    </form>
                                ) : (<></>)
                            }
                        </p>

                    }
                    )
                }
            </div>
            {
                user?.accountType === 'Admin' || user?.accountType === 'SuperAdmin' ? (
                    <button
                        onClick={() => setCreateModal(true)}
                        className="p-2 rounded-md bg-purple-700 hover:bg-purple-500 text-white">Add Anouncement</button>
                ) : (<></>)
            }
            {
                createModal ? (
                    <form onSubmit={handleCreateAnnouncement} className="h-[400px] w-[400px] absolute rounded-md ring-purple-400 z-10 bg-purple-400/90 m-auto right-0 -bottom-10 transition flex flex-col items-center justify-center gap-5">
                        <div className="flex items-center gap-4">
                            <h2 className="text-[25px] text-black font-semibold">Create Announcement</h2>
                            <button onClick={() => setCreateModal(false)} className="text-red-700"><ImCross /></button>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="title" className="text-[18px] font-[500]">Title</label>
                            <input
                                value={title}
                                type="text"
                                name="title"
                                id="title"
                                className="p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md"
                                onChange={handleInputChange}
                                required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="description" className="text-[18px] font-[500]">Description</label>
                            <input
                                value={description}
                                type="text"
                                name="description"
                                id="description"
                                className="p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md"
                                onChange={handleInputChange}
                                required />
                        </div>
                        <button
                            type="submit"
                            className='p-2 mt-3 bg-blue-700 rounded-md hover:bg-blue-400 text-white text-center flex items-center justify-center'>
                            {
                                requestLoader ? <SmallLoader /> : <>Create Announcement</>
                            }
                        </button>
                    </form>
                ) : (<></>)
            }
        </article >
    )
}

export default Announcements