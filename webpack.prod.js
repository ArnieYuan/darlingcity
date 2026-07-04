const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.ts',
        edit: './src/edit.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'auto',
        filename: '[name].[contenthash].js',
        clean: true, // Clean the output directory before emit
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            declaration: false
                        }
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.md$/,
                type: 'asset/source',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vanroll: {
                    test: /[\\/]node_modules[\\/]@ArnieYuan[\\/]vanroll_app[\\/]/,
                    name: 'vanroll',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'DarlingCity',
            template: './src/index.html',
            chunks: ['vanroll', 'main'],
        }),
        new HtmlWebpackPlugin({
            title: 'Edit ActivityScript',
            template: './src/edit.html',
            filename: 'edit/index.html',
            chunks: ['vanroll', 'edit'],
        }),
    ],
};
