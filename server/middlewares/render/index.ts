import cfg from '../../../lib/cfg';
import hot from './hot';
import render from './render';

// eslint-disable-next-line prettier/prettier

/* eslint-disable global-require */
export default cfg.render && cfg.render.isHot ? hot : render;
/* eslint-enable global-require */
