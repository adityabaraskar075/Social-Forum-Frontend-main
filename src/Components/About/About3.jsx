import image from './pic-4.jpg'

const About3 = () => {
    return (
        <section className="flex md:flex-row flex-col max-w-[980px] p-4 gap-4 my-[25px]">
            <div className="md:w-7/12 w-full">
                <h1 className="lg:text-[45px] md:text-[30px] text-[35px] font-[600] leading-tight font-serif my-10">Sponsor</h1>
                <h1 className="lg:text-[60px] md:text-[45px] text-[55px] leading-tight font-serif my-10">Sri Nakka Srinivas Yadav</h1>
                <h2 className="lg:text-[30px] md:text-[25px] text-[30px] leading-tight font-serif my-10">Chairman : Smt. Nakka Venkatamma Yadav ,  Shri Nakka Yadagiri Swamy Yadav Education and Sports Foundation</h2>
                <p className="lg:text-[18px] md:text-[16px] text-[16px] mb-10">
                     <span className='font-[600]'>Adopted Schools  :</span> <br /> Smt. Nakka Bagamma @ Nakka Balamma Yadav Sri Nakka Venkat Swamy Yadav Zilla Parishad High School , Hayathnagar , Hayathnagar Mdl , R.R. Dist, Telangana
                    <br />
                    <br />
                    Smt. Nakka Venkatamma Yadav,  Shri Nakka Yadagiri Swamy Yadav Zilla Parishad High School , Sahebnagar , Hayathnagar Mdl , R.R. Dist, Telangana
                </p>
            </div>
            <div className="md:w-5/12 w-full flex items-center">
                <img src={image} alt="image" className='rounded-md shadow-md' />
            </div>
        </section>
    )
}

export default About3