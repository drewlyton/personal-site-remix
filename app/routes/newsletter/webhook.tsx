import { render } from "@react-email/render";
import { ActionArgs, json } from "@remix-run/node";
import { Newsletter } from "~/data/Newsletter";
import UpdateSendGridId from "~/data/UpdateSendGridId";
import { client } from "~/data/client";
import { sendgridClient } from "~/data/sendgrid";
import { EmailLayout } from "~/emails/EmailLayout";
import { NewPostNewsletter } from "~/emails/NewPostNewsletter";
import { getMessageBodyMarkdown } from "~/helpers/getMessageBodyMarkdown";

type GraphCMSWebhookBody = {
  data?: Newsletter;
};

export async function action(args: ActionArgs) {
  // Get Newsletter body
  const { data: newsletter } =
    (await args.request.json()) as GraphCMSWebhookBody;

  //   Throw if doesn't exist
  if (!newsletter) return new Response("No request body", { status: 401 });
  const designHTML = generateHTMLEmail(newsletter);
  // Throw if newsletter is in preview mode
  if (newsletter.preview)
    return new Response(
      "Can't send a nesletter that's still in preview mode.",
      {
        status: 200
      }
    );
  // Send as test email if there is no sendAt date specified
  const sendAsTest = !newsletter.sendAt;

  if (!newsletter.sendGridDesignId) {
    // Send request to sendgrid
    const [designResponse, design] = await sendgridClient.request({
      url: "/v3/designs",
      method: "POST",
      body: {
        name: `Issue #${newsletter.issueNumber}`,
        html_content: designHTML,
        editor: "code",
        subject: newsletter.subject
      }
    });

    if (designResponse.statusCode >= 300)
      return new Response("Couldn't create design in sendgrid.", {
        status: 501
      });

    // Update the Newsletter with the design ID
    client.request(UpdateSendGridId, { sendGridDesignId: design.id });
    newsletter.sendGridDesignId = design.id;
  }

  if (!newsletter.sendGridId) {
    // Create single send in sendgrid
    const [sendResponse, singleSend] = await sendgridClient.request({
      url: "/v3/marketing/singlesends",
      method: "POST",
      body: {
        name: `Issue #${newsletter.issueNumber}`,
        // Send 5 minutes from now in case need to cancel it
        send_at: newsletter.sendAt,
        send_to: {
          segment_ids: !sendAsTest
            ? [process.env.SENDGRID_CONFIRMED_SEGMENT]
            : [],
          list_ids: sendAsTest ? [process.env.SENDGRID_TEST_LIST] : []
        },
        email_config: {
          design_id: newsletter.sendGridDesignId,
          sender_id: 5210253,
          custom_unsubscribe_url: "https://drewis.cool/newsletter/unsubscribe"
        }
      }
    });

    if (sendResponse.statusCode >= 300)
      return new Response("Couldn't create single send in sendgrid.", {
        status: 501
      });
    client.request(UpdateSendGridId, { sendGridId: singleSend.id });
  } else {
    const [sendResponse, singleSend] = await sendgridClient.request({
      url: `/v3/marketing/singlesends/${newsletter.sendGridId}`,
      method: "PATCH",
      body: {
        name: `Issue #${newsletter.issueNumber}`,
        // Send 5 minutes from now in case need to cancel it
        send_at: newsletter.sendAt,
        send_to: {
          segment_ids: !sendAsTest
            ? [process.env.SENDGRID_CONFIRMED_SEGMENT]
            : [],
          list_ids: sendAsTest ? [process.env.SENDGRID_TEST_LIST] : []
        },
        email_config: {
          design_id: newsletter.sendGridDesignId,
          sender_id: 5210253,
          custom_unsubscribe_url: "https://drewis.cool/newsletter/unsubscribe"
        }
      }
    });

    if (sendResponse.statusCode >= 300)
      return new Response("Couldn't update single send in sendgrid.", {
        status: 501
      });
  }

  return json({ ok: true });
}

export async function generateHTMLEmail(newsletter: Newsletter) {
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

  return html;
}
