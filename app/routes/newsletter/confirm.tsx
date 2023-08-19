import { LoaderArgs, Response, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { sendgridClient } from "~/data/sendgrid";

export const loader = async ({ params, request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const email = searchParams.get("email");
  if (!email) throw new Response("No email provided", { status: 404 });

  const [response] = await sendgridClient.request({
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: {
      list_ids: [process.env.SENDGRID_NEWSLETTER_LIST],
      contacts: [
        {
          email,
          custom_fields: {
            // status custom_field ID - set at 1 for Subscribed
            e3_N: 1
          }
        }
      ]
    }
  });

  if (response.statusCode >= 300) {
    return json({ ok: false });
  }

  return json({ ok: true });
};

export default function Unsubscribe() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <section className="top-section container mx-auto">
      <div>
        <h1 className="text-3xl uppercase mb-3">Hey friend 👋,</h1>
        <p>
          {loaderData.ok
            ? "Your subscription is confirmed! Thanks again for subscribing to my newsletter!"
            : "Sorry! There was a problem confirming your subscription. This probably means my email service is down 😅. Please try again later."}
        </p>
        <p className="header-font text-xl mb-0">Best,</p>
        <p className="header-font text-2xl">Drew</p>
      </div>
    </section>
  );
}
