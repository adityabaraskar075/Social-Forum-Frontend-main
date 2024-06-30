import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Loading from "./Loading"
import SmallLoader from "../Components/SmallLoader"
import Error from './Error'
import toast from "react-hot-toast"

const baseUrl = import.meta.env.VITE_API_URL + '/getResource'
const updateUrl = import.meta.env.VITE_API_URL + '/updateResource'

const UpdateResource = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState('')
    // const [resourseUrl, setResourseUrl] = useState('')
    const [resourceType, setResourceType] = useState('')
    const [category, setCategory] = useState('')
    const [error, setError] = useState(null)
    const [requestLoader, setRequestLoader] = useState(false)
    const [link, setLink] = useState('')
    const fileInput = useRef()
    const navigate = useNavigate()
    const { id } = useParams()
    const tempuser = localStorage.getItem('user')
    const user = JSON.parse(tempuser)
    const url = baseUrl + `/${id}`
    const Url = updateUrl + `/${id}`

    const handleRadioChange = (event) => {
        setResourceType(event.target.value);
    };

    // const handleFileChange = (e) => {
    //     setResourseUrl(e.target.files[0])
    // }

    const handleLinkChange = (e) => {
        setLink(e.target.value)
    }

    const handleSelectChange = (e) => {
        setCategory(e.target.value)
    }

    const handleUpdateResource = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    if (resourceType === 'file') {
      formData.append("title", title);
      formData.append("category", category);
      formData.append("resourceType", resourceType);
      formData.append("resourceFile", fileInput.current.files[0]);
    }

    if (resourceType === 'link') {
      formData.append("title", title);
      formData.append("category", category);
      formData.append("resourceType", resourceType);
      formData.append("link", link);
    }
    console.log(formData);
        try {
            setRequestLoader(true)
            const token = user.token
            console.log(formData);
            await axios.put(Url, formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            setRequestLoader(false)
            toast.success('Resource updated')
            navigate('/resources')
        } catch (error) {
            setRequestLoader(false)
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const res = await axios.get(url)
                const data = res.data.data
                console.log(data[0]);
                setTitle(data[0]?.title)
                // setResourseUrl(data[0]?.resourseUrl)
                setResourceType(data[0]?.resourceType)
                setCategory(data[0]?.category)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setError(error)
                toast.error(error?.response?.data?.message)
            }

        }
        fetchData()
    }, [])

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error />
    }



    return (
        <section className='min-h-screen flex items-center flex-col bg-purple-200 p-4'>
            <div className="lg:w-[980px] w-full">
                <h1 className="text-[35px] font-[700]">Update resource</h1>
            </div>
            <form onSubmit={handleUpdateResource} className="lg:w-[980px] md:w-[700px] w-full flex flex-col gap-2 py-4" >
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-[18px] font-[500]">Title</label>
                    <input
                        value={title}
                        type="text"
                        name="title"
                        id="title"
                        className="p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md"
                        onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="flex flex-row gap-4 my-2">
                    <div className="flex gap-2">
                        <input
                            type='radio'
                            value="file"
                            name="dataType"
                            id="file"
                            checked={resourceType === 'file'}
                            className="focus:ring-1 rounded-full focus:ring-primary-500 peer"
                            onChange={handleRadioChange}/>
                        <label htmlFor="file" className="text-[18px] font-[500]">File</label>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type='radio'
                            value="link"
                            name="dataType"
                            id="link"
                            checked={resourceType === 'link'}
                            className="focus:ring-1 rounded-full focus:ring-primary-500 peer"
                            onChange={handleRadioChange}/>
                        <label htmlFor="link" className="text-[18px] font-[500]">Link</label>
                    </div>
                </div>
                {
                    resourceType === 'file' ? (
                        <div className="flex flex-col">
                            <label htmlFor="resourceUrl" className="text-[18px] font-[500]">File</label>
                            <input
                                type="file"
                                name="resourceUrl"
                                id="resourceUrl"
                                ref={fileInput}
                                className="p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md"></input>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <label htmlFor="url" className="text-[18px] font-[500]">Link</label>
                            <input
                                type="url"
                                name="resourceUrl"
                                id="url"
                                value={link}
                                onChange={handleLinkChange}
                                className="p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md"></input>
                        </div>
                    )
                }
                <div className="flex flex-col">
                    <label htmlFor="category" className="text-[18px] font-[500]">Category</label>
                    <select
                        name="category"
                        id="category"
                        onChange={handleSelectChange}
                        className="p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md mt-1 text-[18px]">
                        <option className="text-[16px] p-1" value="Teacher Resources">Teacher Resources</option>
                        <option className="text-[16px] p-1" value="Student Resources">Student Resources</option>
                        <option className="text-[16px] p-1" value="E - Resources">E-Resources</option>
                        <option className="text-[16px] p-1" value="Model Papers">Model Papers</option>
                        <option className="text-[16px] p-1" value="Career Guidance">Career Guidance</option>
                        <option className="text-[16px] p-1" value="Publications">Publications</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className='p-2 mt-3 bg-green-700 rounded-md hover:bg-green-400 text-white text-center flex items-center justify-center'>
                    {
                        requestLoader ? (<SmallLoader />) : (<>Update Resource</>)
                    }
                </button>
                <Link to='/resources' className='p-2 mt-3 bg-blue-700 rounded-md hover:bg-blue-400 text-white text-center flex items-center justify-center'>
                    No changes
                </Link>
            </form>
        </section>
    )
}

export default UpdateResource