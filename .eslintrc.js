module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  env: {
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 1,
    'no-useless-escape': 1,
    'no-fallthrough': 1,
    'no-extra-boolean-cast': 1,
    'react/prop-types': 0,
    'react/no-deprecated': 0,
    'react/display-name': 0,
    'react/no-find-dom-node': 1,
    'react/no-unescaped-entities': 'warn',
    'react/no-string-refs': 'warn',
    'react/jsx-no-target-blank': 'warn',
    'react/no-children-prop': 0
  }
};
