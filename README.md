# tnfshcec-web

## Installation

### Docker

Prebuilt Docker image is available for easy installation.

__Notes:__
1. There are some environment variables you may / need to set. See [`.env.example`](https://github.com/tnfshcec/tnfshcec-web/blob/main/.env.example).
2. For setting build arguments, see [Building image from source](#building-image-from-source).

#### Create and start a container
Use the following command to create a new container and run `tnfshcec-web`:
```sh
docker run --name tnfshcec-web \
    --restart unless-stopped \
    -v /path/to/cec:/app/cec \
    -p 3000:3000 \
    -e AUTH_SECRET=secret \
    -e AUTH_TRUST_HOST=1 \
    -d ghcr.io/tnfshcec/tnfshcec-web:main

# specify env vars with -e
```

#### With Docker Compose
Following is an example of `docker-compose.yml`:
```yml
services:
  tnfshcec-web:
    image: ghcr.io/tnfshcec/tnfshcec-web:main
    restart: unless-stopped
    volumes:
      - /path/to/cec:/app/cec
    environment:
      - AUTH_SECRET=secret
      - AUTH_TRUST_HOST=1
    ports:
      - 3000:3000
```

### Building image from source

Build arguments:
- `BASE_PATH`: Root path for the web server. See `base` in https://kit.svelte.dev/docs/configuration#paths for details.

Run the following command to build a Docker image:
```sh
docker build https://github.com/tnfshcec/tnfshcec-web.git

# For build arguments: --build-arg BASE_PATH="/path"
```

## Development

0. Make sure [Node.js](https://nodejs.org) and npm are installed.
1. `git clone` this repository, then `cd` into it.
2. Run `npm install` to install dependencies.
3. Create file `.env` from `.env.example` and follow the instructions.
   - For Github app and the `GITHUB` variables, checkout https://authjs.dev/getting-started/oauth-tutorial#2-configuring-oauth-provider
4. `npm run dev` will start the development server.
   - Build: `npm run build`
   - Preview build: `npm run preview`

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

### Internationalization (i18n)

This project uses [inlang](https://inlang.com/) with `paraglide.js` for i18n.
Translation files are stored in `src/messages/[lang].json`, where `lang` is the target language.

Currently supported languages: `zh-tw`, `en`, `ja`

To add a translation, follow the steps below:
1. Add your target language in `tnfshcec.inlang/settings.json`, under the `languageTags` array (ex:`de`).
2. Copy one of the translation files in `src/messages/[lang].json`, renaming it to your target language.
3. Do the translations in the file you copied.
4. Update the languages listed above (the README).
