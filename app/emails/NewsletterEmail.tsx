import { Container, Section } from "@react-email/components";
import type Story from "~/data/Story";
import { EmailFooter } from "./EmailFooter";
import { MessageContent } from "./MessageContent";
import { TailwindEmailConfig } from "./TailwindEmailConfig";

type NewsletterEmailProps = {
  issueNumber?: number;
  messageBody?: string[];
  story?: Pick<
    Story,
    "title" | "description" | "featuredImage" | "slug" | "author"
  >;
};

export function NewsletterEmail(props: NewsletterEmailProps) {
  return (
    <TailwindEmailConfig>
      <Section className="font-sans">
        <Container>
          <MessageContent {...props} />
          <EmailFooter />
        </Container>
      </Section>
    </TailwindEmailConfig>
  );
}
