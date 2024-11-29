import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@app": resolve(__dirname, "src/app"),
      "@layouts": resolve(__dirname, "src/layouts"),
      "@modules": resolve(__dirname, "src/modules"),
      "@pages": resolve(__dirname, "src/pages"),
      "@router": resolve(__dirname, "src/router"),
      "@store": resolve(__dirname, "src/store"),
      "@shared": resolve(__dirname, "src/shared"),
      "@styles": resolve(__dirname, "src/styles"),
      "@hooks": resolve(__dirname, "src/shared/hooks"),
      "@components": resolve(__dirname, "src/shared/components"),
      "@assets": resolve(__dirname, "src/shared/assets"),
      "@api": resolve(__dirname, "src/shared/api"),
      "@ui": resolve(__dirname, "src/shared/ui"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
  plugins: [react()],
});
