import { TCardOrientation, TCardPosition } from 'entities/Game/types/card';

type TBackgroundImage = {
  src: string;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  x: number;
  y: number;
  position?: TCardPosition;
  orientation?: TCardOrientation;
  isCenter?: boolean;
};

// TODO Добавить ресайз
/**
 * Отрисовка изображений в карточке
 */
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
    position,
    orientation,
  }: Omit<TBackgroundImage, 'ctx' | 'src'>) {
    if (!isCenter) {
      return { width, height, x, y, rotate: 0 };
    }

    if (orientation === TCardOrientation.Horizontal) {
      return {
        width: height * 0.8,
        height: height * 0.8,
        x: position === TCardPosition.Right ? x + width * 0.3 : height * 0.7 - height,
        y: position === TCardPosition.Right ? y + height * 0.1 : y + width * 0.5,
        rotate: position === TCardPosition.Right ? 90 : -90,
      };
    }
    if (orientation === TCardOrientation.Vertical) {
      return {
        width: width * 0.8,
        height: width * 0.8,
        x: x + width * 0.1,
        y: position === TCardPosition.Top ? height * 0.25 : y + height * 0.3,
        rotate: 0,
      };
    }

    return {
      width: width * 0.6,
      height: width * 0.6,
      x: width * 0.2,
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
