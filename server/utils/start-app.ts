import { Express } from 'express';
import Loadable from 'react-loadable';

interface Options {
  server: Express;
}

const { PORT = 3000 } = process.env;

const APP_HOSTS: string[] = ['localhost'];

export async function startApp({ server }: Options) {
  await Loadable.preloadAll().then(() => {
    server.listen(PORT, () => {
      console.log(`App on http://${APP_HOSTS[0]}:${PORT}`);
    });
  });
}
