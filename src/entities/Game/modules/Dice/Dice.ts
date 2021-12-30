import { theme } from 'entities/Game/setting/theme';

type TCoordinates = {
  x: number;
  y: number;
};

type TDice = {
  ctx: CanvasRenderingContext2D;
  start: TCoordinates;
  end: TCoordinates;
  size: number;
};

export class Dice {
  value = 0;
  private readonly start: TCoordinates;
  private readonly end: TCoordinates;

  // Размер кубика
  private readonly size: number;
  private x = 0;
  private y = 0;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly background = theme.color.dice.background;
  private rotate = 0;
  private readonly radius;
  private dots: TCoordinates[] = [];

  constructor({ ctx, start, end, size }: TDice) {
    this.ctx = ctx;
    this.start = start;
    this.end = end;
    this.size = size;
    this.radius = Math.floor(size * 0.1);
    this.roll();
  }

  static getRandomCord(start: number, end: number) {
    const rand = start + Math.random() * (end - start);
    return Math.floor(rand);
  }

  roll() {
    const value = Math.ceil(Math.random() * 6);
    const rotate = Math.ceil(Math.random() * 360);
    this.x = Dice.getRandomCord(this.start.x, this.end.x);
    this.y = Dice.getRandomCord(this.start.y, this.end.y);
    const dots = this.getDotsCord(value);
    this.rotate = rotate;
    this.dots = dots;
    this.value = value;
  }

  render() {
    this.ctx.fillStyle = this.background;
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate((this.rotate * Math.PI) / 180);
    this.ctx.fillRect(0, 0, this.size, this.size);
    this.renderDots();
    this.ctx.restore();
  }

  private renderDots() {
    this.dots.forEach(({ x, y }) => {
      this.renderDot(x, y);
    });
  }

  private renderDot(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = theme.color.dice.dots;
    this.ctx.fill();
  }

  private getDotsCord(value: number) {
    const dotsCord = [];
    const center = Math.floor(this.size * 0.5);
    const start = Math.floor(this.size * 0.2);
    const end = Math.floor(this.size * 0.8);

    if (value === 1 || value === 3 || value === 5) {
      dotsCord.push({ x: center, y: center });
    }
    if (value === 2) {
      dotsCord.push({ x: center, y: start }, { x: center, y: end });
    }
    if (value === 3 || value === 4 || value === 5 || value === 6) {
      dotsCord.push({ x: start, y: end }, { x: end, y: start });
    }
    if (value === 4 || value === 5 || value === 6) {
      dotsCord.push({ x: start, y: start }, { x: end, y: end });
    }
    if (value === 6) {
      dotsCord.push({ x: start, y: center }, { x: end, y: center });
    }

    return dotsCord;
  }
}
