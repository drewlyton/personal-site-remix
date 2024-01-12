import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanity = createClient({
  projectId: "xpnntlnd",
  dataset: "production",
  useCdn: process.env.NODE_ENV === "production", // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_TOKEN // Only if you want to update content with the client
});

export const imageBuilder = imageUrlBuilder(sanity);

export function getPostsByTag(tags: string[]) {
  const tagsFilters = tags.map((t) => `"${t}" in tags[]->title`).join(" || ");
  return `*[_type == "post" ${tagsFilters.length ? `&& ${tagsFilters}` : ""}] `;
}

export function getAllPosts() {
  return `*[_type == "post"] `;
}
