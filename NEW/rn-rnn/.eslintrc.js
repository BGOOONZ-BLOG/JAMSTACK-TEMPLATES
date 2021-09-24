module.exports = {
  extends: ['wesbos'],
  rules: {
    'no-console': 2,
    'no-shadow': 0,
    'react/destructuring-assignment': 0,
    camelcase: 0,
    'no-param-reassign': 0,
    'no-case-declarations': 0,
    'no-useless-escape': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
}
