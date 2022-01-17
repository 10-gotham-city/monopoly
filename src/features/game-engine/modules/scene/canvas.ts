import { CanvasElement } from 'features/game-engine/modules';

type TCanvasEvents = {
  mouseout: () => void;
  mousemove: (e: MouseEvent) => void;
  click: (e: MouseEvent) => void;
};

export class Canvas extends CanvasElement {
  private isHover: boolean;
  private readonly top: number;
  private readonly left: number;
  private readonly canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = Canvas.getContext(canvas);
    const { height, width } = Canvas.getSizeElement(canvas);
    super({ ctx, width, height });

    this.isHover = false;
    this.canvas = canvas;
    const { top, left } = this.canvas.getBoundingClientRect();
    this.top = top + window.scrollY;
    this.left = left + window.scrollX;
  }

  // TODO remove event
  addEventListeners(events: TCanvasEvents) {
    Object.entries(events).forEach(([type, listener]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      this.canvas.addEventListener(type, listener);
    });
  }

  private static getSizeElement(canvas: HTMLCanvasElement) {
    const { width, height } = canvas.getBoundingClientRect();
    return { width, height };
  }

  private static getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
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
