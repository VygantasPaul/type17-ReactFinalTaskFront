/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
type AnswerComponent = {
  createdAt: string;
  answer_text: number;
  id: string;
};
type AnswerType = {
  answer: Array<AnswerComponent> | null;
};
const Answer: React.FC<AnswerType> = ({ answer }) => {
  const [isShowDelete, setiShowDelete] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const onDelete = async (id: string) => {
    try {
      const headers = {
        authorization: cookie.get("jwttoken"),
      };

      const response = await axios.delete(
        `http://localhost:3010/answers/${id}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        window.alert("Success");
        router.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onDeleteShow = () => {
    setiShowDelete(!isShowDelete);
  };
  useEffect(() => {
    const cookieLogged = cookie.get("jwttoken");
    if (cookieLogged) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const onClickLike = async (id: number) => {
    try {
      const headers = {
        authorization: cookie.get("jwttoken"),
      };

      const response = await axios.post(
        `http://localhost:3010/answers/${id}/like`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        window.alert("Success");
        router.reload();
      }
    } catch (err) {
      if (err.response.status === 500) {
        window.alert("Error");
      }
      console.error(err);
    }
  };
  const onClickDislike = async (id: number) => {
    try {
      const headers = {
        authorization: cookie.get("jwttoken"),
      };

      const response = await axios.post(
        `http://localhost:3010/answers/${id}/dislike`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        window.alert("Success");
        router.reload();
      }
    } catch (err) {
      if (err.response.status === 500) {
        window.alert("Error");
      }
      console.error(err);
    }
  };
  return (
    <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg ">
      <footer className="flex justify-between items-center mb-2 relative">
        <div className="flex items-center justify-between w-full bg-gray-100 p-2">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="Jese Leos"
            ></img>
            Jese Leos
          </p>
          {isLoggedIn && (
            <>
              <div className="flex gap-2">
                <svg
                  onClick={() => onClickLike(answer.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  data-slot="icon"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  />
                </svg>

                <span>
                  {answer.gained_likes_number ? (
                    answer.gained_likes_number
                  ) : (
                    <>0</>
                  )}
                </span>

                <svg
                  onClick={() => onClickDislike(answer.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  data-slot="icon"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                  />
                </svg>
              </div>
            </>
          )}

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

          {isLoggedIn && (
            <button
              onClick={onDeleteShow}
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
          )}
        </div>
        {isShowDelete && (
          <div className="absolute right-0 top-10 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow  ">
            <ul className="py-1 text-sm text-gray-700 ">
              <li>
                <a
                  onClick={() => onDelete(answer.id)}
                  className="block py-2 px-4 hover:bg-gray-100 cursor-pointer"
                >
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
