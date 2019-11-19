const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        index: './src/tsas-cdk.ts',
        param: './src/tsas-cdk-param.ts',
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
        ]),
        new webpack.DefinePlugin({
            APP_VERSION: JSON.stringify(require('./package.json').version),
            APP_NAME: JSON.stringify(require('./package.json').name),
        }),
    ],
};
