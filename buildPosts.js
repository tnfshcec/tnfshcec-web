import { promises as fs } from "fs";
import path from "path";

const config = {
  postDir: "cec",
  postRoute: "src/routes/post",
  assetRoute: "static/post",
  componentRoute: "src/lib/post",
  ext: {
    asset: ["jpg", "png", "webp", "avif"],
    post: ["md"],
    component: ["svelte"]
  }
};

/**
 * Get file type from its path name.
 *
 * @param {string} src Path of the file
 * @returns {keyof typeof config.ext} File type
 */
function getFileType(src) {
  // get rid of the dot
  let ext = path.extname(src).substring(1);
  for (let [type, exts] of Object.entries(config.ext)) {
    if (exts.includes(ext)) return type;
  }

  // for any other files
  return "asset";
}

/**
 * Build a md post to their path in site route.
 *
 * @param {string} src Path of the post file
 */
async function mkPost(src) {
  let post = path.join(
    config.postRoute,
    src.replace(/cec\//, "").slice(0, -path.extname(src).length)
  );

  await fs.mkdir(post);
  await fs.copyFile(src, path.join(post, `+page.md`));

  console.log("Post: ", post);
}

/**
 * Build md source files into site route.
 *
 * @param {string} src Source of the file directory
 */
async function buildDir(src) {
  let files = await fs.readdir(src, { withFileTypes: true });

  files.forEach((file) => {
    // file.name => path/to/post.md
    // fileSrc   => cec/path/to/post.md
    const fileSrc = path.join(src, file.name);

    if (file.isDirectory()) {
      [config.postRoute, config.assetRoute, config.componentRoute].forEach((route) => {
        let dir = path.join(route, file.name);

        fs.mkdir(dir)
          .then(() => console.log("Make directory", dir))
          .catch(({ message }) => console.warn(message));
      });

      buildDir(fileSrc);
      return;
    }

    switch (getFileType(file.name)) {
      case "post":
        console.log("mkpost", path.join(config.postRoute, file.name));
        mkPost(fileSrc).catch(({ message }) => console.warn(message));
        break;
      case "asset":
        fs.copyFile(fileSrc, path.join(config.assetRoute, file.name)).catch(({ message }) =>
          console.warn(message)
        );
        break;
      case "component":
        fs.copyFile(fileSrc, path.join(config.componentRoute, file.name)).catch(({ message }) =>
          console.warn(message)
        );
        break;
    }
  });
}

async function clearRoutes() {
  console.log("Clearing posts...");

  for (let route of [config.postRoute, config.assetRoute, config.componentRoute]) {
    let files = await fs.readdir(route, { withFileTypes: true });

    for (let file of files) {
      if (file.isDirectory()) {
        await fs.rm(path.join(route, file.name), { recursive: true });
      } else {
        await fs.unlink(path.join(route, file.name));
      }
    }
  }
}

async function ensureRoutes() {
  for (let route of [config.postRoute, config.assetRoute, config.componentRoute]) {
    fs.mkdir(route).catch((err) => {
      if (!err.code == "EEXIST") {
        throw err;
      }
    });
  }
}

await ensureRoutes();
await clearRoutes();
await buildDir(config.postDir);
