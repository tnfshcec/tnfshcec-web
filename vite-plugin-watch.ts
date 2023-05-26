/*
 * The MIT License (MIT)
 *
 * Copyright (c) Boris Lepikhin <boris@lepikhin.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// Original project homepage: https://github.com/lepikhinb/vite-plugin-watch
// Copied and modified for customized features.

import type { PluginOption } from "vite";
import { minimatch } from "minimatch";
import path from "path";
import { exec } from "child_process";

export const watch = (config: {
  pattern: string | string[];
  command: string | ((file?: string) => string);
  silent?: boolean;
  timeout?: number;
  onInit?: boolean;
}): PluginOption => {
  const options = {
    silent: false,
    timeout: 500,
    onInit: true,
    ...config
  };

  let throttled = false;

  const command = (fileName?: string) =>
    typeof options.command === "string" ? options.command : options.command.call(null, fileName);

  const execute = (fileName?: string) => {
    exec(command(fileName), (exception, output, error) => {
      if (!options.silent && output) console.log(output);
      if (!options.silent && error) console.error(error);
    });
  };

  return {
    name: "vite-plugin-watch",

    buildStart() {
      if (options.onInit) {
        execute();
      }
    },

    handleHotUpdate({ file, server }) {
      if (throttled) return;

      throttled = true;

      setTimeout(() => (throttled = false), options.timeout);

      const patterns = Array.of(options.pattern).flat();
      const shouldRun = patterns.find((pattern) =>
        minimatch(file, path.resolve(server.config.root, pattern).replaceAll("\\", "/"))
      );

      if (shouldRun) {
        console.info("Running", command(file), "\n");

        execute(file);
      }
    }
  };
};
