import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

const GallerySlider = ({ images }) => {

    const [pics, setPics] = useState([])
    useEffect(() => {
        setPics(images)
    }, [images])
    console.log(pics);
    return (
        <Swiper
            modules={[Navigation , Pagination]}
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
                    <SwiperSlide key={index} className='flex justify-center items-center'><img className='max-h-[400px] rounded-md shadow-sm lg:w-full' src={pic} alt="" /></SwiperSlide>
                )
            })}
        </Swiper>
    );
};

export default GallerySlider