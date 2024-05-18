import { env } from "$env/dynamic/private";
import { listSortedPosts } from "$lib/utils/posts";
import type { RequestHandler } from "./$types";

const ORIGIN = env.ORIGIN ?? "https://www.tnfshcec.com";

const render = (): string =>
  `
<?xml version='1.0' encoding='utf-8'?>
<urlset
   xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
   xmlns:xhtml="https://www.w3.org/1999/xhtml">
    <url>
        <loc>${ORIGIN}</loc>
    </url>
    <url>
        <loc>${ORIGIN}/post</loc>
    </url>
    ${listSortedPosts({ all: false })
      .map(
        (post) => `
    <url>
         <loc>${ORIGIN + "/post/" + post.slug}</loc>
    </url>`
      )
      .join("")}
</urlset>
`.trim();

export const trailingSlash = "never";

export const GET: RequestHandler = async () =>
  new Response(render(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
