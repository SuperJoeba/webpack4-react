const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // 压缩插件js
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 压缩插件css
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 打包时删除旧的dist
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 打包结果分析
const CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
    entry: [path.resolve(__dirname, './src/app.js')],

    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    },

    module: {
        rules: [
            // 处理html模板文件
            {
                test: /\.html/,
                loader: 'html-loader'
            },
            // 处理css文件
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ]
                                })
                            ]
                        }
                    }
                ]
            },
            // 处理sass文件
            {
                test: /\.scss/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ]
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 1024
                    }
                }
            },
            // 处理ES6及jsx
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                include: path.resolve(__dirname, 'src'),
                options: {
                    compact: true // 去掉换行和空格
                }
            }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './public/index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8998,
            generateStatsFile: true,
            statsOptions: { source: false }
        }),
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: "gzip",
            test: /\.js$|\.css$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],

    // 性能监测
    performance: {
        hints: "warning"
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    }
                }
            })
        ]
    }
}