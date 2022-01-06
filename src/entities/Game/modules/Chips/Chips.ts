import { Chip } from './modules/Chip';

export class Chips {
  chips: Chip[];
  private static instance: Chips;

  constructor(ctx: CanvasRenderingContext2D) {
    // TODO сделать инициализацию фишек из состояния игры
    this.chips = [
      new Chip({
        ctx,
        color: 'red',
      }),
    ];

    Chips.instance = this;
  }

  static getInstance() {
    return Chips.instance;
  }

  getChipByIndex(index: number) {
    return this.chips[index];
  }

  render() {
    this.chips.forEach((chip) => chip.render());
  }

  update() {
    this.chips.forEach((chip) => chip.update());
  }
}
