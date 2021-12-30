type TCanvasEvents = {
  [eventName in keyof Partial<HTMLElementEventMap>]: any;
};

export class Canvas {
  private isHover = false;
  private readonly top: number;
  private readonly left: number;
  private readonly x: number = 0;
  private readonly y: number = 0;
  private readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly width: number;
  readonly height: number;

  constructor(canvas: HTMLCanvasElement, events: TCanvasEvents) {
    this.canvas = canvas;
    this.ctx = Canvas.getContext(canvas);
    const { height, width } = this.getSizeElement();
    const { top, left } = this.canvas.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.top = top + window.scrollY;
    this.left = left + window.scrollX;

    this.addEventListeners(events);
  }

  // TODO remove event
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

  getPositionMouseOnCanvas(e: MouseEvent) {
    return {
      x: e.pageX - this.left,
      y: e.pageY - this.top,
    };
  }

  getSizeElement() {
    const { width, height } = this.canvas.getBoundingClientRect();
    return { width, height };
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  setCursor(isHover: boolean) {
    if (this.isHover && !isHover) {
      this.isHover = false;
      this.canvas.style.cursor = 'default';
    } else if (!this.isHover && isHover) {
      this.isHover = true;
      this.canvas.style.cursor = 'pointer';
    }
  }
}
