const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'static/images/[name][ext]',
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, 'src/pages/'),
      features: path.resolve(__dirname, 'src/features/'),
      entities: path.resolve(__dirname, 'src/entities/'),
      shared: path.resolve(__dirname, 'src/shared/'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|jpg|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: './static/assets/', to: './' }],
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
