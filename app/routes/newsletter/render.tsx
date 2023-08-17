import { render } from "@react-email/render";
import type { LoaderArgs } from "@remix-run/node";
import { NewsletterEmail } from "~/emails/NewsletterEmail";

export function loader(args: LoaderArgs) {
  const html = render(<NewsletterEmail />, { pretty: true });
  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
