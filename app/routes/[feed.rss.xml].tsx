import type { LoaderFunction } from "@remix-run/node";
import { getAllPosts, sanity } from "~/data/sanityClient.server";
import { Post } from "~/data/types";
import { feed } from "~/helpers/feed";
import { getHost } from "~/helpers/getHost.server";
import { imageBuilder } from "~/helpers/imageBuilder";

export const loader: LoaderFunction = async ({ request }) => {
  const stories = (await sanity.fetch(getAllPosts())) as Post[];

  const origin = new URL(request.url).origin;
  const storyURL = (slug: string) =>
    `https://${getHost(request)}/story/${slug}`;

  const rss = feed(origin);

  stories.forEach(
    ({ author, title, description, slug, publishedAt, mainImage }) => {
      rss.addItem({
        title,
        id: storyURL(slug),
        link: storyURL(slug),
        description,
        date: new Date(publishedAt),
        author: [
          {
            name: author.name,
            email: "contact@drewis.cool"
          }
        ],
        image: {
          url: imageBuilder.image(mainImage).url(),
          type: "image/jpg",
          length: 0
        }
      });
    }
  );

  return new Response(rss.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "x-content-type-options": "nosniff",
      "Content-Length": String(Buffer.byteLength(rss.rss2())),
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`
    }
  });
};
