import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import remarkMath from "remark-math";
import { client } from "~/data/client";
import GetStory from "~/data/GetStory";
import type IStory from "~/data/Story";
import routes from "~/helpers/routes";

interface LoaderData {
  story: IStory;
}

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug as string;
  if (!slug) {
    throw new Response("Not Found", {
      status: 404
    });
  }

  const { story }: { story: IStory } = await client.request(GetStory, {
    slug
  });

  // Handle event slugs which don't exist in our CMS
  if (!story) {
    return {
      notFound: true
    };
  }

  const mdxContent = await serialize(story.mdx, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, rehypePrism]
    }
  });
  return json(
    { story: { ...story, mdxContent } },
    {
      headers: {
        "Cache-Control": "s-maxage:60, stale-while-revalidate"
      }
    }
  );
};

export default function Slug() {
  const { story } = useLoaderData<LoaderData>();

  return (
    <>
      <section className="top-section max-w-prose mx-auto">
        <div className="tilted mb-8">
          <div className="space-y-1">
            <Link
              to={routes.stories}
              className="text-gray-500 dark:text-gray-300"
            >
              <div className="header-font uppercase text-sm">
                <i className="bi bi-arrow-left"></i> All Stories
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

        <div
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
          <MDXRemote {...story.mdxContent} />
        </div>
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
      </section>
    </>
  );
}
