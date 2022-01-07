import { Scene } from './modules/Scene';
import { Main } from './modules/Cards/typesCard/Main';
import { Chips } from 'entities/Game/modules/Chips';
import { Dices } from 'entities/Game/modules/Dices';

export class Game {
  scene: Scene | undefined;

  // TODO убрать. Используется для имитации одновременного перемещения фишек
  activeChip = 0;
  static async init(canvas: HTMLCanvasElement) {
    const game = new Game();
    await game.addScene(canvas);
    game.start();
  }

  private async addScene(canvas: HTMLCanvasElement) {
    this.scene = await Scene.init({
      canvas,
      onRollDices: this.onRollDices,
      onClickCard: this.onClickCard,
    });
  }

  onRollDices = async () => {
    // TODO проверить может ли игрок кидать кубик
    const { value, double } = await Dices.getInstance().roll();
    // eslint-disable-next-line no-console
    console.log(value, double);
    // Chips.getInstance().moveChip(0, value);

    // TODO убрать. Используется для имитации одновременного перемещения фишек
    Chips.getInstance().moveChip(this.activeChip, 5);
    this.activeChip = this.activeChip === 0 ? 1 : 0;
  };

  // eslint-disable-next-line class-methods-use-this
  onClickCard = (card: Main) => {
    // eslint-disable-next-line no-console
    console.log(card.title);
  };

  start() {}
}
