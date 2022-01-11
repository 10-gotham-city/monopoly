import { CanvasImage } from 'features/game-engine/modules';
import { TOrientation, TPosition, TRect } from 'features/game-engine/types';
import { degreeToRad } from 'features/game-engine/utils';

type TBackground = TRect & {
  src: string;
  position: TPosition;
  orientation: TOrientation;
};

type TBackgroundSize = Omit<TRect, 'ctx'> & {
  position: TPosition;
};

/**
 * Фоновое изображение карточки без цены
 */
export class Background extends CanvasImage {
  private static readonly CONST = {
    // Размеры относительно карточки
    BASE_SIZE: 0.8,
    HORIZONTAL: {
      X_RIGHT: 0.3,
      X_LEFT: 0.7,
      Y_RIGHT: 0.1,
      Y_LEFT: 0.5,
    },
    VERTICAL: {
      X: 0.1,
      Y_TOP: 0.25,
      Y_BOTTOM: 0.3,
    },
    // Вращение
    ROTATE: {
      LEFT: -90,
      RIGHT: 90,
    },
  };

  private static readonly coordinates = {
    /* eslint-disable @typescript-eslint/unbound-method */
    [TOrientation.Horizontal]: Background.getHorizontalCoordinates,
    [TOrientation.Vertical]: Background.getVerticalCoordinates,
    /* eslint-enable @typescript-eslint/unbound-method */
  };

  static async initImage({ orientation, position, ctx, src, ...sizeCard }: TBackground) {
    const orientationCard = orientation as TOrientation.Horizontal | TOrientation.Vertical;
    const size = Background.coordinates[orientationCard]({ position, ...sizeCard });
    const background = await Background.init({ ctx, src, ...size });
    return background as Background;
  }

  private static getHorizontalCoordinates({ x, y, width, height, position }: TBackgroundSize) {
    const xRight = x + width * Background.CONST.HORIZONTAL.X_RIGHT;
    const xLeft = height * Background.CONST.HORIZONTAL.X_LEFT - height;

    const yRight = y + height * Background.CONST.HORIZONTAL.Y_RIGHT;
    const yLeft = y + width * Background.CONST.HORIZONTAL.Y_LEFT;

    const isRight = position === TPosition.Right;

    const rotate = isRight ? Background.CONST.ROTATE.RIGHT : Background.CONST.ROTATE.LEFT;
    return {
      width: height * Background.CONST.BASE_SIZE,
      height: height * Background.CONST.BASE_SIZE,
      x: isRight ? xRight : xLeft,
      y: isRight ? yRight : yLeft,
      rotate: degreeToRad(rotate),
    };
  }

  private static getVerticalCoordinates({ x, y, width, height, position }: TBackgroundSize) {
    const yTop = height * Background.CONST.VERTICAL.Y_TOP;
    const yBottom = y + height * Background.CONST.VERTICAL.Y_BOTTOM;

    const isTop = position === TPosition.Top;

    return {
      width: width * Background.CONST.BASE_SIZE,
      height: width * Background.CONST.BASE_SIZE,
      x: x + width * Background.CONST.VERTICAL.X,
      y: isTop ? yTop : yBottom,
      rotate: 0,
    };
  }
}
