import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "xpnntlnd",
  dataset: "production",
  useCdn: process.env.NODE_ENV === "production", // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_TOKEN // Only if you want to update content with the client
});

export function getPostsByTag(tags: string[]) {
  const tagsFilters = tags.map((t) => `"${t}" in tags[]->title`).join(" || ");
  return `*[_type == "post" ${
    tagsFilters.length ? `&& ${tagsFilters}` : ""
  }]{_id, 'title': coalesce(note->title, title), description, mainImage, tags[]->{title}, "slug": slug.current}`;
}

export function getAllPosts() {
  return `*[_type == "post"]{_id, 'title': coalesce(note->title, title), description, mainImage, tags[]->{title}, "slug": slug.current, publishedAt}`;
}

export function getPostsFeed() {
  return `*[_type == "post"]{_id, 'title': coalesce(note->title, title), description, mainImage, tags[]->{title}, "slug": slug.current, linkedinPost, author->{...}, publishedAt}| order(publishedAt desc)`;
}

export function getPostBySlug(slug: string) {
  return `*[_type == "post" && slug.current match "${slug}" ][0]{_id, 'title': coalesce(note->title, title), description, mainImage, tags[]->{title}, "slug": slug.current, 'body': coalesce(note->body, body), author->{...}, publishedAt}`;
}
