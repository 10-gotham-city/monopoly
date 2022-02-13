import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';

import { file, svg, url } from '../loaders';

export default ({ isCopyStatic = true } = {}) =>
  (webpackConfig: webpack.Configuration) => {
    webpackConfig.module?.rules?.push(file.ssr, svg.ssr, url);

    if (isCopyStatic) {
      webpackConfig.plugins?.push(
        new CopyWebpackPlugin({
          patterns: [
            { from: './www/favicons', to: 'favicons' },
            { from: './www/robots.txt', to: '' },
          ],
        }),
      );
    }

    return webpackConfig;
  };
