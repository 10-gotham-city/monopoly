import { ErrorRequestHandler, RequestHandler, Router } from 'express';

import { renderApp } from '../controllers';
import { cookieParser } from '../middlewares';

const middlewares: Array<RequestHandler | ErrorRequestHandler> = [cookieParser];

export function appRoutes(router: Router) {
  router.get('/', middlewares, renderApp);
}
