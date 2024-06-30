import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import Loading from './Loading'
import Error from "./Error"

const baseUrl = import.meta.env.VITE_API_URL + '/getAllBlogs'

const FeaturedBlogs = () => {



    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [blogs, setBlogs] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const res = await axios.get(baseUrl)
                const data = res.data.data
                console.log(data);
                const newData = data.slice(0, 3)
                setBlogs(newData)
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
        <section className="max-w-[980px]  p-4 items-start flex flex-col">
            <h1 className="lg:text-[70px] md:text-[45px] text-[50px] leading-tight font-serif my-10 text-left w-full">Featured Blogs</h1>
            <div className="flex gap-4 mt-6 md:flex-row flex-col flex-wrap lg:w-[1080px]">
                {blogs.map((blog) => (
                    <div key={blog._id} className="relative lg:w-[340px] w-full md:w-[300px] my-2 flex-wrap">
                        <div className="w-100 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-60">
                            <img
                                src={blog.thumbnail}
                                alt={blog.title}
                                className="h-[200px] w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div className="w-full">
                                <h3 className="text-md text-center w-full text-gray-900">
                                    <Link to={`/blogs/${blog._id}`}>
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {blog.title.replace(/"/g, "")}
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link to='/blogs' className="bg-purple-700 rounded-md shadow-md p-2 text-lg text-white hover:bg-purple-500 transition">Explore all blogs</Link>
        </section>
    )
}

export default FeaturedBlogs