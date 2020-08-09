module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb-base',
    'react-app',
    'plugin:jsx-a11y/recommended',
    'plugin:import/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
  },
  plugins: [
    'react',
    'jsx-a11y',
  ],
  rules: {
    indent: [
      'error',
      2,
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'always',
    ],
    'linebreak-style': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'no-console': ['error'],
    'import/prefer-default-export': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'consistent-return': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx"]
      }
    }
  }
};