import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import SmallLoader from "../Components/SmallLoader";
import Loading from "./Loading";

const getBlog = import.meta.env.VITE_API_URL + '/getBlog'
const updateBlog = import.meta.env.VITE_API_URL + '/updateBlog'

const UpdateBlog = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [images, setImages] = useState([])
    const [category, setCategory] = useState('blog')
    const [requestLoader, setRequestLoader] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const tempuser = localStorage.getItem('user')
    const user = JSON.parse(tempuser)
    const Url = getBlog + `/${id}`
    const url = updateBlog + `/${id}`


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const res = await axios.get(Url)
                const data = res.data.data
                setContent(data?.content)
                setTitle(data?.title)
                setThumbnail(data?.thumbnail)
                setCategory(data?.category)
                setImages(data?.images)
                setIsLoading(false)
            } catch (error) {
                setError(error)
                toast.error(error?.response?.data?.message)
            }

        }
        fetchData()
    }, [])





    const handleThumbnailChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile || !selectedFile.type.startsWith('image/')) {
            return toast.error('Please select a valid image file.');
        }
        setThumbnail(selectedFile)
    }

    const handleImagesChange = (event) => {
        // Array.from(event.target.files).map((image) => {
        //   if (image.size > 4000000) {
        //     toast.error('File size should be less than 4mb')
        //   }
        //   return
        // })
        console.log(event.target.files);
        setImages(event.target.files)
        console.log(images);
        // setImages(event.target.files);
        // console.log(event.target.files);
        // console.log(images);
        // console.log(Array.from(images));
      };


    const handleUpdateBlog = async (e) => {
        e.preventDefault();

        try {
            setRequestLoader(true)
            const token = user.token
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("category", category);
            formData.append('thumbnail', thumbnail);
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
            toast.success('Blog updated')
            navigate('/blogs')
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
            <form onSubmit={handleUpdateBlog} className="lg:w-[980px] md:w-[700px] w-full flex flex-col gap-2 py-4" >
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
                    <label htmlFor="content" className="text-[18px] font-[500]">Content</label>
                    <textarea
                        value={content}
                        name="content"
                        id="content"
                        className="h-[300px] w-full resize-none p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md"
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="thumbnail" className="text-[18px] font-[500]">Add new Thumbnail</label>
                    <input
                        type="file"
                        name="thumbnail"
                        id="thumbnail"
                        accept="image/*"
                        onChange={handleThumbnailChange} />
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
                    className='p-2 mt-3 bg-blue-700 rounded-md hover:bg-blue-400 text-white text-center flex items-center justify-center'>
                    {
                        requestLoader ? <SmallLoader /> : <>Update Blog</>
                    }
                </button>
                <Link
                    className='p-2 mt-3 bg-purple-700 rounded-md hover:bg-purple-400 text-white text-center flex items-center justify-center' to={`/blogs/${id}`}> No changes</Link>
            </form>
        </section>
    )
}

export default UpdateBlog