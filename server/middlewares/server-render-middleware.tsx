import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';

import { App } from '../../src/app';
import { getInitialState, initStore } from '../../src/app/store';

const getHtml = (reactHtml: string, reduxState = {}) => {
  const helmet = Helmet.renderStatic();
  return `
  <!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    </head>
    <body>
      <div id="root">${reactHtml}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}</script>
      <script src="main.js"></script>
    </body>
  </html>
  `;
};

export const serverRenderMiddleware = (req: Request, res: Response) => {
  const store = initStore(getInitialState());

  const jsx = (
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const reactHtml = renderToString(jsx);
  const reduxState = store.getState();

  res.status(200).send(getHtml(reactHtml, reduxState));
};
