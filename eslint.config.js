import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import oxlint from 'eslint-plugin-oxlint'
import globals from 'globals'

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.next/**',
      'app/**',
      'components/**',
      'contexts/**',
      'hooks/**',
      'lib/**',
      'presentation/**',
      'application/**',
      'domain/**',
      'infrastructure/**',
      'messages/**',
      '**/*.tsx',
      '**/*.ts',
      'next-env.d.ts',
      'next.config.js',
      'tailwind.config.js',
      'postcss.config.js',
    ],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  ...oxlint.configs['flat/recommended'],
]
