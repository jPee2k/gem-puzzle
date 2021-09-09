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
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist/'),
  },
  devServer: {
    contentBase: '../dist',
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
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.s[ac]ss$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        parser: { dataUrlCondition: { maxSize: 8192 } },
        generator: {
          filename: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css',
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: 'index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/images/icons/favicon-512.png'),
      prefix: '',
      publicPath: 'images/favicons',
      outputPath: path.resolve(__dirname, 'dist/images/favicons'),
      inject: (htmlPlugin) => [
        'index.html',
      ].includes(path.basename(htmlPlugin.options.filename)),
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/media/sounds', to: 'media/sounds' },
      ],
    }),
  ],
};
