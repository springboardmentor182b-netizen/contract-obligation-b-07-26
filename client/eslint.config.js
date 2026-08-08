export default [
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // This repository contains both current and legacy React modules.
      // Keep lint focused on syntax and build-breaking issues until those
      // modules are consolidated.
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
]
