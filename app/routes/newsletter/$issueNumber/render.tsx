import { render } from "@react-email/render";
import { type LoaderArgs } from "@remix-run/node";
import GetNewsletter from "~/data/GetNewsletter";
import type { Newsletter } from "~/data/Newsletter";
import { client } from "~/data/client";
import { ConvertKitTemplate } from "~/emails/ConvertKitTemplate";
import { MessageContent } from "~/emails/MessageContent";
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
    <MessageContent
      {...newsletter}
      messageBody={[messageAboveLink, messageBelowLink]}
    />,
    { pretty: true }
  );
  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
