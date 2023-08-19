import { json, type LoaderArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import GetNewsletter from "~/data/GetNewsletter";
import type { Newsletter } from "~/data/Newsletter";
import { client } from "~/data/client";
import { EmailLayout } from "~/emails/EmailLayout";
import { NewPostNewsletter } from "~/emails/NewPostNewsletter";
import { getMessageBodyMarkdown } from "~/helpers/getMessageBodyMarkdown";

export async function loader({ params, request }: LoaderArgs) {
  const issueNumber = params.issueNumber;

  if (!issueNumber) {
    throw new Response("Not found", { status: 404 });
  }
  const { newsletter }: { newsletter: Newsletter } = await client.request(
    GetNewsletter,
    {
      issueNumber: parseInt(issueNumber || "")
    }
  );
  const [messageAboveLink, messageBelowLink] = await getMessageBodyMarkdown(
    newsletter.messageBody
  );

  return json({ messageAboveLink, messageBelowLink, newsletter });
}

export default function PreviewNewsletter() {
  const { newsletter, messageAboveLink, messageBelowLink } =
    useLoaderData<typeof loader>();
  const { Form, submission, data } = useFetcher();

  const formState = submission
    ? "submitting"
    : data?.subscribed
    ? "success"
    : data?.error
    ? "error"
    : "idle";
  return (
    <section className="top-section container">
      <div className="flex justify-end">
        <Form
          action={`/newsletter/${newsletter.issueNumber}/send`}
          method="post"
          className={formState === "success" ? "hidden" : ""}
        >
          <button type="submit">
            {formState === "submitting"
              ? "Sending..."
              : formState === "success"
              ? "Sent"
              : "Send"}
          </button>
        </Form>
      </div>
      <div>
        <EmailLayout recipient="">
          <NewPostNewsletter
            {...newsletter}
            messageBody={[messageAboveLink, messageBelowLink]}
          />
        </EmailLayout>
      </div>
    </section>
  );
}
