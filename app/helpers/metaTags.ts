interface ImetaTags {
  title?: string;
  description?: string;
  coverImage?: string;
  url?: string;
}

export const metaTags = ({
  title = "Drew Lytle",
  description = "My name's Drew. I'm a designer and software engineer who likes to make stuff on the internet. I make videos and write about things I'm learning.",
  coverImage = "https://media.graphcms.com/output=format:jpg/resize=,width:400,height:400/Rxt3c6FaT4uTu7iYkkkC",
  url = "/"
}: ImetaTags) => {
  if (title != "Drew Lytle") {
    title.concat(" | Drew Lytle");
  }
  return {
    title,
    description,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": coverImage,
    "twitter:url": `https://www.drewis.cool${url}`,
    "twitter:creator": "@drewlyton",
    "twitter:site": "@drewlyton",
    "twitter:card": "summary_large_image",
    "og:type": "article",
    "og:title": title,
    "og:description": description,
    "og:image": coverImage,
    "og:url": `https://www.drewis.cool${url}`
  };
};
