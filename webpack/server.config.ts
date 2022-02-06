import path from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';

import { DIST_DIR, IS_DEV, SERVER_DIR, SRC_DIR } from './env';
import { cssLoader, fileLoader, jsLoader } from './loaders';

export const serverConfig: Configuration = {
  name: 'server',
  target: 'node',
  node: { __dirname: false },
  entry: path.join(SERVER_DIR, 'server'),
  module: {
    rules: [fileLoader.server, cssLoader.server, jsLoader.server],
  },
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: DIST_DIR,
    publicPath: '/static/',
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, `${SRC_DIR}/pages/`),
      features: path.resolve(__dirname, `${SRC_DIR}/features/`),
      shared: path.resolve(__dirname, `${SRC_DIR}/shared/`),
      widgets: path.resolve(__dirname, `${SRC_DIR}/widgets/`),
      entities: path.resolve(__dirname, `${SRC_DIR}/entities/`),
    },
    modules: ['src', 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  devtool: 'source-map',
  performance: {
    hints: IS_DEV ? false : 'warning',
  },
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],
  optimization: { nodeEnv: false },
};
