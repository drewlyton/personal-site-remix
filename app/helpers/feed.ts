import { Feed } from "feed";

export const feed = (origin: string) =>
  new Feed({
    title: "Drew's Blog",
    link: origin + "/stories",
    description:
      "My name's Drew. I'm a designer and software engineer who likes to make stuff on the internet. I make videos and write about things I'm learning.",
    id: origin,
    copyright: `All rights reserved ${new Date().getFullYear()}, Drew Lyton`,
    feedLinks: {
      rss: origin + "/feed.rss.xml",
      atom: origin + "/feed.atom.xml"
    },
    language: "en",
    image: origin + "/favicon-32x32.png",
    favicon: origin + "/favicon.ico",
    author: {
      name: "Drew Lyton",
      email: "contact@drewis.cool"
    }
  });
