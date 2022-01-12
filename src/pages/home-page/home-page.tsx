import { BaseLayer } from 'shared/ui/layers';
import { ButtonStartGame } from 'entities/home';

// TODO `проверка авторизации через Redux store`

export const HomePage = () => (
  <BaseLayer>
    <ButtonStartGame isAuthorized />
  </BaseLayer>
);
