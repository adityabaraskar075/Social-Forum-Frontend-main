import toast from "react-hot-toast"
import Loading from "./Loading"
import SmallLoader from "../Components/SmallLoader"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"


const updateUrl = import.meta.env.VITE_API_URL + '/updateGalleryImage'
const getUrl = import.meta.env.VITE_API_URL + '/getGalleryImage'

const UpdateGallery = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [title, setTitle] = useState('')
    const [images, setImages] = useState([])
    const [requestLoader, setRequestLoader] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const tempuser = localStorage.getItem('user')
    const user = JSON.parse(tempuser)
    const Url = getUrl + `/${id}`
    const url = updateUrl + `/${id}`



    const handleImagesChange = (event) => {
        setImages(event.target.files)
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const res = await axios.get(Url)
                const data = res.data.data
                setTitle(data?.title)
                setImages(data?.images)
                setIsLoading(false)
            } catch (error) {
                setError(error)
                toast.error(error?.response?.data?.message)
            }

        }
        fetchData()
    }, [])


    const handleUpdateGallery = async (e) => {
        e.preventDefault();

        try {
            setRequestLoader(true)
            const token = user.token
            const formData = new FormData();
            formData.append("title", title);
            for (let i = 0; i < images.length; i++) {
                formData.append(`images`, images[i])
            }
            console.log(formData);
            await axios.put(url, formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            setRequestLoader(false)
            toast.success('Gallery Slider updated')
            navigate('/gallery')
        } catch (error) {
            setRequestLoader(false)
            toast.error(error?.response?.data?.message)
        }
    };




    if (isLoading) {
        return <Loading />
    }

    return (
        <section className='min-h-screen flex items-center flex-col bg-purple-200 p-4'>
            <div className="lg:w-[980px] w-full">
                <h1 className="text-[35px] font-[700]">Update blog</h1>
            </div>
            <form onSubmit={handleUpdateGallery} className="lg:w-[980px] md:w-[700px] w-full flex flex-col gap-2 py-4" >
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-[18px] font-[500]">Title</label>
                    <input
                        value={title}
                        type="text"
                        name="title"
                        id="title"
                        className="p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md"
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="images" className="text-[18px] font-[500]">Add new Images</label>
                    <input
                        type="file"
                        name="images"
                        id="images"
                        onChange={handleImagesChange}
                        multiple />
                </div>
                <button
                    type="submit"
                    className='p-2 mt-3 bg-green-700 rounded-md hover:bg-green-400 text-white text-center flex items-center justify-center'>
                    {
                        requestLoader ? <SmallLoader /> : <>Update Gallery Slider</>
                    }
                </button>
                <Link
                    className='p-2 mt-3 bg-purple-700 rounded-md hover:bg-purple-400 text-white text-center flex items-center justify-center' to='/gallery'>No changes</Link>
            </form>
        </section>
    )
}

export default UpdateGallery