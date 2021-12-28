import { drawRect } from 'entities/Game/utils/drawRect';
import { Theme } from 'entities/Game/setting/Theme';
import { TMouse } from 'entities/Game/types/card';

enum TypePosition {
  Square = 'square',
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

type CoordinatesCard = {
  position: number
  canvasSize: number
  ctx: CanvasRenderingContext2D
};

/**
 * Класс для расчета координат карточки и отрисовки обасти карточки
 * Размеры карточек расчитываются в соотношении (14 / 9*8 / 14) от размера холста
 * т.е. угловые - 14%, остальные 8%
 */
export abstract class Rect {
  hover = false;
  readonly ctx: CanvasRenderingContext2D;
  protected x = 0;
  protected y = 0;
  protected width = 0;
  protected height = 0;
  private baseSize = 0;
  private readonly typePosition: TypePosition;

  protected constructor({ position, canvasSize, ctx }: CoordinatesCard) {
    this.typePosition = Rect.getType(position);
    this.ctx = ctx;
    this.calcCoordinates(position, canvasSize);
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

  get center() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }

  private static getType(position: number): TypePosition {
    if (position % 10 === 0) {
      return TypePosition.Square;
    }
    if (position < 10 || (position > 20 && position < 30)) {
      return TypePosition.Vertical;
    }
    return TypePosition.Horizontal;
  }

  calcCoordinates(position: number, canvasSize: number) {
    this.baseSize = Math.floor(canvasSize * 0.14);
    const {
      width, height, x, y,
    } = this.getSizes(position, canvasSize);
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  getSizes(position: number, canvasSize: number) {
    if (this.typePosition === TypePosition.Vertical) {
      return this.getSizesVertical(position, canvasSize);
    }
    if (this.typePosition === TypePosition.Horizontal) {
      return this.getSizesHorizontal(position, canvasSize);
    }
    return this.getSizesSquare(position, canvasSize);
  }

  getSizesSquare(position: number, canvasSize: number) {
    const width = this.baseSize;
    const height = this.baseSize;
    const x = position === 0 || position === 30 ? 0 : canvasSize - this.baseSize;
    const y = position === 0 || position === 10 ? 0 : canvasSize - this.baseSize;
    return {
      width, height, x, y,
    };
  }

  getSizesVertical(position: number, canvasSize: number) {
    const width = Math.floor(canvasSize * 0.08);
    const height = this.baseSize;
    const baseX = this.baseSize + width * ((position % 10) - 1);
    const x = position < 10 ? baseX : canvasSize - baseX - width;
    // к угловой карточке (размер this.baseSize) прибавляем произведенние ширины на (позицию - 1)
    const y = position < 10 ? 0 : canvasSize - this.baseSize;

    return {
      width, height, x, y,
    };
  }

  getSizesHorizontal(position: number, canvasSize: number) {
    const width = this.baseSize;
    const height = Math.floor(canvasSize * 0.08);
    const x = position < 30 ? canvasSize - this.baseSize : 0;
    // к угловой карточке (размер this.baseSize) прибавляем произведенние высоты на (позицию - 1)
    const baseY = this.baseSize + height * ((position % 10) - 1);
    const y = position < 30 ? baseY : canvasSize - baseY - height;

    return {
      width, height, x, y,
    };
  }

  renderStroke() {
    drawRect({
      ...this.sizeCtx,
      color: Theme.instance.color.stroke,
    });
  }

  checkHover({ x, y }: TMouse) {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.hover = this.ctx.isPointInPath(x, y);
    return this.hover;
  }

  // TODO окрасить карточку если она у юзера
  renderUserStroke(color: string) {
    this.ctx.strokeStyle = color;
    this.ctx.rect(this.x + 1, this.y + 1, this.width, this.height);
  }
}
