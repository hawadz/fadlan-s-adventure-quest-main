import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Kita buang @lovable.dev dan pakai config standar Vite SPA
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Memaksa outputnya standar biar Vercel nggak bingung
    outDir: "dist",
  }
});