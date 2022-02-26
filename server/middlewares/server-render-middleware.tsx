import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import { App } from '../../src/app';

const getHtml = (reactHtml: string) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </head>
    <body>
      <div id="root">${reactHtml}</div>
      <script src="main.js"></script>
    </body>
  </html>
  `;

export const serverRenderMiddleware = (req: Request, res: Response) => {
  const jsx = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const reactHtml = renderToString(jsx);

  res.status(200).send(getHtml(reactHtml));
};
