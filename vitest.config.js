import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      enabled: true,
      provider: "istanbul",
      exclude: ["**/style*.ts"],
      include: ["**mockingData**"],
      all: false,
      statements: 100,
      lines: 100,
      branches: 100,
      functions: 100,
    },
  },
});
