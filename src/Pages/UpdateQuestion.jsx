import { useEffect, useState } from "react"
import SmallLoader from "../Components/SmallLoader"
import axios from "axios"
import Loading from "./Loading"
import Error from "./Error"
import { Link, useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"

const Url = import.meta.env.VITE_API_URL + '/getQuiz'
const updateUrl = import.meta.env.VITE_API_URL + '/updateQuiz'


const UpdateQuestion = () => {

    const [requestLoader, setRequestLoader] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [category, setCategory] = useState('')
    const [error, setError] = useState(null)
    const { id } = useParams()
    const tempuser = localStorage.getItem('user')
    const user = JSON.parse(tempuser)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const res = await axios.get(`${Url}/${id}`)
                const data = res.data.data
                console.log(data[0]);
                setQuestion(data[0]?.question)
                setOptions(data[0]?.options)
                setCorrectAnswer(data[0]?.correctAnswer)
                setCategory(data[0]?.category)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setError(error)
                toast.error(error?.response?.data?.message)
            }

        }
        fetchData()
    }, [])


    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name === 'question') {
            setQuestion(value)
        }
        if (name === 'correctAnswer') {
            setCorrectAnswer(value)
        }
    }

    const handleOptionChange = (index, value) => {
        setOptions(prevOptions => {
            const updatedOptions = [...prevOptions];
            updatedOptions[index] = value;
            return updatedOptions;
        });
    };


    const handleSelectChange = (e) => {
        setCategory(e.target.value)
    }

    const handleUpdateQuestion = async (e) => {
        e.preventDefault();
        const url = `${updateUrl}/${id}`
        const data = {
            question,
            options,
            correctAnswer,
            category
        }
        console.log(data);

        try {
            setRequestLoader(true)
            const token = user.token
            await axios.put(url, data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            setRequestLoader(false)
            toast.success('Question Updated')
            navigate('/quiz')
        } catch (error) {
            setRequestLoader(false)
            toast.error(error?.response?.data?.message)
        }
    }

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error />
    }

    return (
        <section className='min-h-screen flex items-center flex-col bg-purple-200 p-4'>
            <div className="lg:w-[980px] w-full">
                <h1 className="text-[35px] font-[700]">Update question</h1>
            </div>
            <form onSubmit={handleUpdateQuestion} className="lg:w-[980px] md:w-[700px] w-full flex flex-col gap-2 py-4" >
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-[18px] font-[500]">Question</label>
                    <input
                        value={question}
                        type="text"
                        name="question"
                        id="title"
                        className="p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="options" className="text-[18px] font-[500]">Options</label>
                    {options.map((option, index) => (
                        <div className="flex my-1" key={index}>
                            <input
                                type="text"
                                placeholder={option}
                                value={option}
                                className="p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md"
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="correctAnswer" className="text-[18px] font-[500]">Correct Answer</label>
                    <input
                        value={correctAnswer}
                        type="text"
                        name="correctAnswer"
                        id="correctAnswer"
                        className="p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="category" className="text-[18px] font-[500]">Category</label>
                    <select
                        name="category"
                        id="category"
                        className="p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md mt-1 text-[18px]"
                        onChange={handleSelectChange}>
                        <option className="text-[16px] p-1" value='6'>Class-6</option>
                        <option className="text-[16px] p-1" value="7">Class-7</option>
                        <option className="text-[16px] p-1" value="8">Class-8</option>
                        <option className="text-[16px] p-1" value="9">Class-9</option>
                        <option className="text-[16px] p-1" value="10">Class-10</option>
                        <option className="text-[16px] p-1" value="11">Class-11</option>
                        <option className="text-[16px] p-1" value="12">Class-12</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className='p-2 mt-3 bg-green-700 rounded-md hover:bg-green-400 text-white text-center flex items-center justify-center'>
                    {
                        requestLoader ? <SmallLoader /> : <>Update question</>
                    }
                </button>
                <Link
                    to='/quiz'
                    className='p-2 mt-3 bg-blue-700 rounded-md hover:bg-blue-400 text-white text-center flex items-center justify-center'>
                    No Changes
                </Link>
            </form>
        </section>
    )
}

export default UpdateQuestion