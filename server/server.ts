import express from 'express';

const app = express();

app.use(express.static(`${__dirname}/dist`));

app.get('*', (_, response) => {
  response.sendFile(`${__dirname}/dist/index.html`);
});

export { app };
