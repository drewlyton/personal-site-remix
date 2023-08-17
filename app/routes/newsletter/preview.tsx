import { useEffect, useRef } from "react";
import { NewsletterEmail } from "~/emails/NewsletterEmail";

export default function PreviewNewsletter() {
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
      {/* <NewsletterEmail /> */}
      <iframe
        ref={iframeRef}
        src="/newsletter/render"
        title="Newsletter preview"
        width={"100%"}
        className="h-full min-h-screen"
      ></iframe>
    </section>
  );
}
