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
import Alerts from "../Alerts/Alerts";
import Input from "@/components/Input/Input";
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
    } else if (!inputRegex.test(tagsField)) {
      setAlert("Tags field should be atleat 5 letters ");
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
          "http://localhost:3010/questions/",
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
        <div className="max-w-6xl mx-auto px-4">
          <CommentHeader text="Total Open questions" commentCount={comments} />
          {isLoggedIn && (
            <form className="mb-6">
              <Input
                label="Title"
                labelClassName={`block text-sm font-medium leading-6 text-gray-900`}
                value={String(titleField)}
                setValue={setTitleField}
                className={`block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                placeholder="Please fill title"
                name="title"
                type="text"
                id="title"
              />
              <Textarea
                label="Question"
                labelClassName={`block text-sm font-medium leading-6 text-gray-900`}
                value={String(questionField)}
                setValue={setQuestionField}
                placeholder={`Type question`}
                id="question"
              />
              <Input
                label="Tags"
                labelClassName={`block text-sm font-medium leading-6 text-gray-900`}
                value={String(tagsField)}
                setValue={setTagsField}
                className={`block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                placeholder="Please fill tags seperating with commas"
                name="tags"
                type="text"
                id="tags"
              />
              <Button
                className="py-2.5 px-4 text-xs font-medium text-center text-white bg-red-500 hover:bg-red-900 rounded-lg focus:ring-4 focus:ring-primary-200"
                isLoading={isLoading}
                text="Post comment"
                onClick={onAddComment}
              />
              <Alerts alert={alert} />
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
