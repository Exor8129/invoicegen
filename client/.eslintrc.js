module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'prettier'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@babel/eslint-parser', // Updated parser
  parserOptions: {
    ecmaVersion: 2021, // Updated to a more recent version
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false, // Required for @babel/eslint-parser
  },
  settings: {
    react: {
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
      flowVersion: '0.53',
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' },
    ],
    componentWrapperFunctions: [
      'observer',
      { property: 'styled' },
      { property: 'observer', object: 'Mobx' },
      { property: 'observer', object: '<pragma>' },
    ],
    linkComponents: [
      'Hyperlink',
      { name: 'Link', linkAttribute: 'to' },
    ],
  },
  rules: {
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/img-has-alt': [0],
    'jsx-a11y/img-redundant-alt': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-autofocus': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/jsx-filename-extension': 0,
    'react/no-array-index-key': 0,
    'react/no-unescaped-entities': 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'no-console': 'off',
    'no-param-reassign': 0,
    'import/no-unresolved': 0,
    'no-unused-vars': 'warn',
  },
  globals: {
    window: true,
    document: true,
    localStorage: true,
    FormData: true,
    FileReader: true,
    Blob: true,
    navigator: true,
  },
};
