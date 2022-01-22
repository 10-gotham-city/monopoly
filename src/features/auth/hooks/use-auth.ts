import { useGetUserQuery } from 'shared/api/auth';

const AUTHORIZED_KEY = 'authorized';

export const useAuth = () => {
  const { isLoading, data: userData } = useGetUserQuery();

  return {
    isAuthorized: Boolean(userData),
    isAuthCheckPending: isLoading,
  };
};
