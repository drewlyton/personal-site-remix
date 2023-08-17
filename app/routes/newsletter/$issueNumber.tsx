import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";

export function loader(args: LoaderArgs) {
  console.log(args);
  return json({ issueNumber: args.params.issueNumber });
}

export default function PreviewNewsletter() {
  const loaderData = useLoaderData<typeof loader>();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (iframeRef.current) {
      console.log(iframeRef.current.contentWindow?.document.body.scrollHeight);
      iframeRef.current.style.height =
        iframeRef.current.contentWindow?.document.body.scrollHeight! +
        350 +
        "px";
    }
  }, []);
  return (
    <section className="top-section min-h-screen">
      <iframe
        ref={iframeRef}
        src={`/newsletter/render?issueNumber=${loaderData.issueNumber}`}
        title="Newsletter preview"
        width={"100%"}
        className="h-full min-h-screen"
      ></iframe>
    </section>
  );
}