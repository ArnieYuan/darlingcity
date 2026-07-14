const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');

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
            favicon: path.resolve('src/assets/icon.png'),
        }),
        new HtmlWebpackPlugin({
            title: 'Edit ActivityScript',
            template: './src/edit.html',
            filename: 'edit/index.html',
            chunks: ['vanroll', 'edit'],
            favicon: path.resolve('src/assets/icon.png'),
        }),
        new CopyPlugin({
            patterns: [
                { from: 'activities.json', to: 'activities.json' },
                { from: 'styles.css', to: 'styles.css' },
            ],
        }),
        new WebpackPwaManifest({
            inject: false,
            fingerprints: false,
            name: 'DarlingCity',
            short_name: 'DarlingCity',
            description: 'DarlingCity is an interactive early-education web application',
            background_color: '#8dd7f2',
            theme_color: '#8dd7f2',
            display: 'standalone',
            start_url: '.',
            ios: true,
            icons: [
                {
                    src: path.resolve('src/assets/icon.png'),
                    sizes: [96, 128, 192, 256, 384, 512],
                    purpose: 'any maskable',
                    ios: true
                }
            ]
        }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" ServiceWorkers to hang around
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
                {
                    // Cache Google Fonts
                    urlPattern: /^https:\/\/fonts\.googleapis\.com/,
                    handler: 'StaleWhileRevalidate',
                    options: {
                        cacheName: 'google-fonts-stylesheets',
                    },
                },
                {
                    urlPattern: /^https:\/\/fonts\.gstatic\.com/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'google-fonts-webfonts',
                        expiration: {
                            maxEntries: 30,
                            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                        },
                    },
                },
                {
                    // Cache Openmoji
                    urlPattern: /^https:\/\/unpkg\.com\/openmoji@/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'openmoji',
                        expiration: {
                            maxEntries: 20,
                            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                        },
                    },
                },
            ],
        }),
    ],
};
