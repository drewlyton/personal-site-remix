import { Body, Container, Html, Section } from "@react-email/components";
import { EmailFooter } from "./EmailFooter";
import { TailwindEmailConfig } from "./TailwindEmailConfig";
import type { PropsWithChildren } from "react";

export const EmailLayout: React.FC<
  PropsWithChildren<{ recipient: string }>
> = ({ children, recipient }) => {
  return (
    <TailwindEmailConfig>
      <Html>
        <Body className="font-sans bg-bgApache">
          <Section>
            <Container>
              {children}
              <EmailFooter recipient={recipient} />
            </Container>
          </Section>
        </Body>
      </Html>
    </TailwindEmailConfig>
  );
};
