import * as esbuild from "esbuild";
import { cp, mkdir, rm } from "node:fs/promises";

const watch = process.argv.includes("--watch");

async function copyStatic() {
  await mkdir("dist/popup", { recursive: true });
  await cp("manifest.json", "dist/manifest.json");
  await cp("icons", "dist/icons", { recursive: true });
  await cp("src/popup/popup.html", "dist/popup/popup.html");
  await cp("src/popup/popup.css", "dist/popup/popup.css");
}

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await copyStatic();

const ctx = await esbuild.context({
  entryPoints: {
    "platforms/youtube": "src/platforms/youtube.js",
    "platforms/twitter": "src/platforms/twitter.js",
    "platforms/linkedin": "src/platforms/linkedin.js",
    "popup/popup": "src/popup/popup.js",
    "background/background": "src/background/background.js",
  },
  bundle: true,
  format: "iife",
  outdir: "dist",
  target: "firefox109",
  logLevel: "info",
});

if (watch) {
  await ctx.watch();
  console.log("esbuild watching…");
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
