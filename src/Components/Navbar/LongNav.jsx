import { NavLinks } from "../../Utils/Constant";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { ActiveLinkContext } from "../../Context/ActiveLinkContext";
import Dropdown from "./Dropdown";


const LongNav = () => {

    // const navigate = useNavigate();
    // const location = useLocation();
    const { activeLinkId, handleLinkClick } = useContext(ActiveLinkContext);
    const [initialActiveLinkId, setInitialActiveLinkId] = useState(activeLinkId);
    const [dropdown, setDropdown] = useState(false);


    useEffect(() => {
        if (window.location.pathname === '/') {
            handleLinkClick(1); // Reset for homepage
            localStorage.removeItem('activeLinkId'); // Clear storage entry
        } else {
            setInitialActiveLinkId(activeLinkId); // Store initial state on other pages
        }
    }, []);

    // const [activeNavLink, setActiveNavLink] = useState(() => {
    //     const storedId = localStorage.getItem('activeLinkId');
    //     return storedId ? parseInt(storedId) : location.pathname === '/' ? 1 : parseInt(location.pathname.slice(1));
    // }
    // );
    const tempuser = localStorage.getItem('user')
    const user = JSON.parse(tempuser)

    // const handleClick = (url, id) => {
    //     setActiveNavLink(id);
    //     localStorage.setItem('activeLinkId', id);
    //     navigate(url);
    // };
    // ''
    // ''


    return (
        <div className='w-full p-4 lg:flex justify-evenly items-center bg-purple-100/90 gap-4 h-[70px] hidden'>
            <Link to='/' className='text-center lg:text-[30px] text-[25px] font-[800] p-1 text-purple-700 font-display' onClick={() => handleLinkClick(1)} >
                Social Forum
            </Link>
            <ul className='min-w-[680px] lg:flex justify-between capitalize p-2'>
                {NavLinks.map((navlink) => {
                    const { id, text, url } = navlink
                    if (text === "Resources") {
                        return (
                            <li
                                key={id}
                                className="translate-y-[10px]"
                                onMouseEnter={() => setDropdown(true)}
                                onMouseLeave={() => setDropdown(false)}>
                                <NavLink

                                    to={url}
                                    className={({ isActive }) => (isActive || activeLinkId === id ? ' text-purple-900 font-[600] p-1 lg:text-[16px] transition text-[20px] mx-1 translate-y-[120px] hover:text-gray-800 border-b-[3px] border-b-purple-900' : 'text-purple-900 font-[600] p-1 lg:text-[16px] transition text-[20px] mx-1 mt-2 hover:text-gray-800 hover:border-b-[3px] hover:border-b-purple-900')}
                                    onClick={() => handleLinkClick(id)}>{text}</NavLink>
                                {dropdown && <Dropdown />}
                            </li>
                        )
                    }

                    return (
                        <NavLink to={url} key={id} className={({ isActive }) => (isActive || activeLinkId === id ? 'text-purple-900 font-[600] p-1 lg:text-[16px] transition text-[20px] mx-1 mt-2 hover:text-gray-800 border-b-[3px] border-b-purple-900' : 'text-purple-900 font-[600] p-1 lg:text-[16px] transition text-[20px] mx-1 mt-2 hover:text-gray-800 hover:border-b-[3px] hover:border-b-purple-900')} onClick={() => handleLinkClick(id)}>
                            {text}
                        </NavLink>
                    )
                })}
                {
                    user?.accountType === 'SuperAdmin' ? <NavLink to='/dashboard' className="p-2 rounded-md bg-blue-800 hover:bg-blue-600 min-h-[30px] flex justify-center items-center text-center text-white font-[500] text-[12px] md:text-[16px]" >Dashboard</NavLink> : <></>
                }

            </ul>
            <Link to={user ? `/user` : `/login`} className='text-center border-2 rounded-full border-purple-900 lg:text-[30px] text-[25px] font-[600] p-1 text-purple-900 font-display bg-purple-200' >
                <BsPersonFill />
            </Link>
        </div >
    )
}

export default LongNav