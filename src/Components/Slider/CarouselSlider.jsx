import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { GrUpdate } from 'react-icons/gr';
import { ImCross } from 'react-icons/im';
import axios from 'axios';
import toast from 'react-hot-toast';
import SmallLoader from '../SmallLoader';

const deleteUrl = import.meta.env.VITE_API_URL + '/deleteCarouselImage'
const updateUrl = import.meta.env.VITE_API_URL + '/updateCarouselImage'

const CarouselSlider = ({ images, fetchData }) => {


    const tempuser = localStorage.getItem('user')
    const user = JSON.parse(tempuser)

    const [updateModal, setUpdateModal] = useState(false)
    const [pics, setPics] = useState([])
    const [requestLoader, setRequestLoader] = useState(false)
    const [carouselImage, setCarouselImage] = useState(null)

    const handleCarouselImageUpdate = (event) => {
        if (event.target.files[0].size > 4000000) {
            toast.error('File size should be less than 4mb')
        }
        setCarouselImage(event.target.files[0]);
    };

    const handleUpdateCarouselImage = async (e, id) => {
        e.preventDefault();

        try {
            setRequestLoader(true)
            const token = user.token
            if (!carouselImage) {
                toast.error('Enter all fields')
            }

            const formData = new FormData();
            formData.append('carouselImage', carouselImage)
            await axios.put(`${updateUrl}/${id}`, formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            setRequestLoader(false)
            toast.success('Carousel image updated')
            setUpdateModal(false)
            fetchData()
        } catch (error) {
            setRequestLoader(false)
            toast.error(error?.response?.data?.message)
        }
    };



    useEffect(() => {
        setPics(images)
    }, [images])


    const handleDeleteCarouselImage = async (id) => {
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
            toast.success('Carousel Image deleted, Please Reload')
            setPics(images)
            fetchData()
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            navigation
            pagination={{ clickable: true }}
            className='w-full  flex justify-center'
        >
            {pics.map((pic, index) => {
                return (
                    <SwiperSlide key={index} className='flex justify-center relative'>
                        <div className='absolute top-0 right-0 p-4'>
                            {
                                user?.accountType === 'Admin' || user?.accountType === 'SuperAdmin' ? (
                                    <div className="flex gap-4 mx-2">
                                        <button onClick={() => setUpdateModal(true)} className="text-green-800 text-[20px] font-[800]"><GrUpdate /></button>
                                        <button onClick={() => handleDeleteCarouselImage(pic?._id)} className="text-red-700  text-[20px] font-[800]"><ImCross /></button>
                                    </div>
                                ) : (<></>)
                            }
                        </div>
                        <img className='max-h-[450px] rounded-md shadow-sm lg:w-full' src={pic?.image} alt="" />
                        {
                            updateModal ? (
                                <form onSubmit={(e) => handleUpdateCarouselImage(e, pic?._id)} className="h-[250px] w-[250px] absolute rounded-md ring-purple-400 z-10 bg-purple-400/90 m-auto right-0 top-0 transition flex flex-col items-center justify-center gap-5 p-2">
                                    <div className="flex justify-between gap-5">
                                        <label htmlFor="carouselImage" className="text-[18px] font-[500]">Carousel Image Update</label>
                                        <button onClick={() => setUpdateModal(false)} className="text-red-700  text-[20px] font-[800]"><ImCross /></button>
                                    </div>
                                    <input
                                        type="file"
                                        name="carouselImage"
                                        id="carouselImage"
                                        accept="image/*"
                                        className="w-full"
                                        onChange={handleCarouselImageUpdate}
                                        required />
                                    <button
                                        type="submit"
                                        className='p-2 mt-3 self-end bg-green-700 rounded-md hover:bg-green-400 text-white text-center flex items-center justify-center'>
                                        {
                                            requestLoader ? <SmallLoader /> : <>Update Carousel image</>
                                        }
                                    </button>
                                </form>
                            ) : (<></>)
                        }
                    </SwiperSlide>
                )
            })}

        </Swiper>
    );
};

export default CarouselSlider