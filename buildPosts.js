import { promises as fs } from "fs";
import path from "path";

const config = {
  postDir: "cec",
  destDir: "src/routes/post"
};

/**
 * Build a md post to their path in site route.
 *
 * @param {string} src Path of the post file
 */
async function mkPost(src) {
  let post = path.join(
    config.destDir,
    src.replace(/cec\//, "").slice(0, -path.extname(src).length)
  );

  await fs.mkdir(post);
  await fs.copyFile(src, path.join(post, `+page.md`));

  console.log("Copy post", post);
}

/**
 * Build md source files into site route.
 *
 * @param {string} src Source of the file directory
 */
async function buildDir(src) {
  let files = await fs.readdir(src, { withFileTypes: true });

  files.forEach((file) => {
    const postSrc = path.join(src, file.name);
    const dest = path.join(config.destDir, file.name);

    if (file.isDirectory()) {
      fs.mkdir(dest)
        .then(() => console.log("Make directory", dest))
        .catch(({ message }) => console.warn(message));
      buildDir(postSrc);
    } else {
      mkPost(postSrc).catch(({ message }) => console.warn(message));
    }
  });
}

async function clearPosts(src) {
  let files = await fs.readdir(src, { withFileTypes: true });

  for (let file of files) {
    if (file.isDirectory()) {
      await fs.rm(path.join(src, file.name), { recursive: true });
    } else {
      await fs.unlink(path.join(src, file.name));
    }
    console.log("Delete", file.name);
  }
}

await clearPosts(config.destDir);
await buildDir(config.postDir);
