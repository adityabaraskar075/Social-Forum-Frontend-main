import { useState } from "react";
import { Link } from "react-router-dom";


const sublinks = [
    {
        id: 1,
        text: 'Teacher Resources',
    },
    {
        id: 2,
        text: 'Student Resources',
    },
    {
        id: 3,
        text: 'E - Resources',
    },
    {
        id: 4,
        text: 'Model Papers',
    },
    {
        id: 5,
        text: 'Career Guidance',
    },
    {
        id: 6,
        text: 'Publications',
    },
];

const Dropdown = () => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <div>
            <ul
                className='transition absolute w-[200px] top-[30px] p-3 flex flex-col gap-2 z-30 shadow-md bg-purple-100/90'
                onClick={() => setDropdown(!dropdown)}
            >
                {sublinks.map((sublink) => {
                    const { id, text } = sublink;
                    return (
                        <p
                            key={id}
                            className='text-[15px] font-normal'
                            onClick={() => {
                                setDropdown(false)
                            }}
                        >
                            {text}
                        </p>
                    );
                })}
            </ul>
        </div>
    );
}

export default Dropdown;