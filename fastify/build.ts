import esbuild from "esbuild";
import { globPlugin } from "esbuild-plugin-glob";

esbuild.build({
    entryPoints: ["main.ts"],
    bundle: true,
    platform: "node",
    outfile: "dist/app.js",
    format: "cjs",
});

esbuild.build({
    entryPoints: ["controllers/**/!(*.test).ts"],
    bundle: false,
    platform: "node",
    outdir: "dist/controllers",
    format: "cjs",
    plugins: [globPlugin()],
});
