import React, { useState, useEffect } from "react";
import Comment from "@/components/Comments/Question/Question";
import axios from "axios";
type AnsweredCommentsType = {
  comments: any[] | null;
};
const UnansweredComments: React.FC<AnsweredCommentsType> = () => {
  const [unansweredData, setUnAnswereDData] = useState<Array<any> | null>(null);
  const fetchUnAnswered = async () => {
    try {
      const response = await axios.get(
        `${process.env.DEFAULT_PATH}/questions/noAnswers`
      );
      setUnAnswereDData(response.data.questionNoAnswers);
    } catch (err) {
      // @ts-ignore
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
