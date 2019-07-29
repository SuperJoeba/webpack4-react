const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const qrcode = require('qrcode-terminal');
const os = require('os');
const localhostIp = os.networkInterfaces().en0[1].address;

module.exports = {
    entry: './src/app.js',

    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                      loader: 'css-loader',
                      options: {
                          importLoaders: 1,
                          sourceMap: true
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
                        loader: 'style-loader'
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
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/
            }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './public/index.html'),
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        compress: true,
        host: '0.0.0.0',
        // host: localhostIp,
        port: 8098,
        overlay: {
            errors: true
        },
        open: true,
        openPage: 'index',
        proxy: {
            "/api": {
              target: "https://apis.map.qq.com/ws/district/v1/list",
              changeOrigin: true, // 必填配置，否则无法正确代理
              pathRewrite: {"^/api" : ""}
            }
        },
        after () {
            // 接入移动端手机扫描浏览qrCode-terminal
            let Url = `http://${localhostIp}:${this.port}/${this.openPage}`
            qrcode.generate(Url, {small: true}, (qrcode) => {
                console.log(qrcode)
                console.log("Server is running at:" + this.port)
            })
        }
    },

    // 显示开发源码
    devtool: '#cheap-module-eval-source-map'
}