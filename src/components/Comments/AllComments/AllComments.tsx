import React from "react";
import Comment from "@/components/Comments/Question/Question";
type CommentsType = {
  comments: any;
};
const AllComments: React.FC<CommentsType> = ({ comments }) => {
  return (
    <div className="comments_wrap">
      {comments.map((comment: any) => (
        <div key={comment.id}>
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  );
};

export default AllComments;
