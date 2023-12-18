import Image from "next/image";

import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Comments from "@/components/Comments/Comments";

export default function Home() {
  return (
    <>
      <PageTemplate>
        <div>
          <Comments />
        </div>
      </PageTemplate>
      ;
    </>
  );
}
