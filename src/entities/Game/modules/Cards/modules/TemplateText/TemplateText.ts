import { drawText, TCanvasTextAlign } from 'entities/Game/utils/drawText';
import { TCardOrientation, TCardPosition } from 'entities/Game/types/card';
import { theme } from 'entities/Game/setting/theme';
import { TRect } from 'entities/Game/types/rect';

export type TTemplateTitle = TRect & {
  text: string;
  shift: number;
  position: TCardPosition;
  orientation: TCardOrientation;
};

type TGetCoordinates = Omit<TRect, 'ctx'> & {
  position: TCardPosition;
  orientation: TCardOrientation;
};

/**
 * Отрисовка текста в карточках
 */
export class TemplateText {
  text: string;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  rotate: number;
  shift: number;

  constructor(props: TTemplateTitle) {
    const { ctx, text, position, orientation, shift, ...size } = props;
    this.text = text;
    this.ctx = ctx;
    this.shift = shift;
    const { x, y, width, rotate } = this.getCoordinates({ ...size, position, orientation });
    this.x = x;
    this.y = y;
    this.width = width;
    this.rotate = rotate;
  }

  render() {
    drawText({
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

  private getCoordinates({ x, y, width, height, orientation, position }: TGetCoordinates) {
    if (orientation === TCardOrientation.Vertical) {
      return {
        x: x + width * 0.5,
        y: position === TCardPosition.Top ? height * this.shift : y + height * (1 - this.shift) + 5,
        width: width * 0.8,
        rotate: 0,
      };
    }
    return {
      x: x + width * (position === TCardPosition.Right ? 1 - this.shift : this.shift),
      y: y + height * 0.5,
      width: height * 0.8,
      rotate: position === TCardPosition.Right ? 90 : -90,
    };
  }
}
