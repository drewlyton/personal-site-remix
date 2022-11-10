import type { LoaderFunction } from "@remix-run/node";
import { client } from "~/data/client";
import GetStories from "~/data/GetStories";
import type IStory from "~/data/Story";
import { escapeCdata } from "~/helpers/escapeCharacters";
import { getHost } from "~/helpers/getHost.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { stories }: { stories: IStory[] } = await client.request(GetStories);

  const storiesURL = `https://${getHost(request)}/stories`;
  const storyURL = (slug: string) =>
    `https://${getHost(request)}/story/${slug}`;

  const rss = `
    <rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">
        <channel>
            <title>Drew's Blog</title>
            <link>${storiesURL}</link>
            <atom:link href="${
              request.url
            }" rel="self" type="application/rss+xml" />
            <description>My name's Drew. I'm a designer and software engineer who likes to make stuff on the internet. I make videos and write about things I'm learning.</description>
            <language>en-us</language>
            <generator>Remix RSS</generator>
            <ttl>40</ttl>
            ${stories
              .map((story) =>
                `
                <item>
                <title><![CDATA[${escapeCdata(story.title)}]]></title>
                <description><![CDATA[${escapeCdata(
                  story.description
                )}]]></description>
                <dc:creator>
                    <![CDATA[${escapeCdata(story.author.name)}]]>
                </dc:creator>
                <pubDate>
                    ${new Date(story.publishedAt).toUTCString()}
                </pubDate>
                <link>${storyURL(story.slug)}</link>
                <guid>${storyURL(story.slug)}</guid>
                </item>
            `.trim()
              )
              .join("\n")}
        </channel>
    </rss>
  `.trim();

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "x-content-type-options": "nosniff",
      "Content-Length": String(Buffer.byteLength(rss)),
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`
    }
  });
};
