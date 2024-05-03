const baseParserOptions = {
  ecmaVersion: 2020,
};

const baseRules = {
  'max-len': ['error', 160, 2, {
    ignoreUrls: true,
    ignoreComments: false,
    ignoreRegExpLiterals: true,
    ignoreStrings: true,
    ignoreTemplateLiterals: true,
  }],
  'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
  'no-return-await': 'off',
  'no-underscore-dangle': [
    'error',
    { allow: ['_id', '_csrf', '_getBuffer', '_getData', '_getHeaders', '_getStatusCode', '_getRedirectUrl', '_getRenderData', '_getRenderView'] },
  ],
  'import/no-named-as-default': 'off',
  'import/prefer-default-export': 'off',
  'import/extensions': 'off',
  'implicit-arrow-linebreak': 'off',
  'import/no-extraneous-dependencies': [
    'error',
    { devDependencies: ['**/*.test.{js,ts}', '**/*.api-test.{js,ts}', '**/*.spec.{js,ts}', '**/webpack.*.{js,ts}', '**/api-test*/**', '**/__mocks__/**'] },
  ],
  'object-curly-newline': ['error', {
    consistent: true,
  }],
  'no-restricted-syntax': 'off',
  'no-use-before-define': [
    'error',
    {
      functions: false,
    },
  ],
};

module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    jest: true,
    browser: true,
  },
  root: true,
  rules: baseRules,
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  ignorePatterns: ['**/node_modules/**', '**/public/**'],
  parserOptions: baseParserOptions,
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended-type-checked',
        'prettier',
      ],
      plugins: [
        '@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ...baseParserOptions,
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
<<<<<<< Updated upstream
      rules: baseRules,
=======
    },
    {
      files: ['*.{j,t}s'],
      plugins: ['prettier'],
      rules: {
        'prettier/prettier': 'error',
        'class-methods-use-this': 'off',
        'max-len': [
          'error',
          160,
          2,
          {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
          },
        ],
        'import/no-unresolved': 'error',
        'no-console': ['error', { allow: ['info', 'error'] }],
        'no-underscore-dangle': ['error', { allow: ['_id', '_csrf'] }],
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: ['**/*.test.js', '**/*.spec.js', '**/webpack.*.js', '**/**api-test**', '**/__mocks__/**'],
          },
        ],
        'import/no-named-as-default': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'implicit-arrow-linebreak': 'off',
        'comma-dangle': 'off',
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'no-loop-func': 'off',
        'no-unused-vars': ['error'],
        'object-curly-newline': [
          'error',
          {
            consistent: true,
          },
        ],
        'no-restricted-syntax': 'off',
        'no-await-in-loop': 'off',
        'no-use-before-define': [
          'error',
          {
            functions: false,
          },
        ],
      },
>>>>>>> Stashed changes
    },
  ],
};
