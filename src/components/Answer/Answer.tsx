import React, { useState } from "react";
type AnswerComponent = {
  createdAt: string;
  answer_text: string;
  id: string;
};
type AnswerType = {
  answer: Array<AnswerComponent> | null;
};
const Answer: React.FC<AnswerType> = ({ answer }) => {
  const [dropdownforAnswers, setDropdownforAnswers] = useState({});

  const toggleDropdownAnswer = (commentId: string) => {
    setDropdownforAnswers((prevStates) => ({
      ...prevStates,
      [commentId]: !prevStates[commentId],
    }));
  };
  return (
    <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg ">
      <footer className="flex justify-between items-center mb-2 relative">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="Jese Leos"
            ></img>
            Jese Leos
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time title="February 12th, 2022">
              {new Date(answer.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </time>
          </p>
        </div>
        <button
          onClick={() => toggleDropdownAnswer(answer.id)}
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 0"
          type="button"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
        {dropdownforAnswers[answer.id] && (
          <div className="absolute right-0 top-10 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow  ">
            <ul className="py-1 text-sm text-gray-700 ">
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-gray-100  ">
                  Remove
                </a>
              </li>
            </ul>
          </div>
        )}
      </footer>
      <p className="text-gray-500 ">{answer.answer_text}</p>
    </article>
  );
};

export default Answer;
