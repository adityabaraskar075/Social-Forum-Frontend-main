import Banner from './Components/Banner'
import Footer from './Components/Footer/Footer'
import Navbar from './Components/Navbar/Navbar'
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div >
            <Banner />
            <Navbar />
            <Outlet/>
            <Footer />
        </div>
    )
}

export default Layout