import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  typescript: true,
  vue: true,
  jsonc: false,
  yaml: false,
  rules: {
    'ts/no-use-before-define': 'off',
    'eqeqeq': 'off',
  },
}, {
  files: ['**/*.test.ts', '**/*.spec.ts'],
  rules: {
    'no-console': 'off',
  },
})
