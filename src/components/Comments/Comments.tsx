/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Textarea from "../Textarea/Textarea";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import CommentHeader from "./CommentsHeader/CommentsHeader";
import AnsweredComments from "./AnsweredComments/AnsweredComments";
import UnAnsweredComments from "./UnAnsweredComments/UnAnsweredComments";
import AllComments from "./AllComments/AllComments";
import styles from "./Comments.module.css";
type CommentsType = {
  comments: Array<any> | null;
};
const Comments: React.FC<CommentsType> = ({ comments }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [alert, setAlert] = useState<string>("");
  const [questionField, setQuestionField] = useState<string>("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [isShowAll, setShowAll] = useState(true);
  const [isShowAnswered, setShowAnswered] = useState(false);
  const [isShowUnAnswered, setUnanswered] = useState(false);

  const allToShow = () => {
    setShowAll(true);
    setShowAnswered(false);
    setUnanswered(false);
  };

  const answeredToShow = () => {
    setShowAnswered(true);
    setShowAll(false);
    setUnanswered(false);
  };

  const unansweredToShow = () => {
    setUnanswered(true);
    setShowAnswered(false);
    setShowAll(false);
  };

  const checkValidation = () => {
    if (!questionField) {
      setAlert("Please fill comment field");
      return false;
    } else {
      setAlert("Comment added");
      return true;
    }
  };

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
  useEffect(() => {
    const cookieLogged = cookie.get("jwttoken");
    if (cookieLogged) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
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
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
              <ul className="flex flex-wrap -mb-px">
                <li className="me-2">
                  <a
                    onClick={allToShow}
                    className={`inline-block p-4 border-b-2 hover:text-red-300  rounded-t-lg border-transparent hover:text-red-500 hover:border-red-500 cursor-pointer ${
                      isShowAll ? `${styles.active}` : ""
                    }`}
                  >
                    All
                  </a>
                </li>
                <li className="me-2">
                  <a
                    onClick={answeredToShow}
                    className={`inline-block p-4  border-b-2 hover:text-red-300 rounded-t-lg border-transparent hover:text-red-500 hover:border-red-500 cursor-pointer ${
                      isShowAnswered ? `${styles.active}` : ""
                    }`}
                  >
                    Answered
                  </a>
                </li>
                <li className="me-2">
                  <a
                    onClick={unansweredToShow}
                    className={`inline-block p-4 border-b-2  rounded-t-lg border-transparent  hover:text-red-500 hover:border-red-500 hover:border-red-300 cursor-pointer ${
                      isShowUnAnswered ? `${styles.active}` : ""
                    }`}
                  >
                    Unanswered
                  </a>
                </li>
              </ul>
            </div>
          </>
          {isShowAll && <AllComments comments={comments} />}
          {isShowAnswered && <AnsweredComments comments={comments} />}
          {isShowUnAnswered && <UnAnsweredComments comments={comments} />}
        </div>
      </section>
    </div>
  );
};

export default Comments;
