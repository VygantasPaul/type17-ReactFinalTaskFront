/* eslint-disable @next/next/no-img-element */
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Modal from "@/components/Modal/Modal";
import Answer from "@/components/Comments/Answer/Answer";
import Spinner from "@/components/Spinner/Spinner";
import CommentHeader from "@/components/Comments/CommentsHeader/CommentsHeader";
import Textarea from "@/components/Textarea/Textarea";
import Button from "@/components/Button/Button";
import Alerts from "@/components/Alerts/Alerts";

type QuestionComponent = {
  createdAt: string;
  title: string;
  tags: string;
  gained_likes_number: string;
  question_text: string;
  id: string;
};

const QuestionId: React.FC<QuestionComponent> = () => {
  const [isLoading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [alert, setAlert] = useState<string>("");
  const [answerField, setAnswerField] = useState<string>("");
  const [question, setQuestion] = useState<Array<any> | null>(null);
  const [isModal, setIsModal] = useState(false);
  const [isShowDelete, setiShowDelete] = useState(false);
  const router = useRouter();
  const onDeleteShow = () => {
    setiShowDelete(!isShowDelete);
  };

  const headers = {
    authorization: cookie.get("jwttoken"),
  };
  const fetchQuestion = async (id) => {
    const response = await axios.get(`http://localhost:3010/questions/${id}`, {
      headers,
    });
    setQuestion(response.data.questionAnswer[0]);
  };

  const checkValidation = () => {
    if (!answerField) {
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
    router.query.id && fetchQuestion(router.query.id);
  }, [router.query]);

  const onDelete = async () => {
    try {
      const headers = {
        authorization: cookie.get("jwttoken"),
      };

      const response = await axios.delete(
        `http://localhost:3010/questions/${router.query.id}`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        router.push("/");
      }

      window.alert("Successfully deleted");
    } catch (err) {
      // @ts-ignore
      if (err.response.status === 401) {
        setIsModal(false);
        window.alert("You have no rights to delete this comment");
        return false;
      }
    }
  };

  const onAddAnswer = async () => {
    try {
      const isValid = checkValidation();
      if (isValid) {
        setLoading(true);
        const body = {
          answer_text: answerField,
        };
        const headers = {
          authorization: cookie.get("jwttoken"),
        };
        const response = await axios.post(
          `http://localhost:3010/questions/${router.query.id}/answers`,
          body,
          { headers }
        );
        setLoading(false);
        if (response.status === 200) {
          router.reload();
          setAnswerField("");
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
    <div>
      <PageTemplate>
        <div className="comments_wrap">
          <div className="lg:container ">
            <section className="bg-white py-8 lg:py-16 ">
              <div className="max-w-6xl mx-auto px-4  pb-3">
                <CommentHeader text="Question" commentCount={false} />
                {isLoggedIn && (
                  <form className="mb-6">
                    <Textarea
                      label={false}
                      labelClassName={`block text-sm font-medium leading-6 text-gray-900`}
                      value={String(answerField)}
                      setValue={setAnswerField}
                      id="question"
                      placeholder={`Type answer`}
                    />

                    <Button
                      className="py-2.5 px-4 text-xs font-medium text-center text-white bg-red-500 hover:bg-red-900 rounded-lg focus:ring-4 focus:ring-primary-200"
                      isLoading={isLoading}
                      text="Post answer"
                      onClick={onAddAnswer}
                    />
                    <Alerts alert={alert} />
                  </form>
                )}

                {question ? (
                  <>
                    <footer className="flex mb-2 relative">
                      <div className="lg:flex justify-between w-full bg-indigo-100 p-2 items-center">
                        <div>
                          <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                            <img
                              className="mr-2 w-6 h-6 rounded-full"
                              src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png"
                              alt="User"
                            ></img>
                            User
                          </p>
                          <div className="pt-2">
                            <h2>Title: {question.title}</h2>
                            <h4>
                              <span>Replied:</span>(
                              {question.answers_data.length})
                            </h4>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 pb-3 lg:pb-0">
                            <time title="February 8th, 2022">
                              {new Date(question.createdAt).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                }
                              )}
                            </time>
                          </p>
                        </div>
                        {isLoggedIn && (
                          <button
                            onClick={onDeleteShow}
                            id="dropdownComment1Button"
                            className="relative  items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 "
                            type="button"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 16 3"
                            >
                              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                            <span className="sr-only">Comment settings</span>
                            {isShowDelete && (
                              <div className="z-10 w-36 absolute left-0 lg:right-0 -top-10 lg:-top-10 bg-white rounded divide-y divide-gray-100 shadow ">
                                <ul
                                  className="py-1 text-sm text-gray-700 "
                                  aria-labelledby="dropdownMenuIconHorizontalButton"
                                >
                                  <li>
                                    <a
                                      onClick={() => setIsModal(true)}
                                      className="block py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                    >
                                      Remove
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                    </footer>
                    {isModal && (
                      <Modal
                        onConfirm={() => onDelete(question.id)}
                        onCancel={() => setIsModal(false)}
                      />
                    )}

                    <div className="p-3">
                      <p>{question.question_text}</p>
                    </div>
                    <div>
                      <div className="border-b-2 border-indigo-500 pb-2">
                        <span className="pr-1">Tags:</span>
                        {question.tags.split(",").map((tag, index) => (
                          <span key={index} className="text-xs mr-1">
                            <div className="bg-indigo-100 p-1 inline">
                              {" "}
                              {tag.trim()}
                            </div>
                            ,
                          </span>
                        ))}
                      </div>
                    </div>

                    {question.answers_data &&
                      question.answers_data.map((answer: any) => (
                        <Answer answer={answer} key={answer.id} />
                      ))}
                  </>
                ) : (
                  <p>
                    <Spinner />
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </PageTemplate>
    </div>
  );
};

export default QuestionId;
