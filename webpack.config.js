const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',//使用单入口，见管理输出、代码分离
    devtool: 'inline-source-map',//打包回溯错误信息，请勿在生产环境使用，见开发环境
    plugins: [
        //见管理输出
        new HtmlWebpackPlugin({
          title: 'Development',
          template: './src/index.html',
        }),
        //tailwindcss引入
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ],
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, //清理dist目录
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
        ],
    },
};