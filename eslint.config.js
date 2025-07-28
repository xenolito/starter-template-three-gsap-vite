import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, prettier },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": "error", // aplica Prettier desde ESLint
      "no-unused-vars": "warn",
      semi: ["error", "never"], // fuerza sin punto y coma
    },
  },
  {
    files: ["vite.config.js"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
];
