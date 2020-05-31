const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const package = require('./package.json');

module.exports = {
    mode: 'development',

    devtool: 'eval-source-map',

    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './src/main.js'
    ],

    output: {
        path      : path.join(__dirname, '/public/static/build'),
        filename  : 'build.js',
        publicPath: '/static/build/'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitWarning: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            },
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(otf|eot|ttf|ttc|woff|woff2|jpe?g|png|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 24000
                        }

                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack'
                    }
                ]
            }
        ]
    },

    optimization: {
        minimize: process.env.NODE_ENV === 'production',
        minimizer: [
            new TerserJSPlugin({
                extractComments: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './etc/index.html',
            chunksSortMode: 'none',
            preload: ['*.css', '*.js'],
            filename: '../../index.html',
            title: package.name
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        })
    ],
}