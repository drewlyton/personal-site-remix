import { bundleMDX as mdxBundler } from "mdx-bundler";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const bundleMDX = async (source: string) =>
  await mdxBundler({
    source,
    mdxOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkMath,
        remarkGfm
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeKatex,
        rehypePrism
      ];

      return options;
    }
  });

export { bundleMDX };
