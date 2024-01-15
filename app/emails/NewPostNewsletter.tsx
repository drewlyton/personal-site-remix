import {
  Button,
  Column,
  Img,
  Preview,
  Row,
  Section,
  Text
} from "@react-email/components";
import { getMDXComponent } from "mdx-bundler/client";
import type { PropsWithChildren } from "react";
import type { Newsletter } from "~/data/Newsletter";
import { Post } from "~/data/types";
import { imageBuilder } from "~/helpers/imageBuilder";

type NewsletterEmailProps = Pick<Newsletter, "body" | "author" | "preview">;

export function NewPostNewsletter({
  body,
  author,
  preview
}: NewsletterEmailProps) {
  const MDXComponentAboveFold = getMDXComponent(body);
  const MDXComponents = { p: MDXText, blockquote: MDXBlockQuote };

  return (
    <>
      <Preview>{preview}</Preview>
      <Section>
        <Row>
          <Text className="text-2xl font-serif font-semibold">
            Hey friends 👋,
          </Text>
          <MDXComponentAboveFold components={MDXComponents} />
        </Row>
      </Section>
      <Text className="text-base mb-2">Until next time,</Text>
      <Row className="mt-6 mb-8">
        <Column className="w-[40px]" valign="top">
          <Img
            src="https://www.drewis.cool/static/headshot.png"
            width={"100%"}
          />
        </Column>
        <Column valign="top">
          <Text className="text-lg font-semibold ml-4 my-0">{author.name}</Text>
          <Text className="text-base ml-4 my-0">{author.bio}</Text>
        </Column>
      </Row>
    </>
  );
}

const MDXText: React.FC<PropsWithChildren> = ({ children }) => {
  return <Text className="text-base leading-7">{children}</Text>;
};

const MDXBlockQuote: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <blockquote className="m-0 pl-8 border-solid border-0 border-l-4 !border-l-black italic">
      {children}
    </blockquote>
  );
};

const MDXStory: React.FC<{ story: Post }> = ({ story }) => {
  return (
    <Button
      href={`https://www.drewis.cool/story/${story.slug}?ref=newsletter`}
      className="text-black"
    >
      <Section>
        <div className="border border-solid rounded-md border-gray-300 my-6">
          <Img
            src={imageBuilder.image(story.mainImage).url()}
            className="rounded-t-md"
            width={"100%"}
          />
          <Text className="text-xl px-5 font-bold">{story.title}</Text>
          <Text className="px-5 text-base">{story.description}</Text>
        </div>
      </Section>
    </Button>
  );
};
