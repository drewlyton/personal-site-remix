import type { LoaderFunction } from "@remix-run/node";
import { client } from "~/data/client";
import GetStories from "~/data/GetStories";
import type Story from "~/data/Story";
import { feed } from "~/helpers/feed";
import { getHost } from "~/helpers/getHost.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { stories }: { stories: Story[] } = await client.request(GetStories);

  const origin = new URL(request.url).origin;
  const storyURL = (slug: string) =>
    `https://${getHost(request)}/story/${slug}`;

  const rss = feed(origin);

  stories.forEach(
    ({ author, title, description, slug, publishedAt, featuredImage }) => {
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
          url: featuredImage.url,
          type: "image/jpg",
          length: 0
        }
      });
    }
  );

  return new Response(rss.atom1(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "x-content-type-options": "nosniff",
      "Content-Length": String(Buffer.byteLength(rss.atom1())),
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`
    }
  });
};
