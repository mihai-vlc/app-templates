import esbuild from "esbuild";
import vite from "vite";
import fs from "fs";
import { globPlugin } from "esbuild-plugin-glob";
import { join } from "path";

fs.rmSync(join(__dirname, "dist"), {
    recursive: true,
    force: true,
});

fs.mkdirSync(join(__dirname, "dist"));

esbuild
    .build({
        entryPoints: ["main.ts"],
        bundle: true,
        platform: "node",
        outfile: join(__dirname, "dist", "app.js"),
        define: {
            "process.env.NODE_ENV": "'production'",
        },
        format: "cjs",
        external: ["vite"],
        logLevel: "info",
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });

esbuild
    .build({
        entryPoints: ["controllers/**/!(*.test).ts"],
        bundle: false,
        platform: "node",
        outbase: join(__dirname, "controllers"),
        outdir: join(__dirname, "dist", "controllers"),
        define: {
            "process.env.NODE_ENV": "'production'",
        },
        format: "cjs",
        plugins: [globPlugin()],
        logLevel: "info",
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });

vite.build({
    root: join(__dirname, "ui"),
}).catch((e) => {
    console.log(e);
    process.exit(1);
});

var packageJson = {
    name: "fastify-react-app",
    version: "1.0.0",
    description: "",
    private: true,
    scripts: {
        start: "node app.js",
    },
    keywords: [],
    author: "",
    license: "ISC",
};

fs.writeFileSync(
    join(__dirname, "dist", "package.json"),
    JSON.stringify(packageJson, null, 2)
);
console.log("written the dist/package.json file");
