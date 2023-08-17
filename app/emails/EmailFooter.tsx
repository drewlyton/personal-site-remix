import {
  Text,
  Button,
  Column,
  Hr,
  Img,
  Link,
  Section
} from "@react-email/components";
import { TailwindEmailConfig } from "./TailwindEmailConfig";

export function EmailFooter() {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://www.drewis.cool";

  return (
    <TailwindEmailConfig>
      <Hr className="my-7" />
      <Section className="mb-5">
        <Column align="left">
          <Link href="https://www.drewis.cool/?ref=newsletter" target="_blank">
            <Img
              src={`${baseUrl}/static/logo-text.png`}
              width="96"
              alt="Drew's logo"
            />
          </Link>
        </Column>
        <Column align="right">
          <Button
            className="text-gray-500 text-xs mr-2"
            href="{{ unsubscribe_url }}"
          >
            Unsubscribe
          </Button>
          <Button
            className="text-gray-500 text-xs"
            href="{{ subscriber_preferences_url }}"
          >
            Update Preferences
          </Button>
        </Column>
      </Section>
      <Section>
        <Text className="text-sm text-center text-gray-500">
          {"{{ address }}"}
        </Text>
      </Section>
    </TailwindEmailConfig>
  );
}
