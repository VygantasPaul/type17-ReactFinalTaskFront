/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
type CommentComponent = {
  createdAt: string;
  gained_likes_number: string;
  question_text: string;
  id: string;
};
type CommentType = {
  comment: CommentComponent;
};
const Comment: React.FC<CommentType> = ({ comment }) => {
  if (!comment.tags) {
    return null;
  }
  const tagsString = comment.tags;

  const renderedTags = tagsString.split(",").map((tag, index) => (
    <span key={index} className="text-xs mr-1">
      <div className="bg-gray-300 p-1 inline "> {tag}</div> ,
    </span>
  ));
  return (
    <Link
      href={`/question/${comment.id}`}
      className="py-6 text-base bg-white rounded-lg "
    >
      <footer className="flex  mb-2 relative">
        <div className=" w-full bg-gray-100 p-2 ">
          <div className="p-3 lg:flex justify-between items-center">
            <div>
              <div className="pb-3">
                <h2>Title: {comment.title}</h2>
              </div>
              <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png"
                  alt="User"
                ></img>
                User
              </p>
            </div>

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
          </div>
        </div>
      </footer>

      <div className="p-3">
        <p className="text-gray-500 ">{comment.question_text}</p>
      </div>
      <div className="p-3">
        <span>Tags:</span> {renderedTags}
      </div>
    </Link>
  );
};

export default Comment;