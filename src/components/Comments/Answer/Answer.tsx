/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import Modal from "@/components/Modal/Modal";
import ModalLikesAlert from "@/components/Modal/ModalLikesAlert";
import VoteBoxAnswers from "../VotesBox/VoteBoxAnswers";
import { Montserrat } from "next/font/google";
const montserratBold = Montserrat({ subsets: ["latin"], weight: "600" });
type AnswerComponent = {
  createdAt: string;
  answer_text: number;
  id: string;
  user_data: string;
};
type AnswerType = {
  answer: Array<AnswerComponent> | any;
};
const Answer: React.FC<AnswerType> = ({ answer }) => {
  const [isShowDelete, setiShowDelete] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isModalLike, setIsModalLike] = useState(false);
  const [modalAlert, setModalAlert] = useState("");
  const [modalLikesAlert, setModalLikesAlert] = useState("");
  const router = useRouter();
  const headers = {
    authorization: cookie.get("jwttoken"),
  };
  const onDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.DEFAULT_PATH}/answers/${id}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        setModalAlert("Successfully deleted. Redirecting...");
        setTimeout(() => {
          router.push(`${process.env.LOCAL_HOST}/question/${router.query.id}`);
          setIsModal(false);
        }, 1000);
      }
    } catch (err) {
      // @ts-ignore
      if (err.response.status === 401) {
        setModalAlert("You have no rights to delete this comment");
        setTimeout(() => {
          setIsModal(false);
        }, 1000);
      } else {
        console.error(err);
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

  const onClickLike = async (id: string) => {
    const headers = {
      authorization: cookie.get("jwttoken"),
    };
    try {
      const response = await axios.post(
        `${process.env.DEFAULT_PATH}/answers/${id}/like`,
        {},
        {
          headers,
        }
      );

      if (response.status === 200) {
        setIsModalLike(true);
        setModalLikesAlert("Thank you for your vote.");
      }
    } catch (err) {
      // @ts-ignore
      if (err.response.status === 401) {
        setIsModalLike(true);
        setModalLikesAlert("You cant vote because you are not logged in");
        console.error(err);
      }
      // @ts-ignore
      if (err.response.status === 400) {
        setIsModalLike(true);
        setModalLikesAlert("You already have been vooted. ");
      }
      // @ts-ignore
      if (err.response.status === 500) {
        console.error(err);
      }
    }
  };
  const onClickDislike = async (id: string) => {
    try {
      const response = await axios.post(
        `${process.env.DEFAULT_PATH}/answers/${id}/dislike`,
        {},
        {
          headers,
        }
      );

      if (response.status === 200) {
        setIsModalLike(true);
        setModalLikesAlert("Thank you for your vote. ");
      }
    } catch (err) {
      // @ts-ignore
      if (err.response.status === 400) {
        setIsModalLike(true);
        setModalLikesAlert("You already have been vooted.");
      }
      // @ts-ignore
      if (err.response.status === 401) {
        setIsModalLike(true);
        setModalLikesAlert("You cant vote because you are not logged in");
        console.error(err);
      }
      // @ts-ignore
      if (err.response.status === 500) {
        console.error(err);
      }
    }
  };

  return (
    <article className="p-4 sm:p-5 lg:p-6 ml-6 lg:ml-12 text-base bg-white rounded-lg ">
      <footer className="mb-2 relative">
        <div className="lg:flex items-center justify-between w-full bg-indigo-100 p-2">
          <div className="lg:flex items-center gap-3">
            <div className="pt-3">
              {isLoggedIn && (
                <VoteBoxAnswers
                  answer={answer}
                  onLike={() => onClickLike(answer.id)}
                  onDislike={() => onClickDislike(answer.id)}
                />
              )}
            </div>
            <div className="pt-3">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src={answer.user_data.avatar}
                  alt={answer.user_data.name}
                ></img>
                {answer.user_data.name}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center justify-content gap-2">
            <p className="text-sm text-gray-600 dark:text-gray-600">
              <span className={`${montserratBold.className}`}>Created: </span>
              <time>
                {new Date(answer.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </time>
            </p>

            {isLoggedIn && (
              <button
                onClick={onDeleteShow}
                className="relative  items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 0"
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
                {isShowDelete && (
                  <div className="z-10 w-36 absolute right-0 -top-10 lg:-top-10 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow  ">
                    <ul className="py-1 text-sm text-gray-700 ">
                      <li>
                        <a
                          onClick={() => setIsModal(answer.id)}
                          className="block py-2 px-4 hover:bg-gray-100 cursor-pointer"
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            )}
          </div>
        </div>
      </footer>
      {isModal && (
        <Modal
          onConfirm={() => onDelete(answer.id)}
          onCancel={() => setIsModal(false)}
          modalAlert={modalAlert}
        />
      )}
      {isModalLike && (
        <ModalLikesAlert
          modalLikesAlert={modalLikesAlert}
          onCancel={() => {
            setIsModalLike(false);
            setTimeout(() => {
              router.reload();
            }, 800);
          }}
        />
      )}
      <p className="text-gray-500 ">{answer.answer_text}</p>
    </article>
  );
};

export default Answer;
