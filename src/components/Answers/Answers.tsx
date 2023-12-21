/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import LikesDislikes from "@/components/Comments/LikesDislikes/LikesDislikes";
import cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
const Answers = ({ answer }) => {
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState(false);
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
      <footer className="flex  mb-2 relative ">
        <div className="flex justify-between w-full bg-indigo-100 p-2 items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold p-2 ">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png"
              alt=""
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
          <p className="text-sm text-gray-600 dark:text-gray-400 pb-3 lg:pb-0">
            <time>
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
      </footer>
      <div className="p-3">
        <p className="text-gray-500 ">{answer.answer_text}</p>
      </div>
    </article>
  );
};

export default Answers;
