type TCanvasEvents = Record<keyof HTMLElementEventMap, EventListenerOrEventListenerObject>;

export class Canvas {
  private readonly top: number;
  private readonly left: number;
  private readonly x: number = 0;
  private readonly y: number = 0;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly width: number;
  private readonly height: number;

  constructor(canvas: HTMLCanvasElement, events: TCanvasEvents) {
    this.canvas = canvas;
    this.ctx = Canvas.getContext(canvas);
    const { height, width } = this.getSizeElement();
    this.width = width;
    this.height = height;
    this.addEventListeners(events);
  }

  addEventListeners(events: TCanvasEvents) {
    Object.entries(events).forEach(([type, listener]) => {
      this.canvas.addEventListener(type, listener);
    });
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

  static getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      return ctx;
    }
    throw new Error('Идентификатор контекста не определён');
  }

  getSizeElement() {
    const { width, height } = this.canvas.getBoundingClientRect();
    return { width, height };
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
