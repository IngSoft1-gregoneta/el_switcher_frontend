/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
    logHeapUsage: true,
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest-setup.js"],
    coverage: {
      provider: "v8", // or 'istanbul'
    },
  },
});
