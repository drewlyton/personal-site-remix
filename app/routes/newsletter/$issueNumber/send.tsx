import { render } from "@react-email/render";
import { ActionArgs, Response } from "@remix-run/node";
import GetNewsletter from "~/data/GetNewsletter";
import type { Newsletter } from "~/data/Newsletter";
import { client } from "~/data/client";
import { sendgridClient } from "~/data/sendgrid";
import { EmailLayout } from "~/emails/EmailLayout";
import { NewPostNewsletter } from "~/emails/NewPostNewsletter";
import { getMessageBodyMarkdown } from "~/helpers/getMessageBodyMarkdown";

export const action = async ({ params, request }: ActionArgs) => {
  const issueNumber = params.issueNumber;
  const sendAsTest = Boolean(
    new URL(request.url).searchParams.get("test") ||
      process.env.NODE_ENV === "development"
  );
  console.log({ sendAsTest });

  if (!issueNumber) throw new Response("Not found", { status: 404 });

  const { newsletter }: { newsletter: Newsletter } = await client.request(
    GetNewsletter,
    {
      issueNumber: parseInt(issueNumber || "")
    }
  );

  const [messageAboveLink, messageBelowLink] = await getMessageBodyMarkdown(
    newsletter.messageBody
  );

  // Render HTML of latest newsletter
  // use {{email}} for the recipient field
  const html = render(
    <EmailLayout recipient="{{email}}">
      <NewPostNewsletter
        {...newsletter}
        messageBody={[messageAboveLink, messageBelowLink]}
      />
    </EmailLayout>
  );
  // Create a design with the HTML
  const [designResponse, design] = await sendgridClient.request({
    url: "/v3/designs",
    method: "POST",
    body: {
      name: `Issue #${newsletter.issueNumber}`,
      html_content: html,
      editor: "code",
      subject: newsletter.subject
    }
  });

  if (designResponse.statusCode >= 300)
    throw new Response(
      "Something went wrong creating the design for that newsletter.",
      { status: 500 }
    );

  // Send out a single_send with that design id to the list segment
  const [sendResponse] = await sendgridClient.request({
    url: "/v3/marketing/singlesends",
    method: "POST",
    body: {
      name: `Issue #${newsletter.issueNumber}`,
      // Send 5 minutes from now in case need to cancel it
      send_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      send_to: {
        segment_ids: !sendAsTest
          ? [process.env.SENDGRID_CONFIRMED_SEGMENT]
          : [],
        list_ids: sendAsTest ? [process.env.SENDGRID_TEST_LIST] : []
      },
      email_config: {
        design_id: design.id,
        sender_id: 5210253,
        custom_unsubscribe_url: "https://drewis.cool/newsletter/unsubscribe"
      }
    }
  });

  return sendResponse;
};
