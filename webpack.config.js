
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const libraryName = 'fedex-assessment';
const outputFile = `${libraryName}.min.js`;


module.exports = {
    entry: './src/index.js',
    output: {
        library: libraryName,
        libraryTarget: 'umd',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'dist'),
        filename: outputFile,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 20000, // Convert images < 8kb to base64 strings
                        name: 'img/[hash]-[name].[ext]',
                    },
                }],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static' }
            ]
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};