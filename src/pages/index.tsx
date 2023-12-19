import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Comments from "@/components/Comments/Comments";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner/Spinner";
export default function Home({}) {
  const [comments, setComments] = useState<Array<any> | null>(null);

  const PATH = "http://localhost:3010/questions/";

  const fetchComments = async () => {
    try {
      const response = await axios.get(PATH);
      console.log(response.data.questionsAnswer);
      setComments(response.data.questionsAnswer);
    } catch (err) {
      // @ts-ignore
      if (err.response.status === 401) {
      }
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <>
      <PageTemplate>
        {comments ? ( // Check if comments is not null or undefined
          comments.length > 0 ? ( // Check if comments array has elements
            <Comments comments={comments} /> // Render the Comments component with comments data
          ) : (
            <>
              <>No comments</>
            </>
          )
        ) : (
          <Spinner />
        )}
      </PageTemplate>
      ;
    </>
  );
}
