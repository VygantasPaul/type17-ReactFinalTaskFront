import React, { useState, useEffect } from "react";
import Comment from "@/components/Comments/Question/Question";
import Answer from "@/components/Comments/Answer/Answer";
import axios from "axios";
const AnsweredComments = ({ comments }) => {
  const [answeredData, setAnswereDData] = useState(false);
  const fetchAnswered = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3010/questions/withAnswers"
      );
      setAnswereDData(response.data.questionWithAnswers);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchAnswered();
  }, []);
  return (
    <div>
      <>
        {answeredData &&
          answeredData
            .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
            .map((comment) => (
              <div className="comments_wrap" key={comment.id}>
                <Comment key={comment.id} comment={comment} />
                {/* {comment.answers_data &&
                  comment.answers_data.map((answer: any) => (
                    <Answer answer={answer} key={answer.id} />
                  ))} */}
              </div>
            ))}
      </>
    </div>
  );
};

export default AnsweredComments;
