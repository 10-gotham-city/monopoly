import { theme } from '../../setting';
import { CanvasImage } from '../canvas-images';

type TBackground = {
  canvasSize: number;
  ctx: CanvasRenderingContext2D;
};

/**
 * Фоновое изображение сцены
 */
export class Background extends CanvasImage {
  private static readonly CONST = {
    SIZE: 0.6,
  };

  static async initImage({ canvasSize, ctx }: TBackground) {
    const size = canvasSize * Background.CONST.SIZE;
    const shift = canvasSize * ((1 - Background.CONST.SIZE) / 2);

    const background = await super.init({
      x: shift,
      y: shift,
      width: size,
      height: size,
      ctx,
      src: theme.background,
    });

    return background as Background;
  }
}
