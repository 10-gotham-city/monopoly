import { ButtonStartGame } from 'entities/home';

import { BaseLayout } from 'shared/ui/layouts';

// TODO `проверка авторизации через Redux store`

export const HomePage = () => (
  <BaseLayout>
    <ButtonStartGame isAuthorized />
  </BaseLayout>
);
