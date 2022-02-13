import { config } from 'dotenv';
import flow from 'lodash.flow';
import { join } from 'path';
import webpack from 'webpack';

import { ROOT_DIR_FROM_WEBPACK } from '../assets/dir';
import { initServerConfig, loadAssets, loadScripts, loadStyles } from '../settings';

const cfg = require('../../lib/cfg').default;

config();

function getConfig(lang: string): webpack.Configuration {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return flow([
    initServerConfig({
      entry: {
        app: join(ROOT_DIR_FROM_WEBPACK, 'client', 'bundles', 'index.ts'),
      },
      lang,
    }),
    loadScripts({ isSSR: true }),
    loadStyles({ isSSR: true }),
    loadAssets({ isCopyStatic: false }),
  ])({});
}

export default cfg.langs.map(getConfig);
