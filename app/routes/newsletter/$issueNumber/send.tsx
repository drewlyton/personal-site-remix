import { render } from "@react-email/render";
import { ActionArgs, Response, json } from "@remix-run/node";
import GetNewsletter from "~/data/GetNewsletter";
import { Newsletter } from "~/data/Newsletter";
import { client } from "~/data/client";
import { MessageContent } from "~/emails/MessageContent";
import { getMessageBodyMarkdown } from "~/helpers/getMessageBodyMarkdown";

export const action = async ({ params, request }: ActionArgs) => {
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
    />
  ).replace(/<!DOCTYPE((.|\n|\r)*?)(\"|])>/, "");
  //   return json({ html });
  const convertKitBroadcast = await fetch(
    `https://api.convertkit.com/v3/broadcasts`,
    {
      method: "POST",
      body: JSON.stringify({
        api_secret: process.env.CONVERTKIT_API_SECRET,
        subject: newsletter.subject,
        content: html,
        email_layout_template: "new_post_notification"
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }
  );
  return convertKitBroadcast;
};
