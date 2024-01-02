/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
type QuestionType = {
  question_text: string;
  tags: string[];
  answers_data: any[];
  user_data: any[];
  createdAt: string;
  title: string;
  question: any;
};

const Questions: React.FC<QuestionType> = ({ question }) => {
  if (!question.tags) {
    return null;
  }
  const tagsString = question.tags;

  const renderedTags = tagsString.map((tag: string, index: null) => (
    <span key={index} className="text-xs mr-1">
      <div className="bg-indigo-100 p-1 inline"> {tag}</div> ,
    </span>
  ));
  const gained_likes = question.gained_likes_number?.length || 0;
  const gained_dislikes = question.gained_dislikes_number?.length || 0;
  return (
    <article className=" text-base bg-white border-b-2 border-indigo-500 mb-2">
      <footer className="flex bg-indigo-100  mb-2 relative">
        <div className="p-3 flex w-full justify-between items-center">
          <div>
            <p>Votes: ({gained_likes + gained_dislikes})</p>
            {question.answers_data && (
              <div className="">
                <p>Replyed: ({question.answers_data.length}) </p>
              </div>
            )}
          </div>
          <div>
            {question.user_data &&
              question.user_data.map((user: any) => (
                <div key={user.id} className="pt-3">
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
          <div className="">
            <h2>Title: {question.title} </h2>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time>
                {new Date(question.createdAt).toLocaleString("en-US", {
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
      </footer>
      <div className="p-3">
        <p className="text-gray-500 ">{question.question_text}</p>
      </div>
      <div className="p-3">
        <span>Tags:</span> {renderedTags}
      </div>
    </article>
  );
};

export default Questions;
