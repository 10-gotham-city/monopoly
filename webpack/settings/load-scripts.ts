import webpack from 'webpack';

import { typescript } from '../loaders';

interface Options {
  isSSR: boolean;
}

export default ({ isSSR }: Options) =>
  (webpackConfig: webpack.Configuration) => {
    webpackConfig.module?.rules?.push(!isSSR ? typescript.client : typescript.ssr);

    return webpackConfig;
  };
