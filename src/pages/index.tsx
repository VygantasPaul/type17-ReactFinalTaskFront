import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Comments from "@/components/Comments/Comments";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner/Spinner";
export default function Home({}) {
  const [comments, setComments] = useState<Array<any> | null>(null);
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.DEFAULT_PATH}/questions/`
      );
      setComments(response.data.questions);
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
        {comments ? <Comments comments={comments} /> : <Spinner />}
      </PageTemplate>
    </>
  );
}
