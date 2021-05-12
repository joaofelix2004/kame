const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  // plugins: {
  //   "postcss-preset-env": {
  //     browsers: "last 2 versions",
  //   },
  // },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle_[id].js",
  },

  entry: {
    index: "./src/pages/index.js",
    home: "./src/pages/home/index.js",
    sobre: "./src/pages/sobre/sobre.js",
  },
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080,
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/home/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/sobre/sobre.html",
      inject: true,
      chunks: ["sobre"],
      filename: "sobre.html",
    }),
    // new MiniCssExtractPlugin({
    //   filename: "./src/css/meus_estilos.scss",
    // }),

    // new MiniCssExtractPlugin({
    //   filename: "./src/css/[name].scss",
    //   chunkFilename: "[id].scss",
    // }),
    // new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      {
        // https://webpack.js.org/loaders/babel-loader/#root
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        // https://webpack.js.org/guides/asset-modules/#resource-assets
        test: /\.(png|jpe?g|gif|svg|jpg)$/i,
        type: "asset/resource",
      },
      {
        // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
        resourceQuery: /raw/,
        type: "asset/source",
      },
      {
        // https://webpack.js.org/loaders/html-loader/#usage
        resourceQuery: /template/,
        loader: "html-loader",
      },
    ],
  },
};
