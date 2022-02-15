const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

let config = {
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
      widgets: path.resolve(__dirname, 'src/widgets/'),
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
        test: /\.(png|jpe?g|gif|svg)$/i,
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

module.exports = (env, argv) => {
  config.devtool = argv.mode === 'development' ? 'inline-source-map' : 'source-map';

  if (argv.mode === 'production') {
    config.plugins.push(new GenerateSW());
  }

  return config;
};
