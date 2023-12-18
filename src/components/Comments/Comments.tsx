/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
type CommentComponent = {
  createdAt: string;
  answers_data: Array<any>;
  question_text: string;
  id: string;
};
type CommentType = {
  comments: Array<CommentComponent> | null;
};
const Comments: React.FC<CommentType> = ({ comments }) => {
  const [dropdownforQuestion, setDropdownforQuestion] = useState({});
  const [dropdownforAnswers, setDropdownforAnswers] = useState({});
  const [formattedDateTime, setFormattedDateTime] = useState("");
  const toggleDropdownQuestion = (commentId) => {
    setDropdownforQuestion((prevStates) => ({
      ...prevStates,
      [commentId]: !prevStates[commentId],
    }));
  };

  const toggleDropdownAnswer = (commentId) => {
    setDropdownforAnswers((prevStates) => ({
      ...prevStates,
      [commentId]: !prevStates[commentId],
    }));
  };

  return (
    <div className="container">
      <section className="bg-white  py-8 lg:py-16 ">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion (20)
            </h2>
          </div>
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200  ">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  "
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Post comment
            </button>
          </form>

          {comments &&
            comments.map((comment) => (
              <div key={comment.id}>
                <article className="p-6 text-base bg-white rounded-lg ">
                  <footer className="flex justify-between items-center mb-2 relative">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                          alt="Michael Gough"
                        ></img>
                        Michael Gough
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time title="February 8th, 2022">
                          {new Date(comment.createdAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })}
                        </time>
                      </p>
                    </div>
                    <button
                      onClick={() => toggleDropdownQuestion(comment.id)}
                      id="dropdownComment1Button"
                      className=" inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 "
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
                    {dropdownforQuestion[comment.id] && (
                      <div className=" z-10 w-36 absolute right-0 top-10 bg-white rounded divide-y divide-gray-100 shadow ">
                        <ul
                          className="py-1 text-sm text-gray-700 "
                          aria-labelledby="dropdownMenuIconHorizontalButton"
                        >
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100 "
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100 "
                            >
                              Remove
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100 "
                            >
                              Report
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </footer>
                  <p className="text-gray-500 ">{comment.question_text}</p>
                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      type="button"
                      className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                    >
                      <svg
                        className="mr-1.5 w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                      </svg>
                      Reply
                    </button>
                  </div>
                </article>

                {/* Map over answers_data if it's an array */}
                {comment.answers_data &&
                  comment.answers_data.map((answer) => (
                    <div key={answer.id}>
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
                                {new Date(answer.createdAt).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                  }
                                )}
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
                                  <a
                                    href="#"
                                    className="block py-2 px-4 hover:bg-gray-100  "
                                  >
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block py-2 px-4 hover:bg-gray-100  "
                                  >
                                    Remove
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block py-2 px-4 hover:bg-gray-100 "
                                  >
                                    Report
                                  </a>
                                </li>
                              </ul>
                            </div>
                          )}
                        </footer>
                        <p className="text-gray-500 ">{answer.answer_text}</p>
                        <div className="flex items-center mt-4 space-x-4">
                          <button
                            type="button"
                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                          >
                            <svg
                              className="mr-1.5 w-3.5 h-3.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                              />
                            </svg>
                            Reply
                          </button>
                        </div>
                      </article>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Comments;
