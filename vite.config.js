import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";
import viteRawPlugin from "./vite/vite-raw-plugin.js";
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
      outDir: "../dist",
    }),
    svelte({
      emitCss: false,
    }),
    viteRawPlugin({
      fileRegex: /\.navy$/,
    }),
  ],
  server: {
    port: 8085,
  },
  build: {
    target: "es2018",
    outDir: "../dist",
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "NightVision",
      fileName: "night-vision",
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    },
    minify: false,
  },
});
