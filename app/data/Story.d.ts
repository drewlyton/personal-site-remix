import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { RichText } from "./RichText";

export default interface IStory {
  id: string;
  title: string;
  description: string;
  content: RichText;
  mdx: string;
  mdxContent: MDXRemoteSerializeResult;
  slug: string;
  videoUrl: string;
  highlighted: boolean;
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
