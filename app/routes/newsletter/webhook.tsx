import { render } from "@react-email/render";
import { ActionArgs, json } from "@remix-run/node";
import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import type { Newsletter } from "~/data/Newsletter";
import { sanityClient } from "~/data/sanity";
import { sendgridClient } from "~/data/sendgrid";
import { EmailLayout } from "~/emails/EmailLayout";
import { NewPostNewsletter } from "~/emails/NewPostNewsletter";

export async function action(args: ActionArgs) {
  // Get Newsletter body
  const newsletter = (await args.request.json()) as Newsletter;
  console.log({ newsletter });

  //   Throw if doesn't exist
  if (!newsletter) return new Response("No request body", { status: 200 });
  const designHTML = await generateHTMLEmail(newsletter);
  // Throw if newsletter is in preview mode
  if (!newsletter.shouldSend)
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
        name: `Issue #${newsletter._id}`,
        html_content: designHTML,
        editor: "code",
        subject: newsletter.subject
      }
    });

    if (designResponse.statusCode >= 300)
      return new Response("Couldn't create design in sendgrid.", {
        status: 200
      });

    // Update the Newsletter with the design ID
    await sanityClient.mutate([
      {
        patch: {
          id: newsletter._id,
          set: {
            sendGridDesignId: design.id
          }
        }
      }
    ]);
    newsletter.sendGridDesignId = design.id;
  }

  if (!newsletter.sendGridId) {
    // Create single send in sendgrid
    const [sendResponse, singleSend] = await sendgridClient.request({
      url: "/v3/marketing/singlesends",
      method: "POST",
      body: {
        name: `Issue #${newsletter._id}`,
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
        status: 200
      });
    await sanityClient.mutate([
      {
        patch: {
          id: newsletter._id,
          set: {
            sendGridId: singleSend.id
          }
        }
      }
    ]);
  } else {
    const [sendResponse, singleSend] = await sendgridClient.request({
      url: `/v3/marketing/singlesends/${newsletter.sendGridId}`,
      method: "PATCH",
      body: {
        name: `Issue #${newsletter._id}`,
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
        status: 200
      });
  }

  return json({ ok: true });
}

export async function generateHTMLEmail(newsletter: Newsletter) {
  const { code: messageBody } = await bundleMDX({
    source: newsletter.body,
    mdxOptions(options, frontmatter) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      return options;
    }
  });

  // Render HTML of latest newsletter
  // use {{email}} for the recipient field
  const html = render(
    <EmailLayout recipient="{{email}}">
      <NewPostNewsletter {...newsletter} body={messageBody} />
    </EmailLayout>
  );

  return html;
}
