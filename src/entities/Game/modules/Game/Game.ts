import { Scene } from 'entities/Game/modules/Scene';
import { Main } from 'entities/Game/modules/Card/typesCard/Main';

export class Game {
  scene: Scene;

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new Scene({
      canvas,
      onRollDices: this.onRollDices,
      onClickCard: this.onClickCard,
    });
  }

  static async init(canvas: HTMLCanvasElement) {
    const game = new Game(canvas);
    await game.scene.createElements();
    game.scene.gameLoop();
    game.start();
  }

  onRollDices = (value: number, double: boolean) => {
    // eslint-disable-next-line no-console
    console.log(value, double);
    const position = this.scene.chips[0].takeStep(value);
    this.moveChip(0, position);
  };

  // eslint-disable-next-line class-methods-use-this
  onClickCard = (card: Main) => {
    // eslint-disable-next-line no-console
    console.log(card.title);
  };

  start() {
    this.moveChip(0, 0);
  }

  moveChip(indexChip: number, indexCard: number) {
    const { center } = this.scene.cards[indexCard];
    this.scene.chips[indexChip].setCoordinates(center);
  }
}
