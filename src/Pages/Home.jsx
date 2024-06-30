import HomeHero from "../Components/Home/HomeHero"
import FeaturedBlogs from "../Components/Home/FeaturedBlogs"
import Announcements from "../Components/Announcements/Announcements"
import HomeCarousel from "./HomeCarousel"

const Home = () => {
  return (
    <section className='min-h-screen flex items-center flex-col'>
      <HomeCarousel />
      <HomeHero />
      <Announcements />
      <FeaturedBlogs />
    </section>
  )
}

export default Home