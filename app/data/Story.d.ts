import type { RichText } from "./RichText";

export default interface IStory {
  id: string;
  title: string;
  description: string;
  content: RichText;
  mdx: string;
  slug: string;
  videoUrl: string;
  highlighted: boolean;
  preview: boolean;
  featuredImage: {
    url: string;
  };
  publishedAt: string;
  author: {
    name: string;
    bio: string;
    picture: {
      url: string;
    };
  };
}
