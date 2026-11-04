import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Brand kit: design source delivered as-is (components/brand holds the app copy).
    "brand/**",
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated aggregators and plain-Node browser scripts (CommonJS by design).
    "content/*/_index.ts",
    "tests/browser/**",
  ]),
]);

export default eslintConfig;
