module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
    },
    plugins: [
        'react',
    ],
    rules: {
        indent: [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'windows',
        ],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'never',
        ],
        'no-console': 0,
    },
}
