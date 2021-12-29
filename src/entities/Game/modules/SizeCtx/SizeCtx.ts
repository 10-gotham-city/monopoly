import { TRect } from 'entities/Game/types/rect';

// TODO передалать в декоратор
export abstract class SizeCtx {
  protected x: number;

  protected y: number;

  protected width: number;

  protected height: number;

  protected ctx: CanvasRenderingContext2D;

  protected constructor({ x, y, width, height, ctx }: TRect) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  get sizeCtx() {
    return {
      width: this.width,
      height: this.height,
      x: this.x,
      y: this.y,
      ctx: this.ctx,
    };
  }
}
