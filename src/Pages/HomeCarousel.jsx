import { useEffect, useState } from "react"
import Slider from "../Components/Slider/Slider"
import toast from "react-hot-toast";
import SmallLoader from "../Components/SmallLoader";
import axios from "axios";
import CarouselSlider from "../Components/Slider/CarouselSlider";
import Loading from '../Pages/Loading'
import { ImCross } from "react-icons/im";

const createCarouselImage = import.meta.env.VITE_API_URL + '/createCarouselImage'
const getAllCarouselImage = import.meta.env.VITE_API_URL + '/getAllCarouselImages'

const HomeCarousel = () => {

  const [createModal, setCreateModal] = useState(false)
  const [carouselImage, setCarouselImage] = useState(null)
  const [requestLoader, setRequestLoader] = useState(false)
  const [carouselImages, setCarouselImages] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const tempuser = localStorage.getItem('user')
  const user = JSON.parse(tempuser)


  const fetchData = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(getAllCarouselImage)
      const data = res.data.data
      setCarouselImages(Array.from(data))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error)
      toast.error(error?.response?.data?.message)
    }

  }

  const handleCarouselImageChange = (event) => {
    if (event.target.files[0].size > 4000000) {
      toast.error('File size should be less than 4mb')
    }
    setCarouselImage(event.target.files[0]);
  };


  useEffect(() => {
    fetchData()
  }, [])


  const handleCreateCarouselImage = async (e) => {
    e.preventDefault();

    try {
      setRequestLoader(true)
      const token = user.token
      if (!carouselImage) {
        toast.error('Enter all fields')
      }

      const formData = new FormData();
      formData.append('carouselImage', carouselImage)
      await axios.post(createCarouselImage, formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        }
      );
      setRequestLoader(false)
      toast.success('Carousel image created')
      setCreateModal(false)
      fetchData()
    } catch (error) {
      setRequestLoader(false)
      toast.error(error?.response?.data?.message)
    }
  };

  if (isLoading) {
    return <Loading />
  }


  return (
    <article className="relative w-full p-4 flex flex-col items-center">
      <div className="lg:w-[980px] w-full">
        <CarouselSlider images={carouselImages} fetchData={fetchData} />
      </div>
      {
        user?.accountType ? (
          <button
            onClick={() => setCreateModal(true)}
            className="p-2 bg-purple-700 hover:bg-purple-500 rounded-md text-white my-4">Add Carousel Image
          </button>
        ) : (<></>)
      }
      {
        createModal ? (
          <form onSubmit={handleCreateCarouselImage} className="h-[250px] w-[250px] absolute rounded-md ring-purple-400 z-10 bg-purple-400/90 m-auto right-0 top-0 transition flex flex-col items-center justify-center gap-5 p-2">
            <div className="flex justify-between gap-5">
              <label htmlFor="carouselImage" className="text-[18px] font-[500]">Carousel Image</label>
              <button onClick={() => setCreateModal(false)} className="text-red-700  text-[20px] font-[800]"><ImCross /></button>
            </div>
            <input
              type="file"
              name="carouselImage"
              id="carouselImage"
              accept="image/*"
              className="w-full"
              onChange={handleCarouselImageChange}
              required />
            <button
              type="submit"
              className='p-2 mt-3 self-end bg-blue-700 rounded-md hover:bg-blue-400 text-white text-center flex items-center justify-center'>
              {
                requestLoader ? <SmallLoader /> : <>Create Carousel image</>
              }
            </button>
          </form>
        ) : (<></>)
      }
    </article>
  )
}

export default HomeCarousel