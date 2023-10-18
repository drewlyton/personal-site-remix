import { render } from "@react-email/render";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { bundleMDX } from "mdx-bundler";
import { useEffect } from "react";
import remarkGfm from "remark-gfm";
import GetNewsletter from "~/data/GetNewsletter";
import { Newsletter } from "~/data/Newsletter";
import { client } from "~/data/client";
import { EmailLayout } from "~/emails/EmailLayout";
import { NewPostNewsletter } from "~/emails/NewPostNewsletter";
import { useTheme } from "~/helpers/useTheme";

export async function loader({ params }: LoaderArgs) {
  const issueNumber = params.issueNumber;

  if (!issueNumber) throw new Response("Not found", { status: 404 });

  const { newsletter }: { newsletter: Newsletter } = await client.request(
    GetNewsletter,
    {
      issueNumber: parseInt(issueNumber || ""),
      preview: false
    }
  );
  if (newsletter.preview) throw new Response("Not found", { status: 404 });

  const { code: messageBody } = await bundleMDX({
    source: newsletter.body,
    mdxOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];

      return options;
    }
  });

  return json({ messageBody, newsletter });
}

export default function ViewNewsletter() {
  const { newsletter, messageBody } = useLoaderData<typeof loader>();

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Only allow this page to be light mode
    if (theme === "midnight") toggleTheme();
  }, [theme]);
  return (
    <section
      className="top-section min-h-screen"
      dangerouslySetInnerHTML={{
        __html: render(
          <EmailLayout recipient="">
            <NewPostNewsletter {...newsletter} body={messageBody} />
          </EmailLayout>
        )
      }}
    ></section>
  );
}
