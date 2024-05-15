import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 8080,
    host: "0.0.0.0",
    strictPort: true,
  },
});
