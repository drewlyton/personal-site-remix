const routes = {
  index: "/",
  stories: "/stories",
  story: (slug: string) => `/story/${slug}`
};

export default routes;
