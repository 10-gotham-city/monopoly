import { theme } from '../../setting';
import { CanvasElement } from '..';
import { degreeToRad } from '../../utils';
import { TCoordinates } from '../../types';

type TDice = {
  ctx: CanvasRenderingContext2D;
  start: TCoordinates;
  end: TCoordinates;
  size: number;
};

export class Dice extends CanvasElement {
  private static CONST = {
    RANDOM_VALUE_MAX: 6,
    RANDOM_ROTATE_MAX: 360,
    // Размер и координаты точек относительно размера кубика
    SIZE_DOT: 0.1,
    START_DOT: 0.2,
    CENTER_DOT: 0.5,
    END_DOT: 0.8,
  };

  value = 0;
  // Область для разброса кубика
  private readonly start: TCoordinates;
  private readonly end: TCoordinates;

  private readonly color = theme.color.dice.background;
  private rotate = 0;
  private readonly radiusDots;
  private coordinatesDots: TCoordinates[] = [];

  constructor({ ctx, start, end, size }: TDice) {
    super({
      ctx,
      width: size,
      height: size,
    });
    this.start = start;
    this.end = end;
    this.radiusDots = Math.floor(size * Dice.CONST.SIZE_DOT);
    this.roll();
  }

  static getRandomPoint(start: number, end: number) {
    const rand = start + Math.random() * (end - start);
    return Math.floor(rand);
  }

  roll() {
    const value = Math.ceil(Math.random() * Dice.CONST.RANDOM_VALUE_MAX);
    const rotate = Math.ceil(Math.random() * Dice.CONST.RANDOM_ROTATE_MAX);

    this.x = Dice.getRandomPoint(this.start.x, this.end.x);
    this.y = Dice.getRandomPoint(this.start.y, this.end.y);
    this.rotate = degreeToRad(rotate);
    this.coordinatesDots = this.calcDotsCord(value);
    this.value = value;
  }

  render() {
    // Не использую утилиту отрисовки т.к. необходимо отрисовать точки
    this.ctx.fillStyle = this.color;
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotate);
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.renderDots();
    this.ctx.restore();
  }

  private renderDots() {
    this.coordinatesDots.forEach(({ x, y }) => {
      this.renderDot(x, y);
    });
  }

  private renderDot(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radiusDots, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = theme.color.dice.dots;
    this.ctx.fill();
  }

  /**
   * Рассчитать координаты точек на кубике
   */
  private calcDotsCord(value: number) {
    const dotsCord = [];

    const start = Math.floor(this.width * Dice.CONST.START_DOT);
    const center = Math.floor(this.width * Dice.CONST.CENTER_DOT);
    const end = Math.floor(this.width * Dice.CONST.END_DOT);

    if (value === 1 || value === 3 || value === 5) {
      // центральная
      dotsCord.push({ x: center, y: center });
    }
    if (value === 2) {
      // верхняя центральная и нижняя центральная
      dotsCord.push({ x: center, y: start }, { x: center, y: end });
    }
    if (value === 3 || value === 4 || value === 5 || value === 6) {
      // верхняя правая и нижняя левая
      dotsCord.push({ x: start, y: end }, { x: end, y: start });
    }
    if (value === 4 || value === 5 || value === 6) {
      // верхняя левая и нижняя правая
      dotsCord.push({ x: start, y: start }, { x: end, y: end });
    }
    if (value === 6) {
      // левая центральная и правая центральная
      dotsCord.push({ x: start, y: center }, { x: end, y: center });
    }

    return dotsCord;
  }
}
