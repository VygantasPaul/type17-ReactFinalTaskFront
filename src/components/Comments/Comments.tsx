/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Textarea from "../Textarea/Textarea";
import Comment from "../Comment/Comment";
import Answer from "../Answer/Answer";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import CommentHeader from "../CommentsHeader/CommentsHeader";

type CommentsType = {
  comments: Array<any> | null; ///tikisi nullo arba masyvo
};
const Comments: React.FC<CommentsType> = ({ comments }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState<string>("");
  const [questionField, setQuestionField] = useState<string>("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const checkValidation = () => {
    if (!questionField) {
      setAlert("Please fill comment field");
      return false;
    } else {
      setAlert("Comment added");
      return true;
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
  const onAddComment = async () => {
    try {
      const isValid = checkValidation();
      if (isValid) {
        setLoading(true);
        const body = {
          question_text: questionField,
        };
        const headers = {
          authorization: cookie.get("jwttoken"),
        };
        const response = await axios.post(
          "http://localhost:3010/questions/",
          body,
          { headers }
        );
        setLoading(false);
        if (response.status === 200) {
          router.reload();
          // setComments((prevState: []) => [...(prevState || []), response.data]);
          setQuestionField("");
        }
      }
    } catch (err) {
      // @ts-ignore
      if (err.response.status === 401) {
        setAlert("Bad Authentification");
        return false;
      }
    }
  };

  return (
    <div className="lg:container ">
      <section className="bg-white py-8 lg:py-16 ">
        <div className="max-w-4xl mx-auto px-4">
          <CommentHeader comments={comments} />
          {isLoggedIn && (
            <form className="mb-6">
              <Textarea value={questionField} setValue={setQuestionField} />

              <Button
                className="py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 hover:bg-red-900 rounded-lg focus:ring-4 focus:ring-primary-200"
                isLoading={isLoading}
                text="Post comment"
                onClick={onAddComment}
              />
              {alert && (
                <div className="text-red-500 mt-2 p-2 border-2 border-red-300">
                  {alert}
                </div>
              )}
            </form>
          )}
          <>
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                <li className="me-2">
                  <a
                    onClick={allToShow}
                    className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  >
                    All
                  </a>
                </li>
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                    aria-current="page"
                  >
                    Answered
                  </a>
                </li>
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  >
                    Unanswered
                  </a>
                </li>
              </ul>
            </div>
          </>
          {comments &&
            comments
              .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
              .map((comment) => (
                <div className="comments_wrap" key={comment.id}>
                  <Comment key={comment.id} comment={comment} />
                  {comment.answers_data &&
                    comment.answers_data.map((answer: any) => (
                      <Answer answer={answer} key={answer.id} />
                    ))}
                </div>
              ))}
        </div>
      </section>
    </div>
  );
};

export default Comments;
