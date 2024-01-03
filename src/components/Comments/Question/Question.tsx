/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
type CommentComponent = {
  user_data: Array<any>;
  answers_data: Array<any>;
  tags: string;
  createdAt: string;
  gained_likes_number: Array<any>;
  gained_dislikes_number: Array<any>;
  question_text: string;
  title: string;
  id: string;
};
type CommentType = {
  comment: CommentComponent;
};
const Comment: React.FC<CommentType> = ({ comment }) => {
  if (!comment.tags) {
    return null;
  }
  const tagsArray: any = comment.tags;

  const renderedTags = tagsArray.map((tag: any, index: any) => (
    <span key={index} className="text-xs mr-1">
      <div className="bg-indigo-100 p-1 inline">{tag}</div>,
    </span>
  ));
  const gained_likes = comment.gained_likes_number?.length || 0;
  const gained_dislikes = comment.gained_dislikes_number?.length || 0;

  return (
    <div className="pt-2">
      <div className="lg:flex gap-2 p-2">
        <div>
          {comment.user_data &&
            comment.user_data.map((user: any) => (
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
          <p>Votes: ({gained_likes + gained_dislikes})</p>
        </div>
        <div>
          {comment.answers_data && (
            <div className="">
              <p>Replyed: ({comment.answers_data.length}) </p>
            </div>
          )}
        </div>
      </div>
      <Link
        href={`/question/${comment.id}`}
        className="py-6 text-base bg-white "
      >
        <footer className="border-b-2 border-indigo-500 mb-2 relative ">
          <div className=" w-full bg-indigo-100 hover:bg-indigo-300 p-2 ">
            <div className="px-2 lg:flex justify-between items-center">
              <div className="">
                <h2>Title: {comment.title} </h2>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-600">
                  <span>Created: </span>
                  <time>
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
            <p className="text-gray-500">{comment.question_text}</p>
          </div>
          <div className="p-3">
            <span>Tags:</span> {renderedTags}
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Comment;
