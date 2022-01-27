import { EVENTS_NAME } from '../../setting';
import { TOrientation } from '../../types';
import { Cards } from '../cards';
import { EventBus } from '../index';
import { Chip } from './chip';

export class Chips {
  private static readonly CONST = {
    COUNT_CARDS: 40,
  };

  private static instance: Chips;
  private readonly chips: Chip[];

  constructor(ctx: CanvasRenderingContext2D) {
    // TODO сделать инициализацию фишек из состояния игры
    const CHIPS = [
      {
        color: 'red',
      },
      {
        color: 'blue',
      },
    ];

    this.chips = CHIPS.map(({ color }) => new Chip({ color, ctx }));

    this.setStartCoordinates();
    this.addEventListener();
    Chips.instance = this;
  }

  static getInstance() {
    return Chips.instance;
  }

  private setStartCoordinates() {
    this.getCoordinatesForCard(0).forEach(({ chip, coordinates }) => {
      chip.setSize(coordinates);
    });
  }

  private addEventListener() {
    EventBus.getInstance().on(EVENTS_NAME.CHIP_IN_CENTER_CARD, this.finishMove);
  }

  getChipByIndex(index: number) {
    return this.chips[index];
  }

  private getChipsOnCard(indexCard: number) {
    return this.chips.filter(({ position }) => position === indexCard);
  }

  render() {
    this.chips.forEach((chip) => chip.render());
  }

  update() {
    this.chips.forEach((chip) => chip.update());
  }

  /**
   * Рассчитать координаты фишек на карточке
   */
  getCoordinatesForCard(indexCard: number) {
    const card = Cards.getInstance().getCardByIndex(indexCard);
    const { orientation } = card;
    // координаты центра области фишек
    const { x, y } = card.chipPosition;
    // расстояние между фишками
    const step = Chip.CONST.DISTANCE_BETWEEN_CHIPS;
    // фишки на карточке
    const chips = this.getChipsOnCard(indexCard);
    const count = chips.length;

    if (orientation === TOrientation.Horizontal) {
      let startY = Math.floor(y - ((count - 1) * step) / 2);
      return chips.map((chip) => {
        const coordinates = {
          x,
          y: startY,
        };
        startY += step;
        return { chip, coordinates };
      });
    }

    let startX = Math.floor(x - ((count - 1) * step) / 2);
    return chips.map((chip) => {
      const coordinates = {
        x: startX,
        y,
      };
      startX += step;
      return { chip, coordinates };
    });
  }

  /**
   * Получить координаты count карточек, начиная с карточки index
   */
  private static getIntervalCardsCenter(index: number, count: number) {
    const centerCards = [];

    let i = index;
    while (centerCards.length <= count) {
      const { center } = Cards.getInstance().getCardByIndex(i);
      centerCards.push(center);
      // eslint-disable-next-line no-plusplus
      i++;
      if (i === Chips.CONST.COUNT_CARDS) {
        i = 0;
      }
    }

    return centerCards;
  }

  /**
   * Передвинуть фишку
   */
  moveChip(indexChip: number, value = 0) {
    const chip = this.getChipByIndex(indexChip);
    const startCard = chip.position;
    const moveCoordinates = Chips.getIntervalCardsCenter(startCard, value);

    chip.moveBetweenCards(value, moveCoordinates);

    // обновить фишки на стартовой карточке
    this.arrangeChipsOnCard(startCard);
  }

  /**
   * Расставить фишки на карточке
   */
  arrangeChipsOnCard(indexCard: number) {
    this.getCoordinatesForCard(indexCard).forEach(({ chip, coordinates }) => {
      chip.moveInsideCard(coordinates);
    });
  }

  /**
   * Фишка закончила свое движение
   */
  private finishMove = (index: number) => {
    this.arrangeChipsOnCard(index);
    EventBus.getInstance().emit(EVENTS_NAME.READY_STEP, index);
  };
}
