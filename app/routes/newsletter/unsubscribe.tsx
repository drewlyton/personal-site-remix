import { LoaderArgs, Response, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Subscribe } from "~/components/Subscribe";
import { sendgridClient } from "~/data/sendgrid";

export const loader = async ({ params, request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const recipient = searchParams.get("recipient");
  if (!recipient) throw new Response("No email provided", { status: 404 });

  try {
    await sendgridClient.request({
      url: `/v3/marketing/contacts`,
      method: "PUT",
      body: {
        list_ids: [process.env.SENDGRID_NEWSLETTER_LIST],
        contacts: [
          {
            email: recipient,
            custom_fields: {
              // status custom_field ID - set at 2 for Unsubscribed
              e3_N: 2
            }
          }
        ]
      }
    });
    return json({ ok: true });
  } catch (e) {
    console.error(e);
    return json({ ok: false });
  }
};

export default function Unsubscribe() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <section className="top-section container mx-auto">
      <div>
        <h1 className="text-3xl uppercase mb-3">Hey friend 👋,</h1>
        <p>
          {loaderData.ok
            ? "You've successfully unsubscribed to my newsletter. I'm sorry to see you go, but I hope you have a great day!"
            : "Sorry! There was a problem unsubscribing you. This probably means you're either already unsubscribed or my email service is down 😅. Please try again later."}
        </p>
        <p className="header-font text-xl mb-0">Best,</p>
        <p className="header-font text-2xl">Drew</p>
        {loaderData.ok && (
          <>
            <hr className="my-8" />
            <h5 className="mb-6">P.S. If you'd like to reconsider 😉...</h5>
            <Subscribe noPreamble />
          </>
        )}
      </div>
    </section>
  );
}
