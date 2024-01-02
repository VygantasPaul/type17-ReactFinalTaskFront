import React, { useState, useEffect } from "react";
import Comment from "@/components/Comments/Question/Question";
import axios from "axios";
type AnsweredCommentsType = {
  comments: any[] | null;
};
const AnsweredComments: React.FC<AnsweredCommentsType> = () => {
  const [answeredData, setAnswereDData] = useState<Array<any> | null>(null);
  const fetchAnswered = async () => {
    try {
      const response = await axios.get(
        `${process.env.DEFAULT_PATH}/questions/withAnswers`
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
                <Comment comment={comment} />
              </div>
            ))}
      </>
    </div>
  );
};

export default AnsweredComments;
