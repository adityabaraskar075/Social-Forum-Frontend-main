import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_API_URL + "/getAllBlogs";

const Blogs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const tempuser = localStorage.getItem("user");
  const user = JSON.parse(tempuser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(baseUrl);
        const data = res.data.data;
        console.log(data);
        setBlogs(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error);
        toast.error(error?.response?.data?.message);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="bg-purple-200">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-[1080px] lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-5">
          Blogs
        </h2>
        {user?.accountType === "Admin" || user?.accountType === "SuperAdmin" ? (
          <Link
            className="p-2 rounded-md bg-blue-800 hover:bg-blue-400 text-center text-white font-[500] mb-5"
            to="/createBlog"
          >
            Create New Blog
          </Link>
        ) : (
          <></>
        )}
        <div className="flex gap-4 mt-6 md:flex-row flex-col flex-wrap">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="relative lg:w-[380px] w-full md:w-[280px] my-2 flex-wrap"
            >
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
      </div>
    </div>
  );
};

export default Blogs;
