/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
const montserratBold = Montserrat({ subsets: ["latin"], weight: "600" });
interface QuestionType {
  question: any;
}

const Question: React.FC<QuestionType> = ({ question }) => {
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
    <div className="pt-2">
      <div className="lg:flex gap-2 p-2">
        <div>
          {question.user_data &&
            question.user_data.map((user: any) => (
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
        <div>
          <p>
            Votes:{" "}
            <span className={`${montserratBold.className}`}>
              ({gained_likes + gained_dislikes})
            </span>
          </p>
        </div>
        <div>
          {question.answers_data && (
            <div className="">
              <p>
                Replyed:{" "}
                <span className={`${montserratBold.className}`}>
                  ({question.answers_data.length})
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      <Link
        href={`/question/${question.id}`}
        className="py-6 text-base bg-white "
      >
        <footer className="border-b-2 border-indigo-500 mb-2 relative ">
          <div className=" w-full bg-indigo-100 hover:bg-indigo-300 p-2 ">
            <div className="px-2 flex justify-between items-center">
              <div className="">
                <h2>
                  <span className={`${montserratBold.className}`}>Title:</span>{" "}
                  {question.title}{" "}
                </h2>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-600">
                  <span className={`${montserratBold.className}`}>
                    Created:{" "}
                  </span>
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
          </div>
          <div className="p-3">
            <p className="text-gray-500">{question.question_text}</p>
          </div>
          <div className="p-3">
            <span>Tags:</span> {renderedTags}
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Question;
