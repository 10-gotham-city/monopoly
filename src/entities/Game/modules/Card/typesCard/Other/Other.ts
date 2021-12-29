import { BackgroundImage } from 'entities/Game/modules/Card/modules/BackgroundImage/BackgroundImage';
import { drawFillRect } from 'entities/Game/utils/drawFillRect';
import { Rect } from 'entities/Game/modules/Card/modules/Rect/Rect';
import { TCard } from 'entities/Game/modules/Card/typesCard/types';
import { TCardOther, TCardType } from 'entities/Game/types/card';
import { TemplateText } from 'entities/Game/modules/Card/modules/TemplateText';
import { theme } from 'entities/Game/setting/theme';
import { topic } from 'entities/Game/setting/topic';

export class Other extends Rect {
  type = TCardType.Other;
  background: BackgroundImage;

  amount: TemplateText;

  title: TemplateText;

  constructor({ position, canvasSize, ctx, orientation }: TCard) {
    super({ position, canvasSize, ctx });
    const { title, amount, background } = topic.cards[position] as TCardOther;

    this.title = new TemplateText({
      ...this.sizeCtx,
      text: title,
      shift: 0.85,
      orientation,
    });

    this.amount = new TemplateText({
      ...this.sizeCtx,
      text: `${amount} ${topic.currency}`,
      shift: 0.1,
      orientation,
    });

    this.background = new BackgroundImage({
      ...this.sizeCtx,
      ctx: this.ctx,
      src: background,
      isCenter: true,
      orientation,
    });
  }

  static async init(props: TCard): Promise<Other> {
    const instance = new Other(props);
    await instance.background.load();
    return instance;
  }

  render() {
    const { hover, normal } = theme.color.background.card;
    drawFillRect({
      ...this.sizeCtx,
      color: this.hover ? hover : normal,
    });
    this.renderStroke();
    this.background.render();
    this.title.render();
    this.amount.render();
  }
}
