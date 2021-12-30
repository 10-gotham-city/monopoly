import { BackgroundImage } from 'entities/Game/modules/Card/modules/BackgroundImage/BackgroundImage';
import { drawFillRect } from 'entities/Game/utils/drawFillRect';
import { CardRect, TCardRect } from 'entities/Game/modules/Card/modules/CardRect/CardRect';
import { TCardWithImage, TCardType } from 'entities/Game/types/card';
import { TemplateText } from 'entities/Game/modules/Card/modules/TemplateText';
import { theme } from 'entities/Game/setting/theme';
import { topic } from 'entities/Game/setting/topic';

export class WithImage extends CardRect {
  type = TCardType.WithImage;

  background: BackgroundImage;

  amount: TemplateText;

  title: TemplateText;

  constructor({ index, canvasSize, ctx }: TCardRect) {
    super({ index, canvasSize, ctx });
    const { title, amount, background } = topic.cards[index] as TCardWithImage;

    this.title = new TemplateText({
      ...this.sizeCtx,
      text: title,
      shift: 0.85,
      position: this.position,
      orientation: this.orientation,
    });

    this.amount = new TemplateText({
      ...this.sizeCtx,
      text: `${amount} ${topic.currency}`,
      shift: 0.1,
      position: this.position,
      orientation: this.orientation,
    });

    this.background = new BackgroundImage({
      ...this.sizeCtx,
      ctx: this.ctx,
      src: background,
      isCenter: true,
      position: this.position,
      orientation: this.orientation,
    });
  }

  static async init(props: TCardRect): Promise<WithImage> {
    const instance = new WithImage(props);
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
