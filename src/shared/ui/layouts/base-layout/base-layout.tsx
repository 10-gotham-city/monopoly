import { AppBar, Box, Container, Toolbar, Typography, styled } from '@mui/material';
import { ReactNode, memo } from 'react';

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LogoTypography = styled(Typography)`
  text-transform: uppercase;
`;

const AppBarInner = styled(Box)`
  display: flex;
  align-items: center;
`;

const ContentWrapper = styled(Box)`
  display: flex;
  flex: 1;
`;

type Props = {
  appBarStartContent?: JSX.Element;
  appBarEndContent?: JSX.Element;
  children: ReactNode;
};

export const BaseLayout = memo(({ appBarStartContent, appBarEndContent, children }: Props) => (
  <Wrapper>
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="xl">
          <AppBarInner>
            <LogoTypography variant="h6">Монополия</LogoTypography>

            {appBarStartContent && (
              <Box ml={3} mr="auto">
                {appBarStartContent}
              </Box>
            )}

            {appBarEndContent && <Box ml="auto">{appBarEndContent}</Box>}
          </AppBarInner>
        </Container>
      </Toolbar>
    </AppBar>

    <ContentWrapper>
      <Container maxWidth="xl">{children}</Container>
    </ContentWrapper>
  </Wrapper>
));
