import { useCallback } from 'react';

import { useGetServiceIdQuery } from 'shared/api/oauth';
import { OAUTH_YANDEX, REDIRECT_URI } from 'shared/config';

export const useOauth = () => {
  const { data: { service_id } = {}, isLoading } = useGetServiceIdQuery();

  const onClick = useCallback(() => {
    if (service_id) {
      window.location.href = `${OAUTH_YANDEX}client_id=${service_id}&redirect_uri=${REDIRECT_URI}`;
    }
  }, [service_id]);

  return { isLoading, onClick };
};
