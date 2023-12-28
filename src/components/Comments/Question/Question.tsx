/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
type CommentComponent = {
  user_data: Array<any>;
  answers_data: Array<any>;
  tags: any;
  createdAt: string;
  gained_likes_number: Array<any>;
  gained_dislikes_number: Array<any>;
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
      <div className="bg-indigo-100 p-1 inline "> {tag}</div> ,
    </span>
  ));
  return (
    <Link href={`/question/${comment.id}`} className="py-6 text-base bg-white ">
      <footer className="border-b-2 border-indigo-500 mb-2 relative ">
        <div className=" w-full bg-indigo-100 hover:bg-indigo-300 p-2 ">
          <div className="px-2 flex justify-between items-center">
            <div>
              <div>
                {comment.answers_data && (
                  <div className="pb-3">
                    <p>Replyed: ({comment.answers_data.length}) </p>
                  </div>
                )}
                {comment.user_data &&
                  comment.user_data.map((user: any) => (
                    <div key={user.id} className="pt-3">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src={user.avatar}
                          alt="User"
                        ></img>
                        {user.name}
                      </p>
                    </div>
                  ))}
              </div>
              <div className="pt-3">
                <h2>Title: {comment.title} </h2>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-600">
                <time title="February 8th, 2022">
                  {new Date(comment.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </time>
              </p>
            </div>
          </div>
        </div>
        <div className="p-3">
          <p className="text-gray-500 ">{comment.question_text}</p>
        </div>
        <div className="p-3">
          <span>Tags:</span> {renderedTags}
        </div>
      </footer>
    </Link>
  );
};

export default Comment;
