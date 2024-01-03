/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import CommentHeader from "./CommentsHeader/CommentsHeader";
import AnsweredComments from "./AnsweredComments/AnsweredComments";
import UnAnsweredComments from "./UnAnsweredComments/UnAnsweredComments";
import AllComments from "./AllComments/AllComments";
import Form from "./AddQuestionForm/AddQuestionForm";
type CommentsType = {
  comments: Array<any> | null;
};
const Comments: React.FC<CommentsType> = ({ comments }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState<string>("");
  const [questionField, setQuestionField] = useState<string>("");
  const [titleField, setTitleField] = useState<string>("");
  const [tagsField, setTagsField] = useState<string>("");
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
    const inputRegex = /^\S.{5,}/;

    if (!titleField || !questionField || !tagsField) {
      setAlert("Please fill in all required fields");
      return false;
    } else if (!inputRegex.test(titleField)) {
      setAlert("Title field should be atleat 5 letters");
      return false;
    } else if (!inputRegex.test(questionField)) {
      setAlert("Question field should be atleat 5 letters ");
      return false;
    } else {
      setAlert("Comment added successfully");
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
          title: titleField,
          tags: tagsField,
        };
        const headers = {
          authorization: cookie.get("jwttoken"),
        };
        const response = await axios.post(
          `${process.env.DEFAULT_PATH}/questions/`,
          body,
          { headers }
        );
        setLoading(false);
        if (response.status === 200) {
          router.reload();
          setTitleField("");
          setQuestionField("");
          setTagsField("");
        }
      }
    } catch (err) {
      // @ts-ignore
      if (err.response.status === 401) {
        setAlert("You login has expired. Please re-login.");
        return false;
      }
    }
  };
  useEffect(() => {
    const cookieLogged = cookie.get("jwttoken");

    if (cookieLogged) {
      setLoggedIn(true);
    } else {
      cookie.remove("jwttoken");
      setLoggedIn(false);
    }
  }, []);

  return (
    <div className="lg:container ">
      <section className="bg-white py-8 lg:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <CommentHeader text="Total Open questions" commentCount={comments} />
          {isLoggedIn && (
            <Form
              titleField={titleField}
              setTitleField={setTitleField}
              questionField={questionField}
              setQuestionField={setQuestionField}
              tagsField={tagsField}
              setTagsField={setTagsField}
              isLoading={isLoading}
              onAddComment={onAddComment}
              alert={alert}
            />
          )}

          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
            <ul className="flex flex-wrap -mb-px ">
              <li className="me-2">
                <a
                  onClick={allToShow}
                  className={`inline-block p-4 border-b-2 hover:text-red-300  rounded-t-lg border-transparent hover:text-red-500 hover:border-red-500 cursor-pointer ${
                    isShowAll ? `border-red-500 border-b-2 text-red-500` : ""
                  }`}
                >
                  All
                </a>
              </li>
              <li className="me-2">
                <a
                  onClick={answeredToShow}
                  className={`inline-block p-4  border-b-2 hover:text-red-300 rounded-t-lg border-transparent hover:text-red-500 hover:border-red-500 cursor-pointer ${
                    isShowAnswered
                      ? `border-red-500 border-b-2 text-red-500`
                      : ""
                  }`}
                >
                  Answered
                </a>
              </li>
              <li className="me-2">
                <a
                  onClick={unansweredToShow}
                  className={`inline-block p-4 border-b-2  rounded-t-lg border-transparent  hover:text-red-500 hover:border-red-500 hover:border-red-300 cursor-pointer ${
                    isShowUnAnswered
                      ? `border-red-500 border-b-2 text-red-500`
                      : ""
                  }`}
                >
                  Unanswered
                </a>
              </li>
            </ul>
          </div>

          {isShowAll && <AllComments comments={comments} />}
          {isShowAnswered && <AnsweredComments comments={comments} />}
          {isShowUnAnswered && <UnAnsweredComments comments={comments} />}
        </div>
      </section>
    </div>
  );
};

export default Comments;
