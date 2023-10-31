import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";
import viteRawPlugin from "./vite/vite-raw-plugin.js";
import cleanDistCdn from './vite/clean-dist-cdn.js';
import banner from "vite-plugin-banner";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  root: "src",
  plugins: [
    banner({
      content:
        `/* NightVisionCharts v${pkg.version} | License: MIT\n` +
        ` © 2022 ChartMaster. All rights reserved */`,
      outDir: "../dist/cdn"  
    }),
    svelte({
      emitCss: false,
    }),
    viteRawPlugin({
      fileRegex: /\.navy$/,
    }),
  ],
  build: {
    target: "es2018",
    outDir: "../dist/cdn",
    emptyOutDir: true,
    inlineDynamicImports: true,
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "NightVision",
      fileName: (format) => `night-vision.${format}.js`
    },
    rollupOptions: {
      output: {
        entryFileNames: "night-vision.min.js",
        format: 'umd'
      },
      plugins: [
        {
          name: 'cleanup-dist',
          writeBundle() {
            cleanDistCdn();
          }
        }
      ]
    },
    minify: true,
  },
});
