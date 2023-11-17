module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  plugins: [
    'disable',
    '@typescript-eslint',
  ],
  processor: 'disable/disable',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard',
    'standard-react',
  ],
  globals: {
  },
  rules: {
    'no-var': 1,
    'no-debugger': 2,
    'spaced-comment': 1,
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
    indent: ['error', 2],
    'max-len': [1, 80, { ignoreUrls: true, ignoreStrings: true }],
    'one-var': 1,
    'no-useless-escape': 1,
    'no-throw-literal': 1,
    '@typescript-eslint/indent': ['error', 2],
  },
  settings: {
    'eslint-plugin-disable': {
      paths: {
        '@typescript-eslint': [
          '**/server/**/*.js',
          'webpack.config.js',
        ],
      },
    },
  },
  overrides: [
    // {} is a react-ism that doesn't play nice with typescript but is
    // generally safe in this limited instance.
    {
      files: ['app/**/*.tsx'],
      rules: {
        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: true,
            types: {
              '{}': false,
            },
          },
        ],
      },
    },
    // for now, the backend is pure js, no need for typescript linting rules
      files: ['server/**/*.js'],
      settings: {
        'disable/plugins': ['@typescript-eslint'],
      },
    },
    // these type files for css modules are generated for us by a webpack
    // plugin, which does what it does and doesn't allow us to configure
    // no-semi.
    {
      files: ['app/**/*.m.css.d.ts'],
      rules: {
        semi: 0,
      },
    },
  ],
}
