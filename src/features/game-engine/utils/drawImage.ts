import { TRect } from '../types';

type TDrawImage = TRect & {
  image: HTMLImageElement;
  rotate?: number;
};

export function drawImage({ ctx, x, y, width, height, image, rotate }: TDrawImage) {
  if (rotate) {
    ctx.save();
    ctx.translate(x + width, y);
    ctx.rotate(rotate);
    ctx.drawImage(image, 0, 0, width, height);
    ctx.restore();
  } else {
    ctx.drawImage(image, x, y, width, height);
  }
}
