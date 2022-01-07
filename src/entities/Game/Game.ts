import { Scene } from './modules/Scene';
import { Main } from './modules/Cards/typesCard/Main';
import { Chips } from 'entities/Game/modules/Chips';
import { Dices } from 'entities/Game/modules/Dices';
import { EventBus } from 'entities/Game/modules/EventBus';
import { EVENTS_NAME } from 'entities/Game/modules/EventBus/eventsName';

export class Game {
  scene: Scene | undefined;
  myChipIndex = 0;
  eventBus: EventBus;
  canRollDices = true;

  constructor() {
    this.eventBus = new EventBus();
  }

  static async init(canvas: HTMLCanvasElement) {
    const game = new Game();
    await game.addScene(canvas);
    game.start();
  }

  private async addScene(canvas: HTMLCanvasElement) {
    this.scene = await Scene.init(canvas);
    this.addEventListeners();
  }

  addEventListeners() {
    this.eventBus.on(EVENTS_NAME.ROLL_DICES, this.onRollDices);
    this.eventBus.on(EVENTS_NAME.CLICK_CARD, this.onClickCard);
    this.eventBus.on(EVENTS_NAME.READY_STEP, this.onReadyStep);
  }

  /**
   * Кинули кубики
   */
  onRollDices = async () => {
    if (!this.canRollDices) {
      return;
    }
    // TODO раскомментировать после добавления логики смены хода
    // this.canRollDices = false;

    const { value, double } = await Dices.getInstance().roll();

    // TODO double - повтор хода
    // eslint-disable-next-line no-console
    console.log(value, double);

    this.moveChip(this.myChipIndex, value);

    // TODO убрать. Используется для имитации одновременного перемещения фишек
    this.myChipIndex = this.myChipIndex === 0 ? 1 : 0;
  };

  /**
   * Нажали на карточку
   */
  // eslint-disable-next-line class-methods-use-this
  onClickCard = (card: Main) => {
    // TODO открыть модалку карточки
    // eslint-disable-next-line no-console
    console.log(card);
  };

  /**
   * Фишка пришла на поле
   */
  // eslint-disable-next-line class-methods-use-this
  onReadyStep = (index: number) => {
    // TODO обработать ход
    // eslint-disable-next-line no-console
    console.log('Фишка пришла на поле', index);
  };

  moveChip(indexChip: number, dicesValue: number) {
    Chips.getInstance().moveChip(indexChip, dicesValue);
  }

  /**
   * Переход на определенную карточку
   */
  moveChipToCard(indexChip: number, indexCard: number) {}

  /**
   * Переход в тюрьму
   */
  moveChipToJail(indexChip: number) {}

  start() {}
}
