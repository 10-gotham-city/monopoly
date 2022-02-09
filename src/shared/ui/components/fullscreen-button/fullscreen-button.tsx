import { Fullscreen } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';
import { useMemo } from 'react';
import { FullScreenHandle } from 'react-full-screen';

type Props = {
  handleFullscreen: FullScreenHandle;
  isClose?: boolean;
} & IconButtonProps;

export const FullscreenButton = ({ handleFullscreen, isClose, ...props }: Props) => {
  const handleClick = useMemo(
    () => (isClose ? handleFullscreen.exit : handleFullscreen.enter),
    [handleFullscreen.enter, handleFullscreen.exit, isClose],
  );

  return (
    <IconButton onClick={handleClick} {...props}>
      <Fullscreen />
    </IconButton>
  );
};
