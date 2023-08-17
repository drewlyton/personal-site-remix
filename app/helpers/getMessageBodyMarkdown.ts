import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";

export async function getMessageBodyMarkdown(messageBody: string) {
  const regex = /\n*%* *LINK *%*\n*/g;
  const [messageBodyAbove, messageBodyBelow] = messageBody.split(regex);

  const { code: messageAboveLink } = await bundleMDX({
    source: messageBodyAbove,
    mdxOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];

      return options;
    }
  });

  const { code: messageBelowLink } = await bundleMDX({
    source: messageBodyBelow,
    mdxOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];

      return options;
    }
  });

  return [messageAboveLink, messageBelowLink];
}
