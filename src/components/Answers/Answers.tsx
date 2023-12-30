/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import VoteBoxAnswers from "@/components/Comments/VotesBox/VoteBoxAnswers";
import ModalLikesAlert from "@/components/Modal/ModalLikesAlert";
import cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
type AnswerComponent = {
  answer: string;
};
const Answers: React.FC<AnswerComponent> = ({ answer }) => {
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isModalLike, setIsModalLike] = useState(false);
  const [modalLikesAlert, setModalLikesAlert] = useState("");
  const headers = {
    authorization: cookie.get("jwttoken"),
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
      if (err.response.status === 500 || err.response.status === 401) {
        console.error(err);
      }
    }
  };

  return (
    <article className="text-base bg-white rounded-lg ">
      <footer className="flex mb-2 relative ">
        <div className="flex justify-between w-full bg-indigo-100 p-2 items-center">
          <div className="lg:flex items-center gap-2">
            {isLoggedIn && (
              <VoteBoxAnswers
                answer={answer}
                onLike={() => onClickLike(answer.id)}
                onDislike={() => onClickDislike(answer.id)}
              />
            )}

            {answer.user_data &&
              answer.user_data.map((user: any) => (
                <div key={user.id}>
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={user.avatar}
                      alt={user.name}
                    ></img>
                    {user.name}
                  </p>
                </div>
              ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 pb-3 lg:pb-0">
            <span>Created: </span>
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
        </div>
      </footer>
      <>
        {isModalLike && (
          <ModalLikesAlert
            modalLikesAlert={modalLikesAlert}
            onCancel={() => {
              setIsModalLike(false);
              router.reload();
            }}
          />
        )}
      </>
      <div className="p-3">
        <p className="text-gray-500 ">{answer.answer_text}</p>
      </div>
    </article>
  );
};

export default Answers;
