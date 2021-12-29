import { drawText, TCanvasTextAlign } from 'entities/Game/utils/drawText';
import { TCardOrientation } from 'entities/Game/types/card';
import { theme } from 'entities/Game/setting/theme';
import { TRect } from 'entities/Game/types/rect';

export type TTemplateTitle = TRect & {
  text: string;
  shift: number;
  orientation: TCardOrientation;
};

export class TemplateText {
  text: string;

  ctx: CanvasRenderingContext2D;

  x: number;

  shift: number;

  y: number;

  width: number;

  rotate: number;

  constructor(props: TTemplateTitle) {
    const { ctx, text, orientation, shift, ...size } = props;
    this.text = text;
    this.ctx = ctx;
    this.shift = shift;
    const { x, y, width, rotate } = this.getCoordinates({ ...size, orientation });
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

  private getCoordinates(props: Omit<TRect, 'ctx'> & { orientation: TCardOrientation }) {
    const { x, y, width, height, orientation } = props;

    if (orientation === TCardOrientation.Top) {
      return {
        x: x + width * 0.5,
        y: height * this.shift,
        width: width * 0.8,
        rotate: 0,
      };
    }
    if (orientation === TCardOrientation.Right) {
      return {
        x: x + width * (1 - this.shift),
        y: y + height * 0.5,
        width: height * 0.8,
        rotate: 90,
      };
    }
    if (orientation === TCardOrientation.Bottom) {
      return {
        x: x + width * 0.5,
        y: y + height * (1 - this.shift) + 5,
        width: width * 0.8,
        rotate: 0,
      };
    }
    return {
      x: x + width * this.shift,
      y: y + height * 0.5,
      width: height * 0.8,
      rotate: -90,
    };
  }
}
