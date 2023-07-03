module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],
  plugins: [],
  rules: {
    'vue/first-attribute-linebreak': ['error', 'always'],
  },
  excludes: ['node_modules', 'dist', '.nuxt', 'coverage', 'storybook-static'],
};
