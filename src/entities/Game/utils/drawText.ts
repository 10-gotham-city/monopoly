export enum TCanvasTextAlign {
  Left = 'left',
  Right = 'right',
  Center = 'center',
  Start = 'start',
  End = 'end',
}

type TDrawText = {
  text: string
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  width?: number
  color?: string
  textAlign?: TCanvasTextAlign
  rotate?: number
};

export function drawText(props: TDrawText) {
  const {
    x, y, text, textAlign, ctx, color, width, rotate,
  } = props;
  if (rotate) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.font = '100 10px system-ui';
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
