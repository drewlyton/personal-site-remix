import type { LoaderFunction } from "@remix-run/node";
import { client } from "~/data/client";
import GetStories from "~/data/GetStories";
import type IStory from "~/data/Story";
import { feed } from "~/helpers/feed";
import { getHost } from "~/helpers/getHost.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { stories }: { stories: IStory[] } = await client.request(GetStories);

  const origin = new URL(request.url).origin;
  const storyURL = (slug: string) =>
    `https://${getHost(request)}/story/${slug}`;

  const rss = feed(origin);

  stories.forEach(
    ({ author, title, id, description, slug, publishedAt, featuredImage }) => {
      rss.addItem({
        title,
        id,
        link: storyURL(slug),
        description,
        date: new Date(publishedAt),
        author: [
          {
            name: author.name,
            email: "contact@drewis.cool"
          }
        ],
        image: featuredImage.url
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
