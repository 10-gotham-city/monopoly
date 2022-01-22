import { Box } from '@mui/material';

import { AuthorizationForm } from 'features/auth';

import { BaseLayout } from 'shared/ui/layouts';

export const AuthorizationPage = () => (
  <BaseLayout>
    <Box width={1} height={1} display="flex" alignItems="center" justifyContent="center">
      <AuthorizationForm onSubmit={() => {}} />
    </Box>
  </BaseLayout>
);
