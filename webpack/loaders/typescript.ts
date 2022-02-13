import keysTransformer from 'ts-transformer-keys/transformer';
import ts from 'typescript';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';
import webpack from 'webpack';

import { ENVS } from '../assets/env';

const client: webpack.RuleSetRule = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: [
    ENVS.__DEV__ && {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        plugins: ['react-hot-loader/babel'],
      },
    },
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        getCustomTransformers: (program: ts.Program) => ({
          before: [createStyledComponentsTransformer(), keysTransformer(program)],
        }),
      },
    },
  ].filter(Boolean) as webpack.RuleSetUseItem[],
};

const ssr: webpack.RuleSetRule = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  loader: 'ts-loader',
  options: {
    transpileOnly: true,
  },
};

export default {
  client,
  ssr,
};
