import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://hieu-shop-backend.onrender.com",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        onError: (err, req, res) => {
          console.error("Proxy Error:", err);
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end("Proxy Error");
        },
      },
    },
  },
});
