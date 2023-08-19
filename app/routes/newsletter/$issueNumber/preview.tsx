import { render } from "@react-email/render";
import { type LoaderArgs } from "@remix-run/node";
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

  const html = render(
    <EmailLayout recipient="">
      <NewPostNewsletter
        {...newsletter}
        messageBody={[messageAboveLink, messageBelowLink]}
      />
    </EmailLayout>,
    { pretty: true }
  );
  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
