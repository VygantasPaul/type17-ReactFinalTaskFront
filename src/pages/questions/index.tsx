/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import axios from "axios";
import QuestionsComponent from "@/components/Questions/Questions";
import CommentsHeader from "@/components/Comments/CommentsHeader/CommentsHeader";
import Spinner from "@/components/Spinner/Spinner";
const Questions = () => {
  const [questions, setQuestions] = useState<Array<any> | null>(null);
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3010/questions/all");
      setQuestions(response.data.questions);
      console.log(response.data);
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
              {questions && (
                <CommentsHeader text="Questions" commentCount={questions} />
              )}
              {questions ? (
                questions
                  .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
                  .map((question) => (
                    <div key={question.id}>
                      <QuestionsComponent question={question} />
                    </div>
                  ))
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
