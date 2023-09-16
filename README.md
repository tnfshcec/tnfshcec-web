# tnfshcec-web

Demo prerendered site running at https://eggrror404.github.io/tnfshcec-web

## How to build

### Using Docker Compose

Using `docker-compose` will be the easier way to build the web server.

1. `git clone` this repository, then `cd` into it.
2. Copy `.env.example` to `.env` and follow the instructions.
   This sets up all the necessary settings for the app.
   - For Github app and the `GITHUB` variables, checkout https://authjs.dev/getting-started/oauth-tutorial#2-configuring-oauth-provider
3. Run `docker compose up` and Docker should take care of the rest.

The default SvelteKit server is only http, which means authentication would not work as it needs https.
Using a reverse proxy can probably be the fix for now.

### Manually building

0. Make sure [Node.js](https://nodejs.org) and npm are installed.
1. `git clone` this repository, then `cd` into it.
2. Run `npm install` to install dependencies.
3. Create file `.env` from `.env.example` and follow the instructions.
   - For Github app and the `GITHUB` variables, checkout https://authjs.dev/getting-started/oauth-tutorial#2-configuring-oauth-provider
4. `npm run build` to build the server.
5. `npm run preview` to run the server you just built.
   - `npm run dev` to run the development server.
   - `node build` will start a NodeJS server built, currently unable to handle https.

## Usage

### The post system

Posts are stored similar to flat-file cms systems, in the `cec/` folder, as markdown files.
The server reads them directly and caches the markdown content once loaded.

As for why a typical database is not used, this is because:
1. The project was initially implemented as a static site.
2. This allows easy inspection directly on the filesystem.
3. With caching in place, it should be sufficient for a simple posting system.

Post route in the url is directly mapped to the filesystem, eg:

`https://<domain>/post/path/to/post` -> `cec/path/to/post.md`

## Prerender

Prerendering is enabled through the `PRERENDER` environment variable.

Note that `AUTH_SECRET` and `AUTH_TRUST_HOST` variables needs to be set
for Auth.js to load correctly.
(Even though auth doesn't work with prerendering.)

Currently prerender is set up with Github Actions, to build on push events.
