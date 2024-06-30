import { FaPlus } from "react-icons/fa";

const Question = ({ question, answer, isSelected, onClick }) => {
    return (
        <article className="bg-purple-100 p-4 border-2 border-black rounded-md shadow-lg flex flex-col jus items-center w-[316px] md:w-[700px]">
            <div className="flex justify-between w-full items-center">
                <h2 className="font-[600] text-[18px]">{question}</h2>
                <span className="border-2 border-black p-1 rounded-full hover:bg-purple-500 transition" onClick={onClick}>
                    <FaPlus />
                </span>
            </div>
            <p className={isSelected ? 'transition-all mt-2 font-sans' : 'hidden'}>
                {answer}
            </p>
        </article>
    )
}

export default Question