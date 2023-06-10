module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  // // https://eslint.bootcss.com/docs/user-guide/configuring#specifying-globals
  globals: {
    NodeJS: 'readonly',
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'prettier', 'react-hooks', '@typescript-eslint'],
  rules: {
    // indent: ['error', 2],
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': "off",
    semi: 0,
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-explicit-any': 'off', // 可以使用 any 类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 解决使用 require() Require statement not part of import statement. 的问题
    '@typescript-eslint/no-var-requires': 0,
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-types.md
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          // add a custom message to help explain why not to use it
          Foo: "Don't use Foo because it is unsafe",
          // add a custom message, AND tell the plugin how to fix it
          String: {
            message: 'Use string instead',
            fixWith: 'string',
          },
          '{}': {
            message: 'Use object instead',
            fixWith: 'object',
          },
        },
      },
    ],
    // 禁止出现未使用的变量
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    // 强制使用驼峰
    camelcase: ['error', { properties: 'always' }],
    'no-undef': 2,
    'comma-dangle': [2, 'always-multiline'],
    'no-var': 'error',
    'no-console': [2, { allow: ['warn', 'error'] }],
    'object-shorthand': 2,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-async-promise-executor': 'off',
    // 优先使用 const
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
  },
};
