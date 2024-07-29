module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    semi: [2, "always"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "space-before-function-paren": [
      "error",
      { named: "never", anonymous: "always" }
    ],
    "multiline-ternary": ["off"],
    quotes: [
      "error",
      "double",
      {
        allowTemplateLiterals: true,
        avoidEscape: true
      }
    ]
  }
};
