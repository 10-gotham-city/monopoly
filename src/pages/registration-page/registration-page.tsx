import { RegistrationForm } from 'features/auth';
import { BaseLayer } from 'shared/ui/layers';
import { Box } from '@mui/material';

export const RegistrationPage = () => (
  <BaseLayer>
    <Box width={1} height={1} display="flex" alignItems="center" justifyContent="center">
      <RegistrationForm onSubmit={() => null} />
    </Box>
  </BaseLayer>
);
