import image from './pic-new.jpg'

const AboutHero2 = () => {
    return (
        <section className="flex md:flex-row flex-col max-w-[980px] p-4 gap-4 my-[25px]">
            <div className='md:w-7/12 w-full'>
                <h1 className="lg:text-[60px] md:text-[45px] text-[55px] leading-tight font-serif my-10">G Venkateswarlu</h1>
                <h2 className="lg:text-[45px] md:text-[30px] text-[30px] leading-tight font-serif my-10">General Secretary
                    , TSSTF</h2>
                <p className="lg:text-[20px] md:text-[16px] text-[18px] mb-10">
                    Address  : ZPHS, Champapet, Ranga Reddy dist
                </p>
            </div>
            <div className='md:w-5/12 w-full flex items-center'>
                <img src={image} alt="image" className='rounded-md shadow-lg' />
            </div>
        </section>
    )

}

export default AboutHero2