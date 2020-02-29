module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'standard', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': 'off',
    semi: [2, 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'react/prop-types': ['error', { ignore: ['navigation'] }],
    'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
    'global-require': 0,
    'no-console': 'off',
    'max-len': ['error', { code: 120, tabWidth: 2 }],
  },
};
