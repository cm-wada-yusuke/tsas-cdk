const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        index: './src/tsas-cdk.ts',
        initialize: './src/tsas-cdk-initialize.ts',
        param: './src/tsas-cdk-param.ts',
        default: './src/default.ts',
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    mode: 'production',
    devtool: 'inline-source-map',
    externals: [nodeExternals()],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname + '/dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/assets',
            },
            // FIXME いらない
            {
                from: './package.json',
            },
        ]),
    ],
};
