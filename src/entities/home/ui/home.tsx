import { Box, Button, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import homeMonopoly from 'shared/ui/images/home-monopoly.png';
import { ImageCustom } from 'shared/ui/components';
import { memo } from 'react';
import { routes } from 'shared/config';

const BoxWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const WrapperImage = styled(Box)`
  width: 320px;
  height: 320px;
  position: absolute;
  left: 48px;
  bottom: -32px;
  z-index: -1;
`;

const ImageHome = styled(ImageCustom)`
  width: 100%;
  height: auto;
`;

type Props = {
  isAuthorized: boolean;
};

export const Home = memo(({ isAuthorized }: Props) => {
  const pathTo = isAuthorized ? routes.game : routes.login;

  return (
    <BoxWrapper>
      <Box position="relative">
        <Button component={RouterLink} to={pathTo} variant="contained" size="large">
          Начать игру
        </Button>
        <WrapperImage>
          <ImageHome src={homeMonopoly as string} alt="press me" />
        </WrapperImage>
      </Box>
    </BoxWrapper>
  );
});
