import { Container, Section } from "@react-email/components";
import { EmailFooter } from "./EmailFooter";
import { TailwindEmailConfig } from "./TailwindEmailConfig";

export function ConvertKitTemplate() {
  return (
    <TailwindEmailConfig>
      <Section>
        <Container>
          <Section>{"{{ message_content }} "}</Section>
          <EmailFooter />
        </Container>
      </Section>
    </TailwindEmailConfig>
  );
}
