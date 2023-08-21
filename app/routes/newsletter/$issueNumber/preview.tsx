import { type LoaderArgs } from "@remix-run/node";
import { client } from "~/data/client";
import GetNewsletter from "~/data/GetNewsletter";
import type { Newsletter } from "~/data/Newsletter";
import { generateHTMLEmail } from "../webhook";

export async function loader({ params, request }: LoaderArgs) {
  const issueNumber = params.issueNumber;

  if (!issueNumber) throw new Response("Not found", { status: 404 });

  const { newsletter }: { newsletter: Newsletter } = await client.request(
    GetNewsletter,
    {
      issueNumber: parseInt(issueNumber || "")
    }
  );
  if (!newsletter) throw new Response("Not found", { status: 404 });
  const html = await generateHTMLEmail(newsletter);

  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}
