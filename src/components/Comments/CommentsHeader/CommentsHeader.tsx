import React from "react";
type CoomentType = {
  text: string;
  commentCount: any[] | null;
};
const CommentsHeader: React.FC<CoomentType> = ({ text, commentCount }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
        {text}
        {commentCount && ":"} {commentCount && commentCount.length}
      </h2>
    </div>
  );
};

export default CommentsHeader;
