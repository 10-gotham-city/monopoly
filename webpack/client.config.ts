import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack, { Configuration, Entry } from 'webpack';

import { DIST_DIR, IS_DEV, SRC_DIR } from './env';
import { cssLoader, fileLoader, jsLoader } from './loaders';

export const clientConfig: Configuration = {
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    publicPath: '/',
  },
  entry: [
    IS_DEV && 'react-hot-loader/patch',
    IS_DEV && 'webpack-hot-middleware/client',
    IS_DEV && 'css-hot-loader/hotModuleReplacement',
    path.join(SRC_DIR, 'index'),
  ].filter(Boolean) as Entry,
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      pages: path.resolve(__dirname, `${SRC_DIR}/pages/`),
      features: path.resolve(__dirname, `${SRC_DIR}/features/`),
      shared: path.resolve(__dirname, `${SRC_DIR}/shared/`),
      widgets: path.resolve(__dirname, `${SRC_DIR}/widgets/`),
      entities: path.resolve(__dirname, `${SRC_DIR}/entities/`),
    },
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [jsLoader.client, cssLoader.client, fileLoader.client],
  },
};
