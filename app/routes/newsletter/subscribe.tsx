import { render } from "@react-email/render";
import { json, type ActionFunction } from "@remix-run/node";
import { sendgridClient, sendgridMailer } from "~/data/sendgrid";
import { ConfirmSubscription } from "~/emails/ConfirmSubscription";
import { EmailLayout } from "~/emails/EmailLayout";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // If honeypot field is filled out, return early
  const honeypot = formData.get("last_name");
  if (honeypot)
    return new Response(
      JSON.stringify({
        message:
          "🤔 Hmmm...seems like you might be a robot. If you're not, please refresh the page and try again."
      }),
      { status: 200 }
    );
  const email = formData.get("email")?.toString();
  const ref = formData.get("ref")?.toString() || "";
  if (!email)
    return json({ error: "Please provide a valid email." }, { status: 400 });
  let subscribed = false;
  let error: null | string = null;

  // Subscribe email to list
  try {
    await sendgridClient.request({
      url: `/v3/marketing/contacts`,
      method: "PUT",
      body: {
        list_ids: [process.env.SENDGRID_NEWSLETTER_LIST],
        contacts: [
          {
            email: email,
            custom_fields: {
              // referrer custom_field ID
              e2_T: ref,
              // status custom_field ID - set at 0 for Unconfirmed
              e3_N: 0
            }
          }
        ]
      }
    });
    subscribed = true;
    try {
      await sendgridMailer.send({
        personalizations: [
          {
            to: email,
            subject: "👋 Confirm your subscription to my newsletter"
          }
        ],
        from: { email: "contact@drewis.cool" },
        content: [
          {
            type: "text/html",
            value: render(
              <EmailLayout recipient={email}>
                <ConfirmSubscription recipient={email} />
              </EmailLayout>
            )
          }
        ]
      });
    } catch (e) {
      error =
        "Hmmm...There was a problem sending you a confirmation email. Please try again later.";
    }
  } catch (e) {
    error =
      "Hmmm...There was a problem susbcribing your email. Please try again later";
  }

  return json({ error, subscribed });
};
