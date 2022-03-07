import { startApp } from './server';

const { app } = require('./dist/server.js');

const { PORT = 3000 } = process.env;

startApp();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
