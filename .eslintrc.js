module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    env: {
        node: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['node', '@typescript-eslint'],
    parserOptions: {
        sourceType: 'module',
        project: [
          './tsconfig.base.json',
          './tsconfig.cli.json',
          './tsconfig.lib.json'
        ],
    },
    rules: {
        semi: 'off',
        '@typescript-eslint/semi': ['error'],
        '@typescript-eslint/no-use-before-define': [
            'error',
            { functions: true, classes: false, variables: true },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
                allowHigherOrderFunctions: true,
            },
        ],
    },
};
