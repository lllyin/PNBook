/**
 *  created by ling on 2017-12-6 15:10.
 */
var path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// Create multiple instances
const extractCSS = new ExtractTextPlugin('css/[name]-one.css');
const extractLESS = new ExtractTextPlugin('css/[name]-two.css');
const extractSCSS = new ExtractTextPlugin('css/[name]-three.css');

module.exports = {
    entry: {
        home:'./src/index.js',
        react: ['react']
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'js/bundle.js',
    },
    devServer: {
        contentBase: "./build",  //以public为根目录提供文件
        historyApiFallback: true,
        inline: true,
        proxy: {
            '/api/server/*': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                pathRewrite:{
                    '^/api/server':''
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            // query: {
            //     presets: ['es2015', 'react'],
            //     plugins: ["transform-decorators-legacy","transform-object-rest-spread"]
            // }
        }, {
            test: /\.css$/,
            use: extractCSS.extract({
                fallback: "style-loader",
                use:['css-loader']
            })
        }, {
            test: /\.scss$/,
            use: extractSCSS.extract({
                fallback: "style-loader",
                use: ['css-loader', 'sass-loader']
            })
        }, {
            test: /\.(png|jpg)$/,
            use: 'url?limit=25000'
        }]
    },
    plugins: [
        extractCSS,
        extractLESS,
        extractSCSS,
        new webpack.optimize.CommonsChunkPlugin({
            name: "react",
            // ( 公共chunk(commnons chunk) 的名称)

            filename: "js/react.js",
            // ( 公共chunk 的文件名)

            minChunks: Infinity,
            // (模块必须被3个 入口chunk 共享)
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: true
            }
        }),
        // new UglifyJSPlugin({
        //     test: /\.js($|\?)/i,
        //     sourceMap: true,
        //     uglifyOptions: {
        //         compress: true
        //     }
        // }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new HtmlWebpackPlugin({
            title:"PNBook",
            filename:"index.html",
            template:"./src/template/box.html",
            hash:true,
            cache:true,
            minify:false
        })
    ]
};

