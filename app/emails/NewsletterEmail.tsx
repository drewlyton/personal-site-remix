import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text
} from "@react-email/components";
import { Markdown } from "@react-email/markdown";
import type Story from "~/data/Story";
import { TailwindEmailConfig } from "./TailwindEmailConfig";
import { PropsWithChildren, useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

type NewsletterEmailProps = {
  issueNumber?: number;
  previewText?: string;
  messageBody?: string[];
  story?: Pick<
    Story,
    "title" | "description" | "featuredImage" | "slug" | "author"
  >;
};

export function NewsletterEmail({
  issueNumber = 1,
  previewText = "Read Drew's latest blogpost",
  messageBody = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  ],
  story = {
    title: "Latest post title",
    description: "Latest post description",
    featuredImage: {
      url: "https://media.graphassets.com/Eq1aApzqQ2iRqhxKjEBb"
    },
    slug: "test-slug",
    author: {
      bio: "Test bio",
      name: "Drew Lyton",
      picture: { url: "https://media.graphassets.com/DaEP4yDeQkuwmEl0hfrf" }
    }
  }
}: NewsletterEmailProps) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://www.drewis.cool";

  const markdownContainerStyles: React.CSSProperties = {
    lineHeight: "1.85rem",
    fontSize: "1rem"
  };
  const MDXComponentAboveFold = getMDXComponent(messageBody[0]);
  const MDXComponentBelowFold = getMDXComponent(messageBody[1]);
  const MDXComponents = { p: MDXText, blockquote: MDXBlockQuote };

  return (
    <TailwindEmailConfig>
      <Html>
        <Head>
          <title>{`Realizing Thought ${issueNumber}`}</title>
        </Head>
        <Preview>{previewText}</Preview>
        <Body className="font-sans">
          <Section>
            <Container>
              <Section>
                <Row>
                  <Text className="text-2xl font-serif font-semibold">
                    Hey friends 👋,
                  </Text>
                  <MDXComponentAboveFold components={MDXComponents} />
                </Row>
              </Section>
              <Button
                href={`https://www.drewis.cool/story/${story.slug}?ref=newsletter`}
              >
                <Section>
                  <div className="border border-solid rounded-md border-gray-300 my-6">
                    <Img
                      src={story.featuredImage.url}
                      className="rounded-t-md"
                      width={"100%"}
                    />
                    <Text className="text-xl px-5 font-bold text-black">
                      {story.title}
                    </Text>
                    <Text className="px-5 text-base text-black">
                      {story.description}
                    </Text>
                  </div>
                </Section>
              </Button>
              <MDXComponentBelowFold components={MDXComponents} />
              <Text className="text-base mb-2">Until next time,</Text>
              <Row className="mt-6 mb-8">
                <Column className="w-[40px]" valign="top">
                  <Img src={story.author.picture.url} width={"100%"} />
                </Column>
                <Column valign="top">
                  <Text className="text-lg font-semibold ml-4 my-0">
                    {story.author.name}
                  </Text>
                  <Text className="text-base ml-4 my-0">
                    {story.author.bio}
                  </Text>
                </Column>
              </Row>

              <Hr className="my-7" />
              <Section className="mb-5">
                <Column align="left">
                  <Link
                    href="https://www.drewis.coo/?ref=newsletter"
                    target="_blank"
                  >
                    <Img
                      src={`${baseUrl}/static/logo-text.png`}
                      width="96"
                      alt="Drew's logo"
                    />
                  </Link>
                </Column>
                <Column align="right">
                  <Button
                    className="text-gray-500 text-sm"
                    href="{{ unsubscribe_url }}"
                  >
                    Unsubscribe
                  </Button>
                </Column>
              </Section>
            </Container>
          </Section>
        </Body>
      </Html>
    </TailwindEmailConfig>
  );
}

const MDXText: React.FC<PropsWithChildren> = ({ children }) => {
  return <Text className="text-base leading-7">{children}</Text>;
};

const MDXBlockQuote: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <blockquote className="m-0 pl-8 border-solid border-0 border-l-4 border-l-[#F66100] italic">
      {children}
    </blockquote>
  );
};