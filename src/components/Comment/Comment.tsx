/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import cookie from "js-cookie";
import axios from "axios";
import Textarea from "../Textarea/Textarea";
import Button from "../Button/Button";
type CommentComponent = {
  createdAt: string;
  question_text: string;
  id: string;
};
type CommentType = {
  comment: Array<CommentComponent>;
};
const Comment: React.FC<CommentType> = ({ comment, setComments }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [answerField, setAnswerField] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [isAnswerReply, setAnswerReply] = useState(false);
  const [isShowDelete, setiShowDelete] = useState(false);

  const onDeleteShow = () => {
    setiShowDelete(!isShowDelete);
  };
  const onReplyShow = () => {
    setAnswerReply(!isAnswerReply);
  };
  useEffect(() => {
    const cookieLogged = cookie.get("jwttoken");
    if (cookieLogged) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
  const onDelete = async (id: string) => {
    try {
      const headers = {
        authorization: cookie.get("jwttoken"),
      };

      const response = await axios.delete(
        `http://localhost:3010/questions/${id}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        window.alert("Success");
      }
    } catch (err) {
      if (err.response.status === 401) {
        setAlert("Bad Authentification");
        return false;
      }
    }
  };

  const checkAnswerValidation = () => {
    if (!answerField) {
      setAlert("Please fill answer field");
      return false;
    } else {
      setAlert("Answer added");
      return true;
    }
  };
  const onAddAnswer = async (commentId: string) => {
    try {
      const isValid = checkAnswerValidation();
      if (isValid) {
        setLoading(true);
        const body = {
          answer_text: answerField,
        };
        const headers = {
          authorization: cookie.get("jwttoken"),
        };
        const response = await axios.post(
          `http://localhost:3010/questions/${commentId}/answers`,
          body,
          { headers }
        );
        setLoading(false);
        if (response.status === 200) {
          setAnswerField("");
        }
      }
    } catch (err) {
      // @ts-ignore
      if (err.response.status === 401) {
        setAlert("Bad Authentification");
        return false;
      }
    }
  };

  return (
    <article className="p-6 text-base bg-white rounded-lg ">
      <footer className="flex  mb-2 relative">
        <div className="flex justify-between w-full bg-gray-100 p-2 items-center">
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
              })}
            </time>
          </p>

          {isLoggedIn && (
            <button
              onClick={onDeleteShow}
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
          )}
        </div>
        {isShowDelete && (
          <div className=" z-10 w-36 absolute right-0 top-10 bg-white rounded divide-y divide-gray-100 shadow ">
            <ul
              className="py-1 text-sm text-gray-700 "
              aria-labelledby="dropdownMenuIconHorizontalButton"
            >
              <li>
                <a
                  onClick={() => onDelete(comment.id)}
                  className="block py-2 px-4 hover:bg-gray-100 "
                >
                  Remove
                </a>
              </li>
            </ul>
          </div>
        )}
      </footer>
      <p className="text-gray-500 ">{comment.question_text}</p>
      {isLoggedIn && (
        <div className=" items-center mt-4 ">
          <button
            onClick={onReplyShow}
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
          {isAnswerReply && (
            <form className="mb-6 pt-5">
              <Textarea value={answerField} setValue={setAnswerField} />
              <Button
                className="py-2.5 px-4 text-xs font-medium text-center text-white bg-green-500 hover:bg-green-700 rounded-lg focus:ring-4 focus:ring-primary-200"
                isLoading={isLoading}
                text="Post answer"
                onClick={() => onAddAnswer(comment.id)}
              />
              {alert && <div className="text-red-500">{alert}</div>}
            </form>
          )}
        </div>
      )}
    </article>
  );
};

export default Comment;
