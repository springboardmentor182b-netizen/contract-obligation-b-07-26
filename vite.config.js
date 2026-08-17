import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "client",
  plugins: [react()],
  esbuild: {
    loader: "jsx",
    include: /client\/src\/.*\.js$/,
  },
});