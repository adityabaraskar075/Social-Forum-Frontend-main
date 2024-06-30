import { useState } from "react"
import SmallLoader from "../Components/SmallLoader"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"

const createQuiz = import.meta.env.VITE_API_URL + '/createQuiz'

const CreateQuestion = () => {
    const [question, setQuestion] = useState('')
    const [requestLoader, setRequestLoader] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [category, setCategory] = useState('6')
    const [options, setOptions] = useState(Array(4).fill(""));
    const navigate = useNavigate()
    const tempuser = localStorage.getItem('user')
    const user = JSON.parse(tempuser)
    // setFormData({
    //     ...formData,
    //     category: '6'
    // })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name === 'question') {
            setQuestion(value)
        }
        if (name === 'correctAnswer') {
            setCorrectAnswer(value)
        }
    }

    const handleSelectChange = (e) => {
        setCategory(e.target.value)
        // setFormData({
        //     ...formData,
        //     [name]: value
        // })
    }

    const handleOptionChange = (index, value) => {
        setOptions(prevOptions => {
            const updatedOptions = [...prevOptions];
            updatedOptions[index] = value;
            return updatedOptions;
        });
    };

    const handleCreateResource = async (e) => {
        e.preventDefault()
        const data = {
            question,
            correctAnswer,
            options,
            category
        }
        try {
            setRequestLoader(true)
            const token = user.token
            if (!question || !category || !options || !correctAnswer) {
                toast.error('Enter all fields')
            }

            await axios.post(createQuiz, data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            setRequestLoader(false)
            toast.success('Question created')
            navigate('/quiz')
        } catch (error) {
            setRequestLoader(false)
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <section className='min-h-screen flex items-center flex-col bg-purple-200 p-4'>
            <div className="lg:w-[980px] w-full">
                <h1 className="text-[35px] font-[700]">Add new question</h1>
            </div>
            <form onSubmit={handleCreateResource} className="lg:w-[980px] md:w-[700px] w-full flex flex-col gap-2 py-4" >
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-[18px] font-[500]">Question</label>
                    <input
                        value={question}
                        type="text"
                        name="question"
                        id="title"
                        className="p-2 outline-none focus:border-2 focus:border-blue-600 rounded-md"
                        onChange={handleInputChange}
                        required />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="options" className="text-[18px] font-[500]">Options</label>
                    {Array(4).fill(null).map((_, index) => (
                        <div className="flex my-1" key={index}>
                            <input
                                type="text"
                                placeholder={`Option ${index + 1}`}
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
                        required />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="category" className="text-[18px] font-[500]">Category</label>
                    <select
                        name="category"
                        id="category"
                        required
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
                    className='p-2 mt-3 bg-blue-700 rounded-md hover:bg-blue-400 text-white text-center flex items-center justify-center'>
                    {
                        requestLoader ? <SmallLoader /> : <>Create Resource</>
                    }
                </button>
            </form>
        </section>
    )
}

export default CreateQuestion