import toast from "react-hot-toast";
import SmallLoader from "../Components/SmallLoader"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const createUrl = import.meta.env.VITE_API_URL + '/createGalleryImage'

const CreateGallery = () => {

    const [title, setTitle] = useState('');
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


    const handleCreateGallery = async (e) => {
        e.preventDefault();

        try {
            setRequestLoader(true)
            const token = user.token
            if (!title) {
                toast.error('Enter all fields')
            }

            const formData = new FormData();
            formData.append("title", title);
            for (let i = 0; i < images.length; i++) {
                formData.append(`images`, images[i])
            }
            const request = await axios.post(createUrl, formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            console.log(request);
            setRequestLoader(false)
            toast.success('Gallery Slider created')
            navigate('/gallery')
        } catch (error) {
            setRequestLoader(false)
            toast.error(error?.response?.data?.message)
        }
    };


    return (
        <section className='min-h-screen flex items-center flex-col bg-purple-200 p-4'>
            <div className="lg:w-[980px] w-full">
                <h1 className="text-[35px] font-[700]">Create a new Gallery Slider</h1>
            </div>
            <form onSubmit={handleCreateGallery} className="lg:w-[980px] md:w-[700px] w-full flex flex-col gap-2 py-4" >
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
                        requestLoader ? <SmallLoader /> : <>Create Gallery Slider</>
                    }
                </button>
            </form>
        </section>
    )
}

export default CreateGallery