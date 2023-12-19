import React, { useState, useEffect } from "react";
import Comment from "@/components/Comments/Comment/Comment";
import axios from "axios";
const AnsweredComments = ({ comments }) => {
  const [unansweredData, setUnAnswereDData] = useState(false);
  const fetchUnAnswered = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3010/questions/noAnswers"
      );
      setUnAnswereDData(response.data.questionNoAnswers);
      console.log(response.data.questionNoAnswers);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUnAnswered();
  }, []);
  return (
    <div>
      <>
        {unansweredData &&
          unansweredData
            .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
            .map((comment) => (
              <div className="comments_wrap" key={comment.id}>
                <Comment key={comment.id} comment={comment} />
              </div>
            ))}
      </>
    </div>
  );
};

export default AnsweredComments;
