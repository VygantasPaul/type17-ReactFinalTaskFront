import React from "react";
type CoomentType = {
  comments: string;
};
const CommentsHeader: React.FC<CoomentType> = ({ comments }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
        Questions: ({comments.length})
      </h2>
    </div>
  );
};

export default CommentsHeader;
