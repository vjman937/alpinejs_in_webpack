const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.js", //使用单入口，见管理输出、代码分离
  devtool: "inline-source-map", //打包回溯错误信息，请勿在生产环境使用，见开发环境
  plugins: [
    //见管理输出
    new HtmlWebpackPlugin({
      title: "Development",
      template: "./src/index.html",
    }),
    //tailwindcss引入
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    //文件拷贝插件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "html"),
          to: path.resolve(__dirname, "dist", "html"),
          toType: 'dir'
        },
        {
          from: path.resolve(__dirname, "src/pic", "favicon.ico"),
          to: path.resolve(__dirname, "dist", "favicon.ico")
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true, //清理dist目录
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
};
