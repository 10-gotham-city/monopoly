import { CanvasElement } from 'entities/game-engine/modules';
import { theme } from 'entities/game-engine/setting';
import { TOrientation, TPosition, TRect } from 'entities/game-engine/types';
import { TCanvasTextAlign, degreeToRad, strokeText } from 'entities/game-engine/utils';

export type TTemplateTitle = TRect & {
  text: string;
  shift: number;
  position: TPosition;
  orientation: TOrientation;
};

/**
 * Отрисовка текста в карточках
 */
export class TemplateText extends CanvasElement {
  private static readonly CONST = {
    // Размеры относительно карточки
    CENTER: 0.5,
    WIDTH: 0.8,
    // Вращение
    ROTATE: {
      RIGHT: 90,
      LEFT: -90,
    },
    // Сдвиг текста относительно базовой линии
    FONT_SHIFT: 5,
  };

  private static readonly coordinates = {
    /* eslint-disable @typescript-eslint/unbound-method */
    [TOrientation.Horizontal]: TemplateText.getHorizontalCoordinates,
    [TOrientation.Vertical]: TemplateText.getVerticalCoordinates,
    /* eslint-enable @typescript-eslint/unbound-method */
  };

  private readonly text: string;
  private readonly rotate: number;

  constructor(props: TTemplateTitle) {
    const { ctx, text } = props;
    super({ ctx });
    this.text = text;
    const { rotate, ...size } = TemplateText.getCoordinates(props);
    this.rotate = rotate;
    this.setSize(size);
  }

  render() {
    strokeText({
      x: this.x,
      y: this.y,
      color: theme.color.text,
      ctx: this.ctx,
      text: this.text,
      width: this.width,
      textAlign: TCanvasTextAlign.Center,
      rotate: this.rotate,
    });
  }

  private static getHorizontalCoordinates(props: Omit<TTemplateTitle, 'orientation'>) {
    const { x, y, width, height, position, shift } = props;

    const isRight = position === TPosition.Right;
    const rotate = isRight ? TemplateText.CONST.ROTATE.RIGHT : TemplateText.CONST.ROTATE.LEFT;

    return {
      x: x + width * (isRight ? 1 - shift : shift),
      y: y + height * TemplateText.CONST.CENTER,
      width: height * TemplateText.CONST.WIDTH,
      rotate: degreeToRad(rotate),
    };
  }

  private static getVerticalCoordinates(props: Omit<TTemplateTitle, 'orientation'>) {
    const { x, y, width, height, position, shift } = props;

    const isTop = position === TPosition.Top;

    return {
      x: x + width * TemplateText.CONST.CENTER,
      y: isTop ? height * shift : y + height * (1 - shift) + TemplateText.CONST.FONT_SHIFT,
      width: width * TemplateText.CONST.WIDTH,
      rotate: 0,
    };
  }

  private static getCoordinates({ orientation, ...cardSize }: TTemplateTitle) {
    const orientationCard = orientation as TOrientation.Horizontal | TOrientation.Vertical;
    return TemplateText.coordinates[orientationCard](cardSize);
  }
}
