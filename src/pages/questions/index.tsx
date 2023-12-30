/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import axios from "axios";
import QuestionComponent from "@/components/Question/Question";
import CommentsHeader from "@/components/Comments/CommentsHeader/CommentsHeader";
import Spinner from "@/components/Spinner/Spinner";
const Questions = () => {
  const [questions, setQuestions] = useState<Array<any> | null>(null);
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `${process.env.DEFAULT_PATH}/questions/`
      );
      setQuestions(response.data.questions);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  return (
    <PageTemplate>
      <div className="comments_wrap">
        <div className="lg:container ">
          <section className="bg-white py-8 lg:py-16 ">
            <div className="max-w-6xl mx-auto px-4">
              {questions ? (
                <>
                  {questions.length > 0 ? (
                    <>
                      <CommentsHeader
                        text="Questions"
                        commentCount={questions}
                      />
                      {questions
                        .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
                        .map((question) => (
                          <QuestionComponent
                            question={question}
                            key={question.id}
                          />
                        ))}
                    </>
                  ) : (
                    <p>No questions.</p>
                  )}
                </>
              ) : (
                <Spinner />
              )}
            </div>
          </section>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Questions;
