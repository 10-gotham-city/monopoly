import { AppBar, Box, Container, Link, Toolbar, styled } from '@mui/material';
import { ReactNode, memo } from 'react';

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
  background-color: ${(props) => props.theme.palette.background.default};
`;

const ToolbarWrapper = styled(Toolbar)`
  background-color: ${(props) => props.theme.palette.background.paper};
`;

const LogoLink = styled(Link)`
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.text.primary};
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
            <LogoLink href={routes.home} variant="h6" underline="none">
              Монополия
            </LogoLink>

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
