import express from 'express';

import { clientConfig } from '../webpack';
import { getWebpackMiddlewares, serverRenderMiddleware } from './middlewares';

const app = express();

app.use(express.static(`${__dirname}/dist`));

app.get('*', [...getWebpackMiddlewares(clientConfig)], serverRenderMiddleware);

export { app };
