import { FullScreen, FullScreenHandle } from 'react-full-screen';

type Props = {
  children: JSX.Element | HTMLElement;
  handleFullscreen: FullScreenHandle;
};

export const FullscreenWrapper = ({ children, handleFullscreen }: Props) => (
  <FullScreen handle={handleFullscreen}>{children}</FullScreen>
);
