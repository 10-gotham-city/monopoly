import { Scene } from './modules/Scene';
import { Main } from './modules/Cards/typesCard/Main';
import { Chips } from 'entities/Game/modules/Chips';
import { Cards } from 'entities/Game/modules/Cards';
import { Dices } from 'entities/Game/modules/Dices';

export class Game {
  scene: Scene | undefined;

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
    this.moveChip(0, value);
  };

  // eslint-disable-next-line class-methods-use-this
  onClickCard = (card: Main) => {
    // eslint-disable-next-line no-console
    console.log(card.title);
  };

  start() {
    this.startChip(0);
  }

  startChip(indexChip: number) {
    // const startCoordinates = Cards.getInstance().getCardByIndex(0).center;
    const startCoordinates = Cards.getInstance().getCardByIndex(0).chipPosition;
    Chips.getInstance().getChipByIndex(indexChip)?.setCoordinates(startCoordinates);
  }

  moveChip(indexChip: number, value: number = 0) {
    const chip = Chips.getInstance().getChipByIndex(indexChip);

    const index = chip.currentIndexCard;
    const centerCards = Cards.getInstance().getIntervalCardsCenter(index, value);
    chip.setMoveCoordinates(value, centerCards);
  }
}
