import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { getNoteById, sanity } from "~/data/sanityClient.server";
import { Note } from "~/data/types";
import { bundleMDX } from "~/helpers/mdx.server";
import { metaTags } from "~/helpers/metaTags";
import katexCss from "~/styles/katex.css";
import prismLine from "~/styles/prism-line-number.css";
import prismTheme from "~/styles/prism-nightowl.css";

export async function loader({ params, request }: LoaderArgs) {
  const id = params.id as string;
  if (!id) {
    throw new Response("Not Found", {
      status: 404
    });
  }
  const note = (await sanity.fetch(getNoteById(id))) as Note;

  // Handle event slugs which don't exist in our CMS
  if (!note) {
    throw new Response("Not Found", {
      status: 404
    });
  }

  const { code } = await bundleMDX(note.body);

  return json(
    { note, mdxCode: code },
    {
      headers: {
        "Cache-Control": "public, s-maxage:60, stale-while-revalidate"
      }
    }
  );
}

export default function NoteId() {
  const { note, mdxCode } = useLoaderData<typeof loader>();
  const MDXComponent = useMemo(() => getMDXComponent(mdxCode), [mdxCode]);

  return (
    <>
      {/* ADD CALLOUT FOR "YOU'RE READING DRAFT CONTENT" */}
      <section className="top-section max-w-prose mx-auto">
        <div className="tilted mb-8">
          <div className="space-y-4">
            <h2 className="uppercase">{note.title}</h2>
          </div>
        </div>

        <article
          className="
        mb-6
        story-content
        prose
        prose-h2:text-4xl
        prose-h3:text-3xl
        prose-h4:text-2xl
        prose-headings:uppercase
        md:prose-lg
        lg:prose-xl
        dark:prose-invert
      "
        >
          <MDXComponent />
        </article>
      </section>
    </>
  );
}

export const meta: MetaFunction = ({ location, data }) => {
  const { note } = data as { note: Note };

  return {
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
    ...metaTags({
      url: location.pathname,
      title: note.title
    })
  };
};

export function links() {
  return [
    {
      rel: "stylesheet",
      href: katexCss
    },
    {
      rel: "stylesheet",
      href: prismLine
    },
    {
      rel: "stylesheet",
      href: prismTheme
    }
  ];
}
