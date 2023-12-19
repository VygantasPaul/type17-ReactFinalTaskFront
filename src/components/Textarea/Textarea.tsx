import React from "react";

const Textarea = ({ value, setValue }) => {
  return (
    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200  ">
      <label htmlFor="comment" className="sr-only">
        Your comment
      </label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="comment"
        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  "
        placeholder="Write a comment..."
      ></textarea>
    </div>
  );
};

export default Textarea;
