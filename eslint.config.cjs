const prettier = require('eslint-plugin-prettier');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = [
    {
        ignores: ['**/*.min.js', '**/*bootstrap*', 'static_imports/*']
    },
    ...compat.extends('prettier'),
    {
        plugins: {
            prettier
        },

        languageOptions: {
            globals: {},
            ecmaVersion: 8,
            sourceType: 'script'
        },

        rules: {
            'prettier/prettier': 'error'
        }
    }
];
