import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { ENVS } from '../assets/env';

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: ENVS.__DEV__,
    importLoaders: 1,
    modules: {
      localIdentName: ENVS.__DEV__ ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
    },
  },
};

const cssLoaders = [MiniCssExtractPlugin.loader, cssLoader];

export default {
  client: {
    test: /\.css$/,
    exclude: /node_modules/,
    use: cssLoaders,
  },
  ssr: {
    test: /\.css$/,
    loader: 'null-loader',
  },
};
