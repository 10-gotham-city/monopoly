import { Scene } from 'entities/Game/modules/Scene/Scene';
import { useEffect, useRef } from 'react';

export const GamePage = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function initCanvas() {
      if (canvasEl.current) {
        await Scene.init(canvasEl.current);
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
