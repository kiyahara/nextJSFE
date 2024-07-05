import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: "istanbul", // or 'v8'
      reporter: ["text", "json", "html"],
    },
  },
});
