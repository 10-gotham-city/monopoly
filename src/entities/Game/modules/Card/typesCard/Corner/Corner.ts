import { BackgroundImage } from 'entities/Game/modules/Card/modules/BackgroundImage/BackgroundImage';
import { drawFillRect } from 'entities/Game/utils/drawFillRect';
import { CardRect, TCardRect } from 'entities/Game/modules/Card/modules/CardRect/CardRect';
import { TCardCorner, TCardType } from 'entities/Game/types/card';
import { theme } from 'entities/Game/setting/theme';
import { topic } from 'entities/Game/setting/topic';

/**
 * Угловая карточка
 */
export class Corner extends CardRect {
  type = TCardType.Corner;

  background: BackgroundImage;

  constructor({ index, canvasSize, ctx }: TCardRect) {
    super({ index, canvasSize, ctx });
    this.background = new BackgroundImage({
      ...this.sizeCtx,
      src: (topic.cards[index] as TCardCorner).background,
    });
  }

  static async init(props: TCardRect): Promise<Corner> {
    const instance = new Corner(props);
    await instance.background.load();
    return instance;
  }

  render() {
    drawFillRect({ ...this.sizeCtx, color: theme.color.background.card.normal });
    this.background.render();
    this.renderStroke();
  }
}
