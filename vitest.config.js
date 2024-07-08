import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    // environment: "jsdom",
    coverage: {
      enabled: true,
      provider: "istanbul",
      exclude: ["**/style*.ts"],
      include: [
        "**mockingData/core/domain**",
        "**mockingData/core/data/repositories**",
      ],
      all: false,
      statements: 100,
      lines: 100,
      branches: 100,
      functions: 100,
    },
    passWithNoTests: true,
  },
});
