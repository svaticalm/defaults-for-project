module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-shadow': ['error', { allow: ['state', 'getters', 'params'] }],
        'max-len': ['error', { code: 150, ignoreStrings: true, ignoreComments: true }],
        'prefer-destructuring': ['error', { object: false, array: false }],
        'no-param-reassign': ['error', { ignorePropertyModificationsFor: ['field'] }],
        'no-restricted-syntax': ['error', 'off'],
        'guard-for-in': 'off',
        'import/no-cycle': 'off',
        'arrow-body-style': 0,
        indent: ['error', 4],
    },
};
