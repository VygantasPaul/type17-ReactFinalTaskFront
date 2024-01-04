/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import VoteBoxAnswers from "@/components/Comments/VotesBox/VoteBoxAnswers";
import ModalLikesAlert from "@/components/Modal/ModalLikesAlert";
import cookie from "js-cookie";
import axios from "axios";
import { Montserrat } from "next/font/google";
const montserratBold = Montserrat({ subsets: ["latin"], weight: "600" });
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
        router.reload();
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
      if (err.response.status === 500 || err.response.status === 401) {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    const cookieLogged = cookie.get("jwttoken");
    if (cookieLogged) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
  return (
    <article className="text-base bg-white rounded-lg ">
      {
        // @ts-ignore
        answer.user_data &&
          // @ts-ignore
          answer.user_data.map((user: any) => (
            <div key={user.id}>
              <p className="inline-flex items-center mr-3 pt-4 text-sm text-gray-900  font-semibold">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src={user.avatar}
                  alt={user.name}
                ></img>
                {user.name}
              </p>
            </div>
          ))
      }
      <footer className="flex relative items-center">
        <div className="flex justify-between w-full bg-indigo-100 p-3 items-center">
          <div className="lg:flex items-center gap-1">
            {isLoggedIn && (
              <VoteBoxAnswers
                // @ts-ignore
                answer={answer}
                // @ts-ignore
                onLike={() => onClickLike(answer.id)}
                // @ts-ignore
                onDislike={() => onClickDislike(answer.id)}
                // @ts-ignore
              />
            )}
          </div>
          <p className="text-sm text-gray-600  pb-3 lg:pb-0 pl-2">
            <span className={`${montserratBold.className}`}>Created: </span>
            <time>
              {
                // @ts-ignore
                new Date(answer.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })
              }
            </time>
          </p>
        </div>
      </footer>
      {isModalLike && (
        <ModalLikesAlert
          modalLikesAlert={modalLikesAlert}
          onCancel={() => {
            setIsModalLike(false);
          }}
        />
      )}
      <div className="p-3">
        <p className="text-gray-500 ">
          {
            // @ts-ignore
            answer.answer_text
          }
        </p>
      </div>
    </article>
  );
};

export default Answers;
