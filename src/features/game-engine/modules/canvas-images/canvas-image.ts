import { TRect } from '../../types';
import { CanvasElement } from '../canvas-element';
import { drawImage } from '../../utils';

type TCanvasImage = TRect & {
  src: string;
  rotate?: number;
};

/**
 * Загрузка и отрисовка изображения
 */
export class CanvasImage extends CanvasElement {
  private readonly rotate: number;
  private readonly image: HTMLImageElement;

  constructor({ src, rotate = 0, ...props }: TCanvasImage) {
    super(props);
    this.image = CanvasImage.createInstanceImage(src);
    this.rotate = rotate;
  }

  private static createInstanceImage(src: string) {
    const image = new Image();
    image.src = src;
    return image;
  }

  static async init(props: TCanvasImage) {
    const backgroundImage = new CanvasImage(props);
    await backgroundImage.load();
    return backgroundImage;
  }

  render() {
    drawImage({
      ctx: this.ctx,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      image: this.image,
      rotate: this.rotate,
    });
  }

  private async load(): Promise<void> {
    return new Promise((resolve) => {
      this.image.onload = () => {
        resolve();
      };
      this.image.onerror = () => {
        resolve();
      };
    });
  }
}
