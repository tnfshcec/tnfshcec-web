import type { RequestHandler } from "./$types";

export const prerender = true;
export const trailingSlash = "never";

export const GET: RequestHandler = () => {
  return new Response("<h1>hello world!!</h1>", { headers: { "Content-Type": "text/html" } });
};
