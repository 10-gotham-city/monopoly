import express, { Express } from 'express';

import { queryParser } from './controllers';
import { logger, render } from './middlewares';
import router from './router';

const server: Express = express();

server
  .disable('x-powered-by')
  .enable('trust proxy')
  .set('query parser', queryParser)
  .use(render)
  .use(logger)
  .use(router);

export { server };
