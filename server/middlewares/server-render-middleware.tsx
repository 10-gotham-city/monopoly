import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router-dom/server';

import { App } from '../../src/app';

const getHtml = (reactHtml: string) => {
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
      <script src="main.js"></script>
    </body>
  </html>
  `;
};

export const serverRenderMiddleware = (req: Request, res: Response) => {
  const jsx = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const reactHtml = renderToString(jsx);

  res.status(200).send(getHtml(reactHtml));
};
