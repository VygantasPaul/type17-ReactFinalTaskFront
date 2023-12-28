import React, { useState, useEffect } from "react";
import Comment from "@/components/Comments/Question/Question";
import axios from "axios";
const UnansweredComments = () => {
  const [unansweredData, setUnAnswereDData] = useState<Array<any> | null>(null);
  const fetchUnAnswered = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3010/questions/noAnswers"
      );
      setUnAnswereDData(response.data.questionNoAnswers);
      console.log(response.data.questionNoAnswers);
    } catch (err) {
      if (err.response.status === 404) {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    fetchUnAnswered();
  }, []);
  return (
    <>
      {unansweredData &&
        unansweredData
          .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
          .map((comment) => (
            <div className="comments_wrap" key={comment.id}>
              <Comment comment={comment} />
            </div>
          ))}
    </>
  );
};

export default UnansweredComments;
