import { TRect } from 'entities/Game/types/rect';

type TDrawRect = TRect & {
  color?: string
  rotate?: number
};

export function drawRect({
  ctx, x, y, width, height, color, rotate,
}: TDrawRect) {
  if (color) {
    ctx.strokeStyle = color;
  }
  if (rotate) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.strokeRect(0, 0, width, height);
    ctx.restore();
  } else {
    ctx.strokeRect(x, y, width, height);
  }
}
