export type TCanvasElements = {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  ctx: CanvasRenderingContext2D;
};

export type TCoordinates = {
  x: number;
  y: number;
};

/**
 * Абстрактный класс элемента Canvas
 */
export abstract class CanvasElement {
  hover = false;
  readonly ctx: CanvasRenderingContext2D;
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;

  protected constructor({ x = 0, y = 0, width = 0, height = 0, ctx }: TCanvasElements) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  get center() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }

  get sizeCtx() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      ctx: this.ctx,
    };
  }

  checkHover({ x, y }: TCoordinates = { x: 0, y: 0 }) {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.hover = this.ctx.isPointInPath(x, y);
    return this.hover;
  }
}
