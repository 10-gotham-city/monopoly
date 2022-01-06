import { NoPrice } from './typesCard/NoPrice';
import { Corner } from './typesCard/Corner';
import { Main } from './typesCard/Main';
import { WithImage } from './typesCard/WithImage';
import { TCard, TCardType } from '../../types/card';
import { topic } from '../../setting/topic';
import { TCoordinates } from 'entities/Game/modules/CanvasElement/CanvasElement';

type TCardInit = {
  card: TCard;
  index: number;
  ctx: CanvasRenderingContext2D;
  canvasSize: number;
};

type TCardItem = Corner | NoPrice | Main | WithImage;

/**
 * Создание экземпляров карточек в соответствии с типом
 */
export class Cards {
  private static instance: Cards;

  cards: TCardItem[] = [];

  constructor(cards: TCardItem[]) {
    this.cards = cards;
    Cards.instance = this;
  }

  static getInstance() {
    return Cards.instance;
  }

  getCardByIndex(index: number) {
    return this.cards[index];
  }

  static async initAll(ctx: CanvasRenderingContext2D, canvasSize: number) {
    const cards = await Promise.all(
      topic.cards.map((card, index) => Cards.initItem({ card, index, ctx, canvasSize })),
    );
    return new Cards(cards);
  }

  static async initItem(props: TCardInit): Promise<TCardItem> {
    const { card, index, ctx, canvasSize } = props;
    const { type } = card;
    const rectProps = { index, canvasSize, ctx };

    if (type === TCardType.Corner) {
      return Corner.init(rectProps);
    }
    if (type === TCardType.Main) {
      return new Main(rectProps);
    }
    if (type === TCardType.NoPrice) {
      return NoPrice.init(rectProps);
    }
    return WithImage.init(rectProps);
  }

  render() {
    this.cards.forEach((card) => card.render());
  }

  /**
   * Находится ли курсор над карточкой Main или WithImage\
   * обновить для всех карточек свойство isHover
   * @param mouseCord
   */
  checkHover(mouseCord: TCoordinates) {
    let isHover = false;
    this.cards.forEach((card) => {
      if (card.type === TCardType.Main || card.type === TCardType.WithImage) {
        const hoverCard = card.checkHover(mouseCord);
        if (hoverCard) {
          isHover = true;
        }
      }
    });
    return isHover;
  }

  /**
   * Обновить для всех курточек свойство isHover
   */
  clearHover() {
    this.cards.forEach((card) => {
      card.checkHover();
    });
  }

  /**
   * Проверка клика на главную карточку
   * @param mouseCord
   */
  checkClickMain(mouseCord: TCoordinates) {
    const cardClick = this.cards.find((card) => card.checkHover(mouseCord));
    if (cardClick && cardClick.type === TCardType.Main) {
      return cardClick as Main;
    }
  }

  /**
   * Получить координаты count карточек, начиная с карточки index
   * @param index
   * @param count
   */
  getIntervalCardsCenter(index: number, count: number) {
    let centerCards = [];

    while (centerCards.length <= count) {
      const { center } = this.getCardByIndex(index);
      centerCards.push(center);
      index++;
      if (index === 40) {
        index = 0;
      }
    }

    const { chipPosition } = this.getCardByIndex(index === 0 ? 39 : index - 1);
    centerCards.push(chipPosition);

    return centerCards;
  }
}
