import {
  NoPriceCard,
  CornerCard,
  MainCard,
  WithImageCard,
  TCard,
  TCardInit,
  TAssetCard,
} from './types-card';
import { topic } from '../../setting';
import { TCoordinates, TCardType } from '../../types';

/**
 * Создание экземпляров карточек, обработка событий мыши
 */
export class Cards {
  private static instance: Cards;
  private readonly cards: TCard[];
  private static initCard = {
    /* eslint-disable @typescript-eslint/unbound-method */
    [TCardType.Corner]: CornerCard.init,
    [TCardType.Main]: MainCard.init,
    [TCardType.NoPrice]: NoPriceCard.init,
    [TCardType.WithImage]: WithImageCard.init,
    /* eslint-enable @typescript-eslint/unbound-method */
  };

  // карточки с активами (MainCard или WithImageCard)
  private readonly assetCards: TAssetCard[];

  constructor(cards: TCard[]) {
    this.cards = cards;
    this.assetCards = this.getAssetsCard();
    Cards.instance = this;
  }

  private getAssetsCard() {
    return this.cards.filter(
      ({ type }) => type === TCardType.Main || type === TCardType.WithImage,
    ) as TAssetCard[];
  }

  static getInstance() {
    return Cards.instance;
  }

  static async initAll(ctx: CanvasRenderingContext2D, canvasSize: number) {
    const cards = await Promise.all(
      topic.cards.map((cardSetting, index) => {
        const { type } = cardSetting;
        // явно указал тип TCardInit, т.к. const fnInit: (arg0: never) => ...
        const fnInit = Cards.initCard[type] as TCardInit;
        const props = { index, ctx, canvasSize, ...cardSetting };
        return fnInit(props);
      }),
    );
    return new Cards(cards);
  }

  getCardByIndex(index: number) {
    return this.cards[index];
  }

  render() {
    this.cards.forEach((card) => card.render());
  }

  /**
   * Находится ли курсор над карточкой с активом (MainCard или WithImageCard)
   */
  checkHoverAssetCard(mouseCord: TCoordinates) {
    let isHover = false;
    // Необходимо пройти весь цикл для того, чтобы сбросить все карточки
    this.assetCards.forEach((card) => {
      const hoverCard = card.isPointInPath(mouseCord);
      if (hoverCard) {
        isHover = true;
      }
    });
    return isHover;
  }

  /**
   * Обновить для всех курточек свойство isHover
   */
  clearHover() {
    this.cards.forEach((card) => {
      card.isPointInPath();
    });
  }

  /**
   * Проверка клика на карточку с активом (MainCard или WithImageCard)
   */
  checkClickAssetCard(mouseCord: TCoordinates) {
    // eslint-disable-next-line no-restricted-syntax
    for (let card of this.assetCards) {
      if (card.isPointInPath(mouseCord)) {
        return card;
      }
    }
    return undefined;
  }
}
