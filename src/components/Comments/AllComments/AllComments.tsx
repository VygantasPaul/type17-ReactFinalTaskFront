import React, { useState, useEffect } from "react";
import Comment from "@/components/Comments/Comment/Comment";
import Answer from "@/components/Answer/Answer";
const AllComments = ({ comments }) => {
  return (
    <div className="comments_wrap">
      {comments
        .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
        .map((question) => (
          <div key={question.id}>
            <Comment comment={question} />
            {question.answers_data &&
              question.answers_data.map((answer: any) => (
                <Answer answer={answer} key={answer.id} />
              ))}
          </div>
        ))}
    </div>
  );
};

export default AllComments;
