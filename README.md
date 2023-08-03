# tnfshcec-web

Demo prerendered site running at https://eggrror404.github.io/tnfshcec-web

## How to build

0. Make sure [Node.js](https://nodejs.org) and npm are installed.
1. `git clone` this repository, then `cd` into it.
2. Run `npm install` to install dependencies.
3. Create file `.env` from `.env.example` and follow the instructions.
   - For Github app and the `GITHUB` variables, checkout https://authjs.dev/getting-started/oauth-tutorial#2-configuring-oauth-provider
4. `npm run build` to build the server, and `npm run preview` to run it.
   - `npm run dev` to run the development server.

## Usage

### The post system

Posts are stored in the `cec/` folder, as markdown files.
The server reads the file everytime it's requested,
and offers adding, editing, and deleting posts for admin users.

Post route in the url is directly mapped to the filesystem, eg:

`https://<domain>/post/path/to/post` -> `cec/path/to/post.md`

## Prerender

Prerendering is enabled through the `PRERENDER` environment variable.

Note that `AUTH_SECRET` and `AUTH_TRUST_HOST` variables needs to be set
for Auth.js to load correctly.
(Even though auth doesn't work with prerendering.)

Currently prerender is set up with Github Actions, to build on push events.
