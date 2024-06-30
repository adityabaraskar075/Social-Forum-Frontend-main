import About2 from "../Components/About/About2"
import About3 from "../Components/About/About3"
import AboutHero from "../Components/About/AboutHero"
import AboutHero2 from "../Components/About/AboutHero2"
import Team from "../Components/About/Team"


const About = () => {
  return (
    <section className='min-h-screen flex items-center flex-col'>
      <About2 />
      <AboutHero />
      <AboutHero2 />
      <Team />
      <About3 />
    </section>
  )
}

export default About