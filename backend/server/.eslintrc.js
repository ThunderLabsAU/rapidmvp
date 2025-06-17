/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["../../.eslint/server.eslint.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
