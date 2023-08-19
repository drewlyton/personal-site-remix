import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Subscribe } from "~/components/Subscribe";
import GetStory from "~/data/GetStory";
import type Story from "~/data/Story";
import { client } from "~/data/client";
import { bundleMDX } from "~/helpers/mdx.server";
import { metaTags } from "~/helpers/metaTags";
import routes from "~/helpers/routes";
import katexCss from "~/styles/katex.css";
import prismLine from "~/styles/prism-line-number.css";
import prismTheme from "~/styles/prism-nightowl.css";

export const loader = async ({ params, request }: LoaderArgs) => {
  const slug = params.slug as string;
  const previewKey = new URL(request.url).searchParams.get("preview");
  if (!slug) {
    throw new Response("Not Found", {
      status: 404
    });
  }

  const { story }: { story: Story } = await client.request(GetStory, {
    slug
  });

  // Handle event slugs which don't exist in our CMS
  if (!story) {
    throw new Response("Not Found", {
      status: 404
    });
  }
  if (story.preview && previewKey !== process.env.PREVIEW) {
    throw new Response("Not Found", {
      status: 404
    });
  }

  const { code } = await bundleMDX({
    source: story.mdx,
    mdxOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkMath,
        remarkGfm
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeKatex,
        rehypePrism
      ];

      return options;
    }
  });

  return json(
    { story, mdxCode: code, refLink: request.url },
    {
      headers: {
        "Cache-Control": "s-maxage:60, stale-while-revalidate"
      }
    }
  );
};

export default function Slug() {
  const { story, mdxCode, refLink } = useLoaderData<typeof loader>();
  const MDXComponent = useMemo(() => getMDXComponent(mdxCode), [mdxCode]);

  return (
    <>
      <section className="top-section max-w-prose mx-auto">
        <div className="mb-2 w-full rounded-3xl overflow-clip">
          <img
            src={story.featuredImage.url}
            alt={story.title + "image"}
            width="100%"
          />
        </div>
        <div className="tilted mb-8">
          <div className="space-y-4">
            <Link
              to={routes.stories}
              className="text-gray-500 dark:text-gray-300"
            >
              <div className="header-font uppercase">
                <span className="inline-flex items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="inline mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  All Stories
                </span>
              </div>
            </Link>
            <h2 className="uppercase">{story.title}</h2>
          </div>
        </div>

        {story.videoUrl && (
          <div v-if="story.videoUrl" className="w-full mb-8">
            <iframe
              className="w-full aspect-video"
              src={story.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}

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
        <div>
          <h5 className="header-font mb-4">Best,</h5>
          <div className="flex items-start space-x-4">
            <div>
              <img
                src={story.author.picture.url}
                alt={story.author.name}
                width="68px"
              />
            </div>
            <div className="flex flex-col mb-6">
              <h5 className="header-font uppercase leading-none mt-1">
                {story.author.name}
              </h5>
              <small className="text-gray-500 mb-2 text-sm dark:text-gray-300">
                <em>
                  {new Date(story.publishedAt).toLocaleString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </em>
              </small>
              <p className="text-gray-600 dark:text-gray-100">
                {story.author.bio}
              </p>
            </div>
          </div>
        </div>
        <Subscribe refLink={refLink} />
      </section>
    </>
  );
}

export const meta: MetaFunction = ({ location, data }) => {
  const { story } = data as { story: Story };

  return {
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
    ...metaTags({
      url: location.pathname,
      description: story.description,
      coverImage: story.featuredImage.url,
      title: story.title
    })
  };
};

export function links() {
  return [
    {
      rel: "stylesheet",
      href: katexCss,
      media: "print",
      onload: "this.media='all'"
    },
    {
      rel: "stylesheet",
      href: prismLine,
      media: "print",
      onload: "this.media='all'"
    },
    {
      rel: "stylesheet",
      href: prismTheme,
      media: "print",
      onload: "this.media='all'"
    }
  ];
}
