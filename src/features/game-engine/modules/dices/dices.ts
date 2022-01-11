import { Dice } from './dice';
import { CanvasElement } from '../canvas-element';

type TDices = {
  ctx: CanvasRenderingContext2D;
  canvasSize: number;
};

type TRoll = {
  value: number;
  double: boolean;
};

export class Dices extends CanvasElement {
  // Размеры и координаты относительно размера canvas
  private static CONST = {
    RECT_SIZE: 0.1,
    X_Y_START: 0.45,
    X_Y_CENTER: 0.5,
    X_Y_END: 0.55,
    DICE_SIZE: 0.05,
    SHIFT_DICE_1: 0.8, // сдвиг относительно центра для 1-го кубика
    SHIFT_DICE_2: 1.2, // сдвиг относительно центра для 2-го кубика
  };

  private static instance: Dices;
  private readonly dice1: Dice;
  private readonly dice2: Dice;

  constructor({ ctx, canvasSize }: TDices) {
    // Область кубиков (x, y)
    const start = canvasSize * Dices.CONST.X_Y_START;
    const center = canvasSize * Dices.CONST.X_Y_CENTER;
    const end = canvasSize * Dices.CONST.X_Y_END;

    // Размер кубика
    const sizeDice = Math.floor(canvasSize * Dices.CONST.DICE_SIZE);

    // Увеличение области кубиков для события клика (необходимо в связи с вращением кубиков)
    const hypotenuseDice = Math.sqrt(2 * sizeDice ** 2);
    const startRect = start - hypotenuseDice;
    const sizeRect = canvasSize * Dices.CONST.RECT_SIZE + hypotenuseDice * 2;

    super({
      ctx,
      x: startRect,
      y: startRect,
      width: sizeRect,
      height: sizeRect,
    });

    this.dice1 = new Dice({
      ctx,
      size: sizeDice,
      start: { x: start, y: start },
      end: { x: center * Dices.CONST.SHIFT_DICE_1, y: end },
    });

    this.dice2 = new Dice({
      ctx,
      size: sizeDice,
      start: { x: center * Dices.CONST.SHIFT_DICE_2, y: start },
      end: { x: end, y: end },
    });

    Dices.instance = this;
  }

  static getInstance() {
    return Dices.instance;
  }

  get value(): TRoll {
    return {
      value: this.dice1.value + this.dice2.value,
      double: this.dice1.value === this.dice2.value,
    };
  }

  /**
   * 5 раз обновить кубики
   */
  // TODO запуск из игры - когда кидает другой игрок
  async roll(): Promise<TRoll> {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 5; i++) {
      // eslint-disable-next-line no-await-in-loop
      await this.rollStep();
    }

    return this.value;
  }

  /**
   * Одно обновление кубиков
   */
  private rollStep(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.dice1.roll();
        this.dice2.roll();
        resolve();
      }, 100);
    });
  }

  render() {
    this.dice1.render();
    this.dice2.render();
  }
}
