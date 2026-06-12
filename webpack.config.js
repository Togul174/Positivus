const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function includeHtml(content, ctx) {
    // Ищем вставки вида: <%= require ...%>
    const regex = /<%= require\(['"](.+?)['"]\) %>/g;

    // Заменяем их содержимым файла
    return content.replace(regex, (match, filePath) => {
        // Превращаем путь внутри require в полный путь к файлу
        const fullPath = path.resolve(ctx, filePath);

        if (!fs.existsSync(fullPath)) {
            console.error(`Файл не найден: ${fullPath}`);
            return '';
        }
        // Читает файл как текст
        const fileContent = fs.readFileSync(fullPath, 'utf8');

        // Вставляет файл и снова проверяет, вдруг внутри него тоже есть require
        return includeHtml(fileContent, path.dirname(fullPath));
    });
}

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
                                return includeHtml(content, loaderContext.context);
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
