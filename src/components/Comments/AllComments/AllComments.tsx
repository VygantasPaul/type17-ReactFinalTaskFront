import React from "react";
import Comment from "@/components/Comments/Question/Question";
type CommentsType = {
  comments: any[] | null;
};
const AllComments: React.FC<CommentsType> = ({ comments }) => {
  return (
    <div className="comments_wrap">
      {comments
        .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
        .map((question) => (
          <div key={question.id}>
            <Comment comment={question} />
          </div>
        ))}
    </div>
  );
};

export default AllComments;
