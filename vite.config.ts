import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Config bersih tanpa bawaan Cloudflare/Lovable
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ngasih tau Vercel buat nyari hasil webnya di folder "dist"
    outDir: "dist",
  }
});