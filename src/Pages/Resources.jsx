import { useEffect, useState } from "react"
import { Filters } from "../Utils/Constant"
import axios from "axios"
import Loading from "./Loading"
import { Link, useNavigate } from "react-router-dom"
import doc from '../assets/Pics/doc.png'
import link from '../assets/Pics/link.png'
import toast from "react-hot-toast"

const baseUrl = import.meta.env.VITE_API_URL + '/getAllResources'
const deleteUrl = import.meta.env.VITE_API_URL + '/deleteResource'

const Resources = () => {

  const [selectedFilters, setSelectedFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [requestLoader, setRequestLoader] = useState(false)
  const [error, setError] = useState(null)
  const [filteredItems, setFilteredItems] = useState([])
  const [items, setItems] = useState([])
  const tempuser = localStorage.getItem('user')
  const user = JSON.parse(tempuser)
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(baseUrl)
      const data = res.data.data
      console.log(data);
      setFilteredItems(data)
      setItems(data)
      setIsLoading(false)
    } catch (error) {
      setError(error)
      toast.error(error?.response?.data?.message)
    }

  }
  function convertToDateInMillis(dateString) {
    try {
      const dateObj = new Date(dateString);
      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date string format.");
      }
      const currentTime = Date.now();
      const fifteenDaysInMilliseconds = 15 * 24 * 60 * 60 * 1000;
      return (currentTime - dateObj.getTime()) <= fifteenDaysInMilliseconds;
    } catch (error) {
      console.error("Error converting date:", error.message);
      return null;
    }
  }

  const handleFilterButtonClick = (selectedCategory) => {
    setSelectedFilters([selectedCategory]);
  };

  const filterItems = () => {
    const selectedCategory = selectedFilters[0];

    if (selectedCategory) {
      const filteredItems = items.filter((item) => item.category === selectedCategory);
      setFilteredItems(filteredItems);
    } else {
      setFilteredItems([...items]);
    }
  };

  const handleDeleteResource = async (id) => {
    console.log(id);
    try {
      setRequestLoader(true)
      const token = user.token
      await axios.delete(`${deleteUrl}/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        }
      )
      setRequestLoader(false)
      toast.success('Resource deleted')
      navigate('/resources')
      fetchData()
    } catch (error) {
      setRequestLoader(false)
      toast.error(error?.response?.data?.message)
    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterItems()
  }, [selectedFilters])




  return (
    <section className="min-h-screen bg-purple-200 p-4 flex flex-col items-center justify-center">
      <h1 className="text-[35px] font-[700] mb-5">Resources</h1>
      <div className="flex md:justify-between justify-center flex-col w-full lg:w-[980px] items-center">
        <div className="w-full p-5">
          <h2 className="text-[20px] font-[700]">Categories</h2>
          <div className="flex flex-row flex-wrap max-h-[400px] my-[30px] gap-4 lg:w-[980px] w-full">
            {Filters.map((category, index) => {
              return (
                <button
                  className={` p-2 rounded-md  hover:bg-purple-100 hover:text-black ${selectedFilters?.includes(category) ? "bg-purple-100 border-purple-100 text-black hover:bg-purple-300" : "text-white bg-purple-600"
                    }`}
                  onClick={() => handleFilterButtonClick(category)}
                  key={index}>{category}</button>
              )
            })}
            {
              user?.accountType === 'Admin' || user?.accountType === 'SuperAdmin' ? (<Link to='/createResource' className="p-2 rounded-md bg-blue-800 hover:bg-blue-500 text-center text-white font-[500]">Add resource</Link>) : <></>
            }
          </div>
        </div>
        {
          isLoading ? <Loading /> : (
            <div className="w-full min-h-[40vh] bg-purple-200 flex md:flex-row md:flex-wrap flex-col gap-4 mb-5">
              {filteredItems.map((item, idx) => (
                <div key={`items-${idx}`} className="w-full flex items-center justify-center flex-col lg:w-[300px] bg-purple-300 shadow-lg rounded-md ring-1 ring-offset-purple-400 p-1 min-h-[250px] md:h-[300px] relative">
                  {
                    convertToDateInMillis(item?.createdAt) ? (<span className="text-[16px] font-[500] absolute top-1 right-1 py-1 px-4 rounded-md text-black bg-yellow-200 ring-yellow-400 ring-1 drop-shadow-[1.5px_3.5px_3.5px_rgba(221,212,179,1)]">New</span>) : (<></>)
                  }
                  {
                    item.dataType === 'file' ? (
                      <img src={item?.resourseUrl || doc} className="w-full h-[200px]" alt="" />
                    ) : (
                      <a href={item?.resourseUrl} target="_blank" className="text-blue-700">
                        <img src={link} className="w-full h-[200px]" alt="" />
                      </a>
                    )
                  }
                  <p className="text-center text-[18px]">{item.title}</p>
                  {
                    user?.accountType === 'Admin' || user?.accountType === 'SuperAdmin' ? (
                      <div className="w-full flex justify-evenly my-4">
                        <Link
                          className="p-2 rounded-md bg-green-800 hover:bg-green-700 min-h-[30px] flex justify-center items-center text-center text-white font-[500] text-[12px] md:text-[16px]"
                          to={`/updateResource/${item?._id}`}>Update Resource</Link>
                        <button
                          className="p-2 rounded-md bg-red-800 hover:bg-red-700 min-h-[30px] flex justify-center items-center text-center text-white font-[500] text-[12px] md:text-[16px]"
                          onClick={() => handleDeleteResource(item._id)}>
                          Delete Resource
                        </button>
                      </div>
                    ) : (
                      <></>
                    )
                  }
                </div>
              ))}
            </div>
          )
        }
      </div>
    </section>
  )
}

export default Resources