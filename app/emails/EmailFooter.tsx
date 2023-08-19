import {
  Button,
  Column,
  Hr,
  Img,
  Link,
  Section,
  Text
} from "@react-email/components";

export function EmailFooter({ recipient }: { recipient: string }) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://www.drewis.cool";

  return (
    <>
      <Hr className="my-7" />
      <Section className="mb-5">
        <Column align="left">
          <Link href="https://www.drewis.cool/?ref=newsletter" target="_blank">
            <Img
              src={"https://www.drewis.cool/static/logo-text.png"}
              width="96"
              alt="Drew's logo - a handrawn symbol of the letter D."
            />
          </Link>
        </Column>
        <Column align="right">
          <Button
            className="text-gray-500 text-xs "
            href={`${baseUrl}/newsletter/unsubscribe?recipient=${recipient}`}
          >
            Unsubscribe
          </Button>
        </Column>
      </Section>
      <Section>
        <Text className="text-[8px] text-center text-bgApache">
          <span className="block">998 Salisbury Square</span>
          <span className="block">Charlottesville, VA 22901</span>
        </Text>
      </Section>
    </>
  );
}
