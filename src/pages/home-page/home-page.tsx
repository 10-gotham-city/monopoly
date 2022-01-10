import { BaseLayer } from 'shared/ui/layers';
import { Home } from 'entities/home';

// TODO `проверка авторизации через Redux store`

export const HomePage = () => (
  <BaseLayer>
    <Home isAuthorized />
  </BaseLayer>
);
