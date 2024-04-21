import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest-setup.ts",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          clsx: ["clsx"],
          react: ["react"],
          zod: ["zod"],
          rhf: ["react-hook-form"],
          reactDom: ["react-dom"],
          tw: ["tailwind-merge"],
        },
      },
    },
  },
});
