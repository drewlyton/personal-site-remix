import { Column, Img, Link, Row, Section, Text } from "@react-email/components";

export function ConfirmSubscription({ recipient }: { recipient: string }) {
  return (
    <Section>
      <Row>
        <Text className="text-2xl font-serif font-semibold">
          Hey friend 👋,
        </Text>
        <Text className="text-base">
          Thanks for subscribing to my newsletter!
        </Text>
        <Text className="text-base">
          Click the link below to confirm your subscription and recieve a
          notification whenever I post something new:
        </Text>
        <Link
          href={`https://drewis.cool/newsletter/confirm?email=${recipient}`}
          className="text-xl underline"
        >
          Confirm Subscription
        </Link>
      </Row>
      <Text className="text-sm font-semibold mt-6 ">Best,</Text>
      <Row className="mb-8">
        <Column className="w-[40px]" valign="top">
          <Img
            src={"https://media.graphassets.com/DaEP4yDeQkuwmEl0hfrf"}
            width={"100%"}
          />
        </Column>
        <Column>
          <Text className="text-base ml-4 my-0">Drew Lyton</Text>
        </Column>
      </Row>
      <Row>
        <Text className="mt-8 italic text-gray-500 mb-1 font-bold">
          Received this by mistake?
        </Text>
        <Text className="text-gray-500 m-0">
          Feel free to disregard this email - I won't send you anything unless
          you click the link above. Have a wonderful day 👍
        </Text>
      </Row>
    </Section>
  );
}
