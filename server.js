import express from 'express';

import { startApp } from './server';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(`${__dirname}/dist`));

app.get('*', function (_, response) {
  response.sendFile(`${__dirname}/dist/index.html`);
});

startApp();

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
