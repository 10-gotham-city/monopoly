import { AppBar, Box, Container, Toolbar, styled } from '@mui/material';
import { ReactNode, memo } from 'react';
import { Link } from 'react-router-dom';

import { routes } from 'shared/config';
import background from 'shared/ui/images/background.jpg';

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url(${background});
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position-y: 100%;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const ToolbarWrapper = styled(Toolbar)`
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const LogoLink = styled(Link)`
  ${({ theme }) => theme.typography.h6}
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.text.primary};
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
      <ToolbarWrapper>
        <Container maxWidth="xl">
          <AppBarInner>
            <LogoLink to={routes.home}>Монополия</LogoLink>

            {appBarStartContent && (
              <Box ml={3} mr="auto">
                {appBarStartContent}
              </Box>
            )}

            {appBarEndContent && <Box ml="auto">{appBarEndContent}</Box>}
          </AppBarInner>
        </Container>
      </ToolbarWrapper>
    </AppBar>

    <ContentWrapper>
      <Container maxWidth="xl">{children}</Container>
    </ContentWrapper>
  </Wrapper>
));
