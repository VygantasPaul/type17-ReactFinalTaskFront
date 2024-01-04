import React from "react";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import Button from "@/components/Button/Button";
import Alerts from "@/components/Alerts/Alerts";
type AlertType = {
  message: string;
  type: "success" | "error";
};
type AddQuestionType = {
  titleField: string | null;
  setTitleField: (titleField: string) => void;
  questionField: string | null;
  setQuestionField: (questionField: string) => void;
  tagsField: string;
  setTagsField: (tagsField: string) => void;
  isLoading: boolean;
  onAddComment: () => void;
  alertState: AlertType | null;
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
  alertState,
}) => {
  const convertAlert = (alertString: string | null): AlertType[] => {
    if (alertString) {
      return [{ message: alertString, type: "error" }];
    }
    return [];
  };

  convertAlert(alertState?.message || null);

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
        labelClassName={`block text-sm font-medium leading-6 text-gray-900 mb-2`}
        value={String(questionField)}
        setValue={setQuestionField}
        placeholder={`Type question`}
        className={`w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none`}
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
      {alertState && (
        <Alerts message={alertState.message} type={alertState.type} />
      )}
    </form>
  );
};

export default Form;
