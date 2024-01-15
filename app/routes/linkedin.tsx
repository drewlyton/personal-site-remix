import { redirect } from "@remix-run/node";

export function loader() {
  return redirect("https://www.linkedin.com/in/drew-lyton-3301a370/");
}
