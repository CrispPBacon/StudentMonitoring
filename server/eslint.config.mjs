import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, eslintPluginPrettier },
    extends: ['js/recommended', eslintConfigPrettier],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      // 'no-console': 'warn',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },
]);
