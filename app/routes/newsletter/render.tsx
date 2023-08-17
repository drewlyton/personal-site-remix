import { render } from "@react-email/render";
import type { LoaderArgs } from "@remix-run/node";
import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import GetNewsletter from "~/data/GetNewsletter";
import { Newsletter } from "~/data/Newsletter";
import { client } from "~/data/client";
import { NewsletterEmail } from "~/emails/NewsletterEmail";

export async function loader({ params, request }: LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const { newsletter }: { newsletter: Newsletter } = await client.request(
    GetNewsletter,
    {
      issueNumber: parseInt(searchParams.get("issueNumber") || "")
    }
  );
  const { code: messageAboveLink } = await bundleMDX({
    source: newsletter.messageBody[0],
    mdxOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];

      return options;
    }
  });

  const { code: messageBelowLink } = await bundleMDX({
    source: newsletter.messageBody[1],
    mdxOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];

      return options;
    }
  });

  const html = render(
    <NewsletterEmail
      {...newsletter}
      messageBody={[messageAboveLink, messageBelowLink]}
    />,
    { pretty: true }
  );
  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
