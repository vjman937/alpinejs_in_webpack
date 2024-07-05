const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

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
    //文件拷贝插件，后续把本地路径改为URL路径
    //该插件建议最后执行，防止被前面的插件影响
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "html"),
          to: path.resolve(__dirname, "lklhj", "html"),
          toType: 'dir'
        },
        {
          from: path.resolve(__dirname, "src", "weblogic"),
          to: path.resolve(__dirname, "lklhj", "weblogic"),
          toType: 'dir'
        },
        {
          from: path.resolve(__dirname, "dist", "js"),
          to: path.resolve(__dirname, "lklhj", "js"),
          toType: 'dir'
        },
        {
          from: path.resolve(__dirname, "dist", "css"),
          to: path.resolve(__dirname, "lklhj", "css"),
          toType: 'dir'
        },
        {
          from: path.resolve(__dirname, "dist", "index.html"),
          to: path.resolve(__dirname, "lklhj/html", "index.html"),
        }
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
