/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import AnswersComponent from "@/components/Answers/Answers";
import CommentsHeader from "@/components/Comments/CommentsHeader/CommentsHeader";
import Spinner from "@/components/Spinner/Spinner";
import axios from "axios";
const Answers = () => {
  const [answers, setAnswers] = useState<Array<any> | null>(null);
  const fetchAnswers = async () => {
    try {
      const response = await axios.get("http://localhost:3010/answers");
      setAnswers(response.data.answers);
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
              {answers ? (
                answers.length > 0 ? (
                  <>
                    <CommentsHeader text="Answers" commentCount={answers} />
                    {answers
                      .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
                      .map((answer) => (
                        <AnswersComponent answer={answer} key={answer.id} />
                      ))}
                  </>
                ) : (
                  <p>No answers.</p>
                )
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

export default Answers;
