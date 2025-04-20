import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), cloudflare()],
  build: {
    target: "esnext",
    modulePreload: {
      polyfill: true,
    },
    rollupOptions: {
      output: {
        format: "es",
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
});
