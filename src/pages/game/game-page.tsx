import { Game } from 'entities/Game/modules/Game';
import { useEffect, useRef } from 'react';

export const GamePage = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function initCanvas() {
      if (canvasEl.current) {
        await Game.init(canvasEl.current);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    initCanvas();
  }, []);

  return (
    <canvas
      ref={canvasEl}
      width={1000}
      height={1000}
      style={{
        marginLeft: 50,
        marginTop: 100,
      }}
    />
  );
};
