import { useEffect, useState } from "react";
import { QuizCategories } from "../Utils/Constant"
import axios from "axios";
import Loading from './Loading'
import Error from './Error'
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const quizUrl = import.meta.env.VITE_API_URL + '/getAllQuizes'
// const baseUrl = import.meta.env.VITE_API_URL + '/getAllQuizes'
const deleteUrl = import.meta.env.VITE_API_URL + '/deleteQuiz'

const Quiz = () => {

  const [selectedFilters, setSelectedFilters] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [quizAnswered, setQuizAnswered] = useState(false)
  const tempuser = localStorage.getItem('user')
  const user = JSON.parse(tempuser)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(quizUrl)
      const data = res.data.data
      console.log(data);
      setFilteredItems(data)
      setItems(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error)
      toast.error(error?.response?.data?.message)
    }

  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }


  const handleChange = (event, questionId) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: event.target.value });
  };

  const calculateScore = () => {
    let score = 0;
    filteredItems.forEach((question) => {
      const correctAnswer = question.correctAnswer;
      const selectedAnswer = selectedAnswers[question._id]; // Retrieve selected answer for the current question

      if (selectedAnswer && selectedAnswer === correctAnswer) {
        score += 1; // Add point value if answer is correct
      }
    });
    setQuizAnswered(true)
    toast.success(`You have scored ${score} out of ${filteredItems.length}`)
    return score;
  };


  const handleFilterButtonClick = (selectedCategory) => {
    setSelectedFilters([selectedCategory]);
    console.log(selectedCategory);
  };

  const filterItems = () => {
    const selectedCategory = selectedFilters[0];
    if (selectedCategory) {
      const filteredItems = items.filter((item) => item.category === selectedCategory);
      const shuffledItems = shuffleArray(filteredItems.slice());
      console.log(shuffledItems);
      setFilteredItems(shuffledItems);
    } else {
      setFilteredItems([...items]);
    }
  };

  const deleteQuiz = async (id) => {
    console.log(id);
    try {
      const token = user.token
      await axios.delete(`${deleteUrl}/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        }
      )
      toast.success('Question deleted')
      fetchData()
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterItems()
    setQuizAnswered(false)
  }, [selectedFilters])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <section className="min-h-screen bg-purple-200 p-4 flex flex-col items-center justify-center">
      <h1 className="text-[35px] font-[700]">Take a Quiz!!!</h1>
      <div className="flex flex-col w-full lg:w-[980px] items-center p-5">
        <div className="w-full p-5">
          <h2 className="text-[20px] font-[700]">Class</h2>
          <div className="flex flex-row flex-wrap mt-[30px] gap-4">
            {QuizCategories.map((category, index) => {
              return (
                <button
                  className={`p-2 rounded-md  hover:bg-purple-100 hover:text-black ${selectedFilters?.includes(category) ? "bg-purple-100 border-purple-100 text-black hover:bg-purple-300" : "text-white bg-purple-600"
                    }`}
                  onClick={() => handleFilterButtonClick(category)}
                  key={index}>{`Class-${category}`}</button>
              )
            })}
            {
              user?.accountType === 'Admin' || user?.accountType === 'SuperAdmin' ? (
                <Link to='/createQuestion' className="p-2 rounded-md bg-blue-800  hover:bg-blue-700 text-white text-center">Add question</Link>
              ) : (<></>)
            }
          </div>
        </div>
        <div className="w-full bg-transparent">
          {filteredItems.map((item, idx) => (
            <div key={`items-${idx}`} className="w-full p-2">
              <p className="text-[16px]">({idx + 1}). {item.question}</p>
              {
                item.options.map((option, idx) => (
                  <div className="my-1 flex gap-2 items-center" key={idx}>
                    <input
                      type="radio"
                      name={item?._id}
                      value={option}
                      id="option"
                      checked={selectedAnswers[item?._id] === option}
                      onChange={(e) => handleChange(e, item?._id)} />
                    <label htmlFor={`${item?._id}-${idx}`}>{option}</label>
                  </div>
                ))
              }
              {
                quizAnswered ? (<p className="text-[16px]">Correct answer : {item.correctAnswer}</p>) : (<></>)
              }
              {
                user?.accountType === 'Admin' || user?.accountType === 'SuperAdmin' ? (
                  <div className="flex gap-2">
                    <Link to={`/updateQuiz/${item._id}`} className="p-2 rounded-md bg-green-800 hover:bg-green-700 min-h-[20px] flex justify-center items-center text-center text-white font-[500] text-[12px] md:text-[16px]">Update question</Link>
                    <button className="p-2 rounded-md bg-red-800 hover:bg-red-700 min-h-[20px] flex justify-center items-center text-center text-white font-[500] text-[12px] md:text-[16px]" onClick={() => deleteQuiz(item._id)}>
                      Delete Question
                    </button>
                  </div>
                ) : (
                  <></>
                )
              }
            </div>
          ))}
          <button
            className='p-2 mt-3 bg-blue-700 rounded-md hover:bg-blue-400 text-white text-center flex items-center justify-center'
            onClick={calculateScore}>Check score</button>
        </div>
      </div>
    </section>
  )
}

export default Quiz