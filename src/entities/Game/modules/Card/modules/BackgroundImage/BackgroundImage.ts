import { TCardOrientation } from 'entities/Game/types/card';

type TBackgroundImage = {
  src: string;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  x: number;
  y: number;
  orientation?: TCardOrientation;
  isCenter?: boolean;
};

// TODO Добавить ресайз
export class BackgroundImage {
  private readonly x: number;
  private readonly y: number;
  private readonly width: number;
  private readonly height: number;
  private readonly rotate: number;
  private readonly src: string;
  private readonly image: HTMLImageElement;
  private readonly ctx: CanvasRenderingContext2D;

  constructor({ ctx, src, ...props }: TBackgroundImage) {
    const { x, y, width, height, rotate } = BackgroundImage.calcSizes(props);
    this.ctx = ctx;
    this.src = src;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.rotate = rotate;
    this.image = new Image();
    this.image.src = this.src;
  }

  private static calcSizes({
    x,
    y,
    width,
    height,
    isCenter,
    orientation,
  }: Omit<TBackgroundImage, 'ctx' | 'src'>) {
    if (!isCenter) {
      return {
        width,
        height,
        x,
        y,
        rotate: 0,
      };
    }
    if (orientation === TCardOrientation.Top) {
      return {
        width: width * 0.8,
        height: width * 0.8,
        x: x + width * 0.1,
        y: height * 0.25,
        rotate: 0,
      };
    }
    if (orientation === TCardOrientation.Right) {
      return {
        width: height * 0.8,
        height: height * 0.8,
        x: x + width * 0.3,
        y: y + height * 0.1,
        rotate: 90,
      };
    }
    if (orientation === TCardOrientation.Bottom) {
      return {
        width: width * 0.8,
        height: width * 0.8,
        x: x + width * 0.1,
        y: y + height * 0.3,
        rotate: 0,
      };
    }
    if (orientation === TCardOrientation.Left) {
      return {
        width: height * 0.8,
        height: height * 0.8,
        x: height * 0.7 - height,
        y: y + width * 0.5,
        rotate: -90,
      };
    }
    return {
      width: height * 0.6,
      height: height * 0.6,
      x: height * 0.2,
      y: width * 0.2,
      rotate: 0,
    };
  }

  render() {
    if (this.rotate) {
      this.ctx.save();
      this.ctx.translate(this.x + this.width, this.y);
      this.ctx.rotate((this.rotate * Math.PI) / 180);
      this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
      this.ctx.restore();
    } else {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  async load(): Promise<void> {
    return new Promise((resolve) => {
      this.image.onload = () => {
        resolve();
      };
      this.image.onerror = () => {
        throw new Error('Ошибка загрузки ресурсов');
      };
    });
  }
}
