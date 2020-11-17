const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const port = process.env.PORT || 8080;

module.exports = {
  devtool: "inline-source-map",
  mode: "development",
  entry: { app: ["babel-polyfill", "./src/index"] },
  resolve: { extensions: [".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new Dotenv({
      path: "./.env",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    host: "localhost",
    historyApiFallback: true,
    port: port,
    hot: true,
  },
};
