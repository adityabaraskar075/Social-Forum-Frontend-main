import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SmallLoader from "../Components/SmallLoader";

const createBlog = import.meta.env.VITE_API_URL + '/createBlog'

const CreateBlog = () => {
  const [category, setCategory] = useState('blog')
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [requestLoader, setRequestLoader] = useState(false)
  const navigate = useNavigate()
  const tempuser = localStorage.getItem('user')
  const user = JSON.parse(tempuser)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value)
    }
    if (name === 'content') {
      setContent(value)
    }
  };

  const handleImagesChange = (event) => {
    Array.from(event.target.files).map((image) => {
      if (image.size > 4000000) {
        toast.error('File size should be less than 4mb')
      }
      return
    })
    if (Array.from(event.target.files).length > 3) {
      toast.error('You cannot upload more than 3 files')
    }
    setImages(event.target.files);
  };

  const handleThumbnailChange = (event) => {
    if (event.target.files[0].size > 4000000) {
      toast.error('File size should be less than 4mb')
    }
    setThumbnail(event.target.files[0]);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    try {
      setRequestLoader(true)
      const token = user.token
      if (!title || !content) {
        toast.error('Enter all fields')
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append('thumbnail', thumbnail);
      for (let i = 0; i < images.length; i++) {
        formData.append(`images`, images[i])
      }
      const request = await axios.post(createBlog, formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        }
      );
      console.log(request);
      setRequestLoader(false)
      toast.success('Blog created')
      navigate('/blogs')
    } catch (error) {
      setRequestLoader(false)
      toast.error(error?.response?.data?.message)
    }
  };



  return (
    <section className='min-h-screen flex items-center flex-col bg-purple-200 p-4'>
      <div className="lg:w-[980px] w-full">
        <h1 className="text-[35px] font-[700]">Create a new blog</h1>
      </div>
      <form onSubmit={handleCreateBlog} className="lg:w-[980px] md:w-[700px] w-full flex flex-col gap-2 py-4" >
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
          <label htmlFor="content" className="text-[18px] font-[500]">Content</label>
          <textarea
            value={content}
            name="content"
            id="content"
            className="h-[300px] w-full resize-none p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md"
            onChange={handleInputChange}
            required></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="thumbnail" className="text-[18px] font-[500]">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
            required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="images" className="text-[18px] font-[500]">Images</label>
          <input
            type="file"
            name="images"
            id="images"
            accept="image/*"
            onChange={handleImagesChange}
            multiple />
        </div>
        <button
          type="submit"
          className='p-2 mt-3 bg-blue-700 rounded-md hover:bg-blue-400 text-white text-center flex items-center justify-center'>
          {
            requestLoader ? <SmallLoader /> : <>Create Blog</>
          }
        </button>
      </form>
    </section>
  )
}


export default CreateBlog
