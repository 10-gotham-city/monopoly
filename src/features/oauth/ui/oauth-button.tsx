import { LoadingButton } from '@mui/lab';

import { useOauth } from '../hooks';

export const OauthButton = () => {
  const { isLoading, onClick } = useOauth();

  return (
    <LoadingButton variant="contained" color="secondary" loading={isLoading} onClick={onClick}>
      Войти через Яндекс
    </LoadingButton>
  );
};
