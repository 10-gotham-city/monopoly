import { TRect } from 'entities/Game/types/rect';

type TDrawRect = TRect & {
  color?: string
  rotate?: number
};

export function drawFillRect({
  ctx, x, y, width, height, color, rotate,
}: TDrawRect) {
  if (color) {
    ctx.fillStyle = color;
  }
  if (rotate) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  } else {
    ctx.fillRect(x, y, width, height);
  }
}
