import { useEffect, useRef } from 'react';
import { UserProfile } from 'widgets/user-profile';

import { GameEngine } from 'features/game-engine';

import { BaseLayout } from 'shared/ui/layouts';

export const GamePage = () => {
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
      <canvas
        ref={canvasEl}
        width={1000}
        height={1000}
        style={{
          marginLeft: 50,
          marginTop: 100,
        }}
      />
    </BaseLayout>
  );
};
