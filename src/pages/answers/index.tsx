/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Spinner from "@/components/Spinner/Spinner";
import axios from "axios";
const Answers = () => {
  const [answers, setAnswers] = useState<Array<any> | null>(null);
  const fetchAnswers = async () => {
    try {
      const response = await axios.get("http://localhost:3010/answers");
      setAnswers(response.data.answers);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchAnswers();
  }, []);
  return (
    <PageTemplate>
      <div className="comments_wrap">
        <div className="lg:container ">
          <section className="bg-white py-8 lg:py-16 ">
            <div className="max-w-6xl mx-auto px-4">
              {answers &&
                answers
                  .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
                  .map((answer) => (
                    <div key={answer.id}>
                      {
                        <article className="p-6 text-base bg-white rounded-lg ">
                          <footer className="flex  mb-2 relative">
                            <div className="flex justify-between w-full bg-gray-100 p-2 items-center">
                              <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                                <img
                                  className="mr-2 w-6 h-6 rounded-full"
                                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                  alt="Michael Gough"
                                ></img>
                                Michael Gough
                              </p>

                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                <time title="February 8th, 2022">
                                  {new Date(answer.createdAt).toLocaleString(
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
                          </footer>
                          <p className="text-gray-500 ">{answer.answer_text}</p>
                        </article>
                      }
                    </div>
                  ))}
            </div>
          </section>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Answers;
