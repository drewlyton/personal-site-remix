import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import GetNewsletter from "~/data/GetNewsletter";
import { Newsletter } from "~/data/Newsletter";
import { client } from "~/data/client";
import { EmailLayout } from "~/emails/EmailLayout";
import { NewPostNewsletter } from "~/emails/NewPostNewsletter";
import { getMessageBodyMarkdown } from "~/helpers/getMessageBodyMarkdown";

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

  const [messageAboveLink, messageBelowLink] = await getMessageBodyMarkdown(
    newsletter.messageBody
  );

  return json({ messageAboveLink, messageBelowLink, newsletter });
}

export default function ViewNewsletter() {
  const { newsletter, messageAboveLink, messageBelowLink } =
    useLoaderData<typeof loader>();
  return (
    <section className="top-section min-h-screen">
      <EmailLayout recipient="">
        <NewPostNewsletter
          {...newsletter}
          messageBody={[messageAboveLink, messageBelowLink]}
        />
      </EmailLayout>
      ,
    </section>
  );
}
