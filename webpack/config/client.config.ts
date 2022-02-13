import { config } from 'dotenv';
import flow from 'lodash.flow';
import webpack from 'webpack';

import { initClientConfig, loadAssets, loadScripts, loadStyles } from '../settings';

const cfg = require('../../lib/cfg').default;

config();

function getConfig(lang: string, index: number): webpack.Configuration {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return flow([
    initClientConfig({ lang, index }),
    loadScripts({ isSSR: false }),
    loadStyles({ isSSR: false }),
    loadAssets({ isCopyStatic: false }),
  ])({});
}

export default cfg.langs.map(getConfig);
