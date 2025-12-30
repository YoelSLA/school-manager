import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  root: "src",
  base: "./",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      // Todas las llamadas a /api se redirigen a tu backend en el puerto 8080
      "/api": "http://localhost:8080"
    }
  }
});
