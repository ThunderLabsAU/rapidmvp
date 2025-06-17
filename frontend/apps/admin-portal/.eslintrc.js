/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["../../.eslint/react.eslint.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
