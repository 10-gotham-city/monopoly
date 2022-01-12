import { Box, Button, CardMedia, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import homeMonopoly from 'shared/ui/images/home-monopoly.png';
import { memo } from 'react';
import { routes } from 'shared/config';

const BoxWrapper = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrapperImage = styled(Box)`
  width: 320px;
  height: 320px;
  position: absolute;
  left: ${({ theme }) => theme.spacing(5)};
  bottom: ${({ theme }) => theme.spacing(-4)};
  z-index: ${({ theme }) => theme.zIndex.mobileStepper};
`;

type Props = {
  isAuthorized: boolean;
};

export const ButtonStartGame = memo(({ isAuthorized }: Props) => {
  const pathTo = isAuthorized ? routes.game : routes.login;

  return (
    <BoxWrapper>
      <Box position="relative">
        <Button
          component={RouterLink}
          to={pathTo}
          variant="contained"
          size="large"
          sx={{ zIndex: (theme) => theme.zIndex.speedDial }}
        >
          Начать игру
        </Button>
        <WrapperImage>
          <CardMedia component="img" src={homeMonopoly as string} alt="" />
        </WrapperImage>
      </Box>
    </BoxWrapper>
  );
});
