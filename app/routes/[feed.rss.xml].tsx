import type { LoaderFunction } from "@remix-run/node";
import { getPostsFeed, sanity } from "~/data/sanityClient.server";
import { Post } from "~/data/types";
import { feed } from "~/helpers/feed";
import { getHost } from "~/helpers/getHost.server";
import { imageBuilder } from "~/helpers/imageBuilder";
import { XMLParser, XMLBuilder } from "fast-xml-parser";

export const loader: LoaderFunction = async ({ request }) => {
  const stories = (await sanity.fetch(getPostsFeed())) as Post[];

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
            name: author?.name || "Drew Lyton",
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

  const baseRss = rss.rss2();
  // Convert rss xml to json
  const parser = new XMLParser({ ignoreAttributes: false });
  const baseJSON = parser.parse(baseRss);
  // Add items to RSS for automatic crossposting to socials
  stories.forEach((story, i) => {
    baseJSON.rss.channel.item[i].linkedinPost = story.linkedinPost;
  });

  // Convert JSON back to XML
  const builder = new XMLBuilder({
    ignoreAttributes: false
  });
  const fullRSS = builder.build(baseJSON);

  return new Response(fullRSS, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "x-content-type-options": "nosniff",
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`
    }
  });
};
