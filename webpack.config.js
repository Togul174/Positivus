const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            sources: false,
                            preprocessor: (content, loaderContext) => {
                                const regex = /<%= require\(['"](.+?)['"]\) %>/g;
                                let match;
                                let result = content;

                                while ((match = regex.exec(content)) !== null) {
                                    const filePath = match[1];
                                    const fullPath = path.resolve(loaderContext.context, filePath);
                                    const fs = require('fs');
                                    let fileContent = '';

                                    if (fs.existsSync(fullPath)) {
                                        fileContent = fs.readFileSync(fullPath, 'utf8');
                                    } else {
                                        console.error(`File not found: ${fullPath}`);
                                    }

                                    result = result.replace(match[0], fileContent);
                                }

                                return result;
                            },
                        },
                    },
                ],
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
            template: './src/pages/about.html',
            filename: 'about.html',
            chunks: ['main'],
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
            ],
        }),
    ],
};