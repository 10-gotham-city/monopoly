import { LoadingButton } from '@mui/lab';

import { useOauthClientId } from '../../hooks';

export const OauthButton = () => {
  const { isLoading, onClick } = useOauthClientId();

  return (
    <LoadingButton variant="contained" color="secondary" loading={isLoading} onClick={onClick}>
      Войти через Яндекс
    </LoadingButton>
  );
};
