export const sanityClient = {
  async mutate(mutations: object[]) {
    return await fetch(
      `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/production`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.SANITY_TOKEN}`
        },
        body: JSON.stringify({ mutations })
      }
    );
  }
};
