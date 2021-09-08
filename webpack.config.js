const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  devServer: {
    contentBase: './dist',
    // watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '../fonts/[name].[ext]',
            publicPath: './',
          },
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/bundle.css',
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: 'index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/images/icons/favicon-512.png'),
      prefix: '',
      publicPath: '../favicons',
      outputPath: path.resolve(__dirname, 'dist/favicons'),
      inject: (htmlPlugin) => path.basename(htmlPlugin.options.filename) === 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/media/sounds', to: '../media/sounds' },
        // { from: 'src/fonts/', to: '../fonts/' },
      ],
    }),
  ],
};
