import { TCoordinates } from '../types';

export enum TCanvasTextAlign {
  Left = 'left',
  Right = 'right',
  Center = 'center',
  Start = 'start',
  End = 'end',
}

type TStrokeText = TCoordinates & {
  text: string;
  ctx: CanvasRenderingContext2D;
  width?: number;
  color?: string;
  textAlign?: TCanvasTextAlign;
  rotate?: number;
  font?: string;
};

export function strokeText(props: TStrokeText) {
  const { x, y, text, textAlign, ctx, color, width, rotate, font = '100 10px system-ui' } = props;
  if (rotate) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotate);
  }
  ctx.font = font;
  if (textAlign) {
    ctx.textAlign = textAlign;
  }
  if (color) {
    ctx.fillStyle = color;
  }

  if (rotate) {
    ctx.strokeText(text, 0, 0, width);
  } else {
    ctx.strokeText(text, x, y, width);
  }

  if (rotate) {
    ctx.restore();
  }
}
