import { IS_DEV } from '../env';

export const cssLoader = {
  client: {
    test: /\.css$/,
    use: [IS_DEV && 'css-hot-loader', 'style-loader', 'css-loader'].filter(Boolean) as string[],
  },
  server: {
    test: /\.css$/,
    loader: 'null-loader',
  },
};
