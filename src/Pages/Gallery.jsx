import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import Loading from "./Loading"
import Error from "./Error"
import GallerySlider from "../Components/Slider/GallerySlider"
// import SmallLoader from "../Components/SmallLoader"

const baseUrl = import.meta.env.VITE_API_URL + '/getAllGalleryImages'
const deleteUrl = import.meta.env.VITE_API_URL + '/deleteGalleryImage'

const Gallery = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [gallery, setGallery] = useState([])
    const tempuser = localStorage.getItem('user')
    const user = JSON.parse(tempuser)

    const fetchData = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(baseUrl)
            const data = res.data.data
            console.log(data);
            setGallery(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError(error)
            toast.error(error?.response?.data?.message)
        }

    }

    const deleteGallery = async (id) => {
        console.log(id);
        try {
            const token = user.token
            await axios.delete(`${deleteUrl}/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            )
            toast.success('Gallery Slider deleted')
            fetchData()
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (error) {
        return (
            <Error />
        )
    }
    return (
        <div className="bg-purple-200 flex flex-col items-center justify-center p-8">
            <div className="mx-auto lg:w-[980px] w-full my-6">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-5">Gallery</h2>
                {
                    user?.accountType === 'Admin' || user?.accountType === 'SuperAdmin' ? (<Link className="p-2 rounded-md bg-blue-800 hover:bg-blue-400 text-center text-white font-[500] mb-5" to='/createGallery'>Create New Gallery Slider</Link>) : <></>
                }
                <div className="flex gap-[80px] mt-6 p-2 lg:w-[980px] w-full flex-col flex-wrap">
                    {gallery.map((gallery) => (
                        <div key={gallery?._id} className="relative w-full my-2 flex-wrap">
                            <GallerySlider images={gallery?.images} />
                            <div className="mt-4 flex justify-between">
                                <div className="w-full flex justify-center items-center flex-col gap-5">
                                    <p className="text-[18px] font-[700] text-blue-900">{gallery?.title}</p>
                                    {
                                        user?.accountType === 'Admin' || user?.accountType === 'SuperAdmin' ? (
                                            <h3 className="text-md text-center w-full flex md:flex-row flex-col gap-4 items-center justify-center">
                                                <Link className="p-2 rounded-md bg-green-800 hover:bg-green-400 text-center text-white font-[500] " to={`/updateGallery/${gallery?._id}`}>
                                                    Update Gallery Slider
                                                </Link>
                                                <button
                                                    className="p-2 rounded-md bg-red-800 hover:bg-red-400 text-center text-white font-[500]"
                                                    onClick={() => deleteGallery(gallery?._id)}>
                                                    Delete Gallery Slider
                                                </button>
                                            </h3>
                                        ) : (<></>)
                                    }

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Gallery