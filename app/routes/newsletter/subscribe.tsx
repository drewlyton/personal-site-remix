import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const response = await fetch(
    `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_STORY_FORM_ID}/subscribe`,
    {
      method: "POST",
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email: formData.get("email")
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }
  );

  console.log(response);

  return response.json();
};
