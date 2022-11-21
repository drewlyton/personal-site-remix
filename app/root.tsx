import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import Layout from "./components/Layout";
import { metaTags } from "./helpers/metaTags";
import { ThemeContext } from "./helpers/useTheme";
import styles from "./styles/app.css";

export const meta: MetaFunction = ({ location }) => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  ...metaTags({ url: location.pathname })
});

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
    },
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: "Drew Lytle",
      href: "/feed.rss.xml"
    },
    {
      rel: "alternate",
      type: "application/atom+xml",
      title: "Drew Lytle",
      href: "/feed.atom.xml"
    }
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeContext>
          <Layout>
            <Outlet />
          </Layout>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </ThemeContext>
      </body>
    </html>
  );
}
