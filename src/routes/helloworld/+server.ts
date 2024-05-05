import type { RequestHandler } from "./$types";

export const GET: RequestHandler = () => {
  return new Response("<h1>hello world!!</h1>", { headers: { "Content-Type": "text/html" } });
};
