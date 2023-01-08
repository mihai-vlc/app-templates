import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: join(__dirname, "..", "dist", "ui"),
    },
    plugins: [react()],
    base: "/ui/",
});
