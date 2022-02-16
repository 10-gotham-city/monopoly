import { useCallback } from 'react';

import { useGetServiceIdQuery } from 'shared/api/oauth';
import { OAUTH_YANDEX, REDIRECT_URI } from 'shared/config';

export const useOauthClientId = () => {
  const { data: { service_id: serviceId } = {}, isLoading } = useGetServiceIdQuery();

  const onClick = useCallback(() => {
    if (serviceId) {
      window.location.href = `${OAUTH_YANDEX}client_id=${serviceId}&redirect_uri=${REDIRECT_URI}`;
    }
  }, [serviceId]);

  return { isLoading, onClick };
};
