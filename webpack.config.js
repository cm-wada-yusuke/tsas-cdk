const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const DtsBundleWebpack = require('dts-bundle-webpack');

module.exports = {
    entry: {
        index: './src/tsas-cdk.ts',
        initialize: './src/tsas-cdk-initialize.ts',
        param: './src/tsas-cdk-param.ts',
        default: './src/default.ts',
        'lib/index': './src/lib/tsas-parameter-manager.ts',
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
        new DtsBundleWebpack({
            name: 'tsas-cdk',
            main: path.resolve('src/lib/tsas-parameter-manager.d.ts'),
            out: path.resolve('dist/lib/index.d.ts'),
            removeSource: true,
            outputAsModuleFolder: true,
        }),
    ],
};
