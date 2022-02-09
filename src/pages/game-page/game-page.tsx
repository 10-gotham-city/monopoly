import { useEffect, useRef } from 'react';
import { useFullScreenHandle } from 'react-full-screen';
import { UserProfile } from 'widgets/user-profile';

import { GameEngine } from 'entities/game-engine';

import { FullscreenButton, FullscreenWrapper } from 'shared/ui/components';
import { BaseLayout } from 'shared/ui/layouts';

export const GamePage = () => {
  const handleFullscreen = useFullScreenHandle();
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function initCanvas() {
      if (canvasEl.current) {
        await GameEngine.init(canvasEl.current);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    initCanvas();
  }, []);

  return (
    <BaseLayout appBarEndContent={<UserProfile />}>
      <FullscreenButton handleFullscreen={handleFullscreen} />
      <FullscreenWrapper handleFullscreen={handleFullscreen}>
        <canvas
          ref={canvasEl}
          width={1000}
          height={1000}
          style={{
            marginLeft: 50,
            marginTop: 100,
          }}
        />
      </FullscreenWrapper>
    </BaseLayout>
  );
};
