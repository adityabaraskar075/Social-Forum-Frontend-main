import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "../Components/Slider/Slider";
import Loading from "./Loading";
import toast from "react-hot-toast";
import SmallLoader from "../Components/SmallLoader";

const baseUrl = import.meta.env.VITE_API_URL + "/getBlog";
const deleteUrl = import.meta.env.VITE_API_URL + "/deleteBlog";

const Blog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [requestLoader, setRequestLoader] = useState(false);
  const Url = baseUrl + `/${id}`;

  const tempuser = localStorage.getItem("user");
  const user = JSON.parse(tempuser);

  const deleteBlog = async (id) => {
    console.log(id);
    try {
      setRequestLoader(true);
      const token = user.token;
      await axios.delete(`${deleteUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequestLoader(false);
      toast.success("Blog deleted");
      navigate("/blogs");
    } catch (error) {
      setRequestLoader(false);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(Url);
        const data = res.data.data;
        console.log(data);
        setBlog(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  const { images, content, title } = blog;
  const newTitle = title;
  const newContent = content;
  // const images = [imagesUrl]

  return (
    <article className="min-h-screen bg-purple-200 flex p-10">
      <div className="lg:min-w-[950px] lg:max-w-[1080px] w-full p-2">
        <div className="flex gap-3 items-center">
          <h1 className="text-[35px] font-[800] mb-6">{newTitle}</h1>
          {user?.accountType === "Admin" ||
          user?.accountType === "SuperAdmin" ? (
            <>
              <Link
                to={`/updateBlog/${id}`}
                className="p-2 rounded-md bg-green-800 hover:bg-green-700 min-h-[30px] flex justify-center items-center -translate-y-2 text-center text-white font-[500] text-[12px] md:text-[16px]"
              >
                Update blog
              </Link>
              <Link
                className="p-2 rounded-md bg-red-800 hover:bg-red-700 min-h-[30px] flex justify-center items-center -translate-y-2 text-center text-white font-[500] text-[12px] md:text-[16px]"
                onClick={() => deleteBlog(id)}
              >
                {requestLoader ? (
                  <span>
                    <SmallLoader />
                  </span>
                ) : (
                  <>Delete Blog</>
                )}
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full">
          <Slider images={images} />
        </div>
        <p className="mt-4 text-[18px]">{newContent}</p>
      </div>
    </article>
  );
};

export default Blog;
