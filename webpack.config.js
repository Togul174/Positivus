const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');  // ← добавить

module.exports = {
    mode: 'development',
    entry: './src/js/main.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contenthash].js',
        clean: true,
    },

    devServer: {
        static: './dist',
        hot: true,
        open: true,
        port: 3000,
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[hash][ext]',
                },
            },
        ],
    },

    plugins: [

        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main'],
        }),

        new HtmlWebpackPlugin({
            template: './src/about.html',
            filename: 'about.html',
            chunks: ['main'],
        }),
        
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),

        new CopyWebpackPlugin({
            patterns: [
                                { 
                    from: 'src/assets/images', 
                    to: 'assets/images'  
                }
            ]
        }),
    ],
};