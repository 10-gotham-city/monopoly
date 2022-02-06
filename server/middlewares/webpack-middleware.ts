import { RequestHandler } from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

export const getWebpackMiddlewares = (config: webpack.Configuration): RequestHandler[] => {
  const compiler = webpack({ ...config, mode: 'development' });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [
    devMiddleware(compiler, {
      publicPath: config.output!.publicPath!,
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    hotMiddleware(compiler, { path: `/__webpack_hmr` }),
  ];
};
