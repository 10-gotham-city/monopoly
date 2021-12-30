import { Dice } from 'entities/Game/modules/Dice/Dice';
import { TMouse } from 'entities/Game/types/card';

type TDices = {
  ctx: CanvasRenderingContext2D;
  canvasSize: number;
};

type TRoll = {
  value: number;
  double: boolean;
};

export class Dices {
  dice1: Dice;

  dice2: Dice;

  ctx: CanvasRenderingContext2D;

  private readonly xyHover: number;

  private readonly sizeHover: number;

  constructor({ ctx, canvasSize }: TDices) {
    this.ctx = ctx;

    const start = Math.floor(canvasSize * 0.45);
    const center = Math.floor(canvasSize * 0.5);
    const end = Math.floor(canvasSize * 0.55);
    const sizeDice = Math.floor(canvasSize * 0.05);
    const sizeRect = Math.floor(canvasSize * 0.1);

    this.dice1 = new Dice({
      ctx,
      size: sizeDice,
      start: { x: start, y: start },
      end: { x: center * 0.8, y: end },
    });
    this.dice2 = new Dice({
      ctx,
      size: sizeDice,
      start: { x: center * 1.2, y: start },
      end: { x: end, y: end },
    });

    // увеличение области для клика
    this.xyHover = start - sizeDice;
    this.sizeHover = sizeRect + sizeDice * 2;
  }

  get value(): TRoll {
    return {
      value: this.dice1.value + this.dice2.value,
      double: this.dice1.value === this.dice2.value,
    };
  }

  async roll(): Promise<TRoll> {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 5; i++) {
      // eslint-disable-next-line no-await-in-loop
      await this.rollStep();
    }

    return this.value;
  }

  render() {
    this.dice1.render();
    this.dice2.render();
  }

  isPointInPath({ x, y }: TMouse) {
    this.ctx.beginPath();
    this.ctx.rect(this.xyHover, this.xyHover, this.sizeHover, this.sizeHover);
    return this.ctx.isPointInPath(x, y);
  }

  private rollStep(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.dice1.roll();
        this.dice2.roll();
        resolve();
      }, 100);
    });
  }
}
