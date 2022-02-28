import { Box, CircularProgress } from '@mui/material';
import { memo } from 'react';

import { Navigation } from 'widgets/navigation';

import { BaseLayout } from 'shared/ui/layouts';

type TTemplateLayoutProps = {
  children: JSX.Element;
};

type Props = {
  isLoading: boolean;
  isError: boolean;
  content: JSX.Element;
  errorContent: JSX.Element;
};

const TemplateLayout = ({ children }: TTemplateLayoutProps) => (
  <BaseLayout appBarEndContent={<Navigation />}>
    <Box
      width={500}
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="0 auto"
      pt={6}
    >
      {children}
    </Box>
  </BaseLayout>
);

export const ProfilePageTemplate = memo(({ content, errorContent, isError, isLoading }: Props) => {
  if (isLoading) {
    return (
      <TemplateLayout>
        <CircularProgress />
      </TemplateLayout>
    );
  }

  if (isError) {
    return <TemplateLayout>{errorContent}</TemplateLayout>;
  }

  return <TemplateLayout>{content}</TemplateLayout>;
});
