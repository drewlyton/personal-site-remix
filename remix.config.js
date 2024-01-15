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
    "bail",
    "ccount",
    /^character-.*/,
    "comma-separated-tokens",
    /^estree-.*/,
    /^hast-util-.*/,
    /^is-.*/,
    /^mdast-util-.*/,
    /^micromark.*/,
    /^parse-entities.*/,
    /^parse.*/,
    /^stringify-entities.*/,
    /^hastscript.*/,
    /^web-namespaces.*/,
    /^refractor.*/,
    "periscopic",
    "property-information",
    "space-separated-tokens",
    "trim-lines",
    "trough",
    /^vfile.*/,
    // MDX:
    /^rehype.*/,
    /^remark.*/,
    /^unified.*/,
    /^unist.*/,
    /^markdown-*/,
    /^mdast.*/,
    /^micromark.*/,
    "devlop",
    "ccount",
    "markdown-table",
    "zwitch",
    "fault",
    "decode-named-character-reference",
    "longest-streak"
  ]
};
