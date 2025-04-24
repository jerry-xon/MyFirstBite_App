import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  ...pluginJs.configs.recommended,
  ...pluginReactConfig,
  {
    rules: {
      "react/prop-types": "off",
      "no-undef": "error", // Ensure no undefined variables
      "no-unused-vars": "warn",
      "no-unused-imports": "warn",
    },
  },
];
