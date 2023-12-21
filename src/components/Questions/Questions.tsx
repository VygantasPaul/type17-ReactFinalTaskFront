/* eslint-disable @next/next/no-img-element */
import React from "react";

const Questions = ({ question }) => {
  return (
    <article className="p-6 text-base bg-white rounded-lg ">
      <footer className="flex  mb-2 relative">
        <div className="flex justify-between w-full bg-gray-100 p-2 items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png"
              alt="User"
            ></img>
            User
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time title="February 8th, 2022">
              {new Date(question.createdAt).toLocaleString("en-US", {
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
      <p className="text-gray-500 ">{question.question_text}</p>
    </article>
  );
};

export default Questions;
