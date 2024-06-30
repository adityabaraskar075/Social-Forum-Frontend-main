import img from '../assets/SocialForum.png'

const Banner = () => {
    return (
        <div className="min-h-[150px] bg-purple-300 flex justify-center items-center text-purple-950 text-[25px] flex-col md:flex-row font-[700] p-3 gap-4">
            <img src={img} alt="" className='h-[120px]' />
            <p className='text-center lg:text-[60px] text-[30px]'>Telangana Social Studies Teachers&apos; Forum</p>
        </div>
    )
}

export default Banner