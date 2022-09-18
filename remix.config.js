/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "netlify",
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.js"
      : undefined,
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: ".netlify/functions-internal/server.js",
  // publicPath: "/build/",
  serverDependenciesToBundle: [
    /^next-mdx-remote.*/,
    /^@mdx-js.*/,
    "bail",
    "ccount",
    /^character-.*/,
    "comma-separated-tokens",
    "decode-named-character-reference",
    /^estree-.*/,
    /^hast-util-.*/,
    /^is-.*/,
    /^longest-streak.*/,
    /^mdast-util-.*/,
    /^micromark.*/,
    /^parse-entities.*/,
    /^stringify-entities.*/,
    /^unified.*/,
    /^unist.*/,
    /^remark.*/,
    /^rehype.*/,
    /^hastscript.*/,
    /^web-namespaces.*/,
    /^refractor.*/,
    "periscopic",
    "property-information",
    "space-separated-tokens",
    "trim-lines",
    "trough",
    /^vfile.*/,
    "zwitch"
  ]
};
