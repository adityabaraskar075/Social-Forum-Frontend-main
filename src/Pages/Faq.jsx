import Question from "../Components/Faq/Question"
import { useState } from "react"

export const Questions = [
  {
    id: 1,
    question: 'What is the purpose of the social studies website?',
    answer: 'Our website is dedicated to providing students with a rich and engaging learning experience in the field of social studies. We offer quality notes, resources, and support to help enhance their understanding of history, geography, and culture.',
    isOpen: false
  },
  {
    id: 2,
    question: 'How can I access the study materials on the website?',
    answer: 'All study materials, notes, and resources are accessible on our website. Simply navigate to the relevant sections or use the search feature to find the content you need.',
    isOpen: false
  },
  {
    id: 3,
    question: 'Is the website suitable for a specific grade level or age group?',
    answer: 'Our content caters to students across various grade levels. Whether you are in elementary, middle, or high school, you will find resources tailored to your curriculum.',
    isOpen: false
  },
  {
    id: 4,
    question: 'How can I get in touch with the teaching team for additional help?',
    answer: 'Feel free to use the contact form on our website to reach out to our teaching team. We are here to assist you with any questions, clarifications, or additional support you may need.',
    isOpen: false
  },
  {
    id: 5,
    question: 'Can I share the content from the website with others?',
    answer: 'Absolutely! We encourage you to share the knowledge. Feel free to share links to our resources with your classmates, friends, and anyone else who might find them helpful.',
    isOpen: false
  },
  {
    id: 6,
    question: 'How often is the website updated with new content?',
    answer: 'We strive to regularly update our content to provide fresh and relevant materials. Check back frequently or follow our social media profiles for announcements about new additions and updates.',
    isOpen: false
  }
]

const Faq = () => {

  const [selectedDiv, setSelectedDiv] = useState(null)
  const handleDivClick = (index) => {
    setSelectedDiv(index);
  };

  return (
    <section className='min-h-screen flex items-center flex-col'>
      <div className="max-w-[1080px] my-[50px]">
        <h1 className="text-[35px] font-[700] text-center block lg:w-[1080px] mb-10"> Frequently asked questions </h1>
        <div className="flex flex-col gap-5 items-center">
          {
            Questions.map((item, index) => {
              const { id, question, answer, isOpen } = item
              return <Question
                key={id}
                isSelected={selectedDiv === index}
                onClick={() => handleDivClick(index)}
                question={question}
                answer={answer}
                isOpen={isOpen} />
            })
          }
        </div>
      </div>
    </section>
  )
}

export default Faq