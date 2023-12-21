import React from "react";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import Button from "@/components/Button/Button";
import Alerts from "@/components/Alerts/Alerts";
type AddQuestionType = {
  titleField: string | null;
  setTitleField: React.Dispatch<React.SetStateAction<string>>;
  questionField: string | null;
  setQuestionField: React.Dispatch<React.SetStateAction<string>>;
  tagsField: string;
  setTagsField: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  onAddComment: () => void;
  alert: string;
};
const Form: React.FC<AddQuestionType> = ({
  titleField,
  setTitleField,
  questionField,
  setQuestionField,
  tagsField,
  setTagsField,
  isLoading,
  onAddComment,
  alert,
}) => {
  return (
    <form className="mb-6">
      <Input
        label="Title"
        labelClassName={`block text-sm font-medium leading-6 text-gray-900`}
        value={String(titleField)}
        setValue={setTitleField}
        className={`block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        placeholder="Please fill title"
        name="title"
        type="text"
        id="title"
      />
      <Textarea
        label="Question"
        labelClassName={`block text-sm font-medium leading-6 text-gray-900`}
        value={String(questionField)}
        setValue={setQuestionField}
        placeholder={`Type question`}
        id="question"
      />
      <Input
        label="Tags"
        labelClassName={`block text-sm font-medium leading-6 text-gray-900`}
        value={String(tagsField)}
        setValue={setTagsField}
        className={`block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        placeholder="Please fill tags seperating with commas"
        name="tags"
        type="text"
        id="tags"
      />
      <Button
        className="py-2.5 px-4 text-xs font-medium text-center text-white bg-red-500 hover:bg-red-900 rounded-lg focus:ring-4 focus:ring-primary-200"
        isLoading={isLoading}
        text="Post comment"
        onClick={onAddComment}
      />
      <Alerts alert={alert} />
    </form>
  );
};

export default Form;
