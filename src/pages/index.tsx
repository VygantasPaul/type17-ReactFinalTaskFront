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
      setComments(response.data.questionsAnswer);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <>
      <PageTemplate>
        {comments ? (
          comments.length > 0 ? (
            <Comments comments={comments} />
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
