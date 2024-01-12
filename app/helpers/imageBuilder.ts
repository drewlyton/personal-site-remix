import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: "xpnntlnd",
  dataset: "production",
  useCdn: process.env.NODE_ENV === "production", // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03" // use current date (YYYY-MM-DD) to target the latest API version
});

export const imageBuilder = imageUrlBuilder(sanity);
