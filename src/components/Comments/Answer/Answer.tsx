/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import Modal from "@/components/Modal/Modal";
import LikesDislikes from "../LikesDislikes/LikesDislikes";
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
  const [isModal, setIsModal] = useState(false);
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
        router.reload();
      }
    } catch (err) {
      if (err.response.status === 401) {
        console.log(err);
        setIsModal(false);
        window.alert("You have no rights to delete this comment");
        return false;
      }
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
        window.alert("Thank you for your vote");
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
        window.alert("Thank you for your vote");
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
        <div className="lg:flex items-center justify-between w-full bg-gray-100 p-2">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png"
              alt="User"
            ></img>
            User
          </p>
          {isLoggedIn && (
            <LikesDislikes
              answer={answer}
              onLike={() => onClickLike(answer.id)}
              onDislike={() => onClickDislike(answer.id)}
            />
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
                  onClick={() => setIsModal(answer.id)}
                  className="block py-2 px-4 hover:bg-gray-100 cursor-pointer"
                >
                  Remove
                </a>
              </li>
            </ul>
          </div>
        )}
      </footer>
      {isModal && (
        <Modal
          onConfirm={() => onDelete(answer.id)}
          onCancel={() => setIsModal(false)}
        />
      )}
      <p className="text-gray-500 ">{answer.answer_text}</p>
    </article>
  );
};

export default Answer;
