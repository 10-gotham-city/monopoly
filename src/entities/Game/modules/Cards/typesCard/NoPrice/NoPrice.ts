import { BackgroundImage } from 'entities/Game/modules/BackgroundImage';
import { drawFillRect } from 'entities/Game/utils/drawFillRect';
import { CardRect, TCardRect } from 'entities/Game/modules/Cards/modules/CardRect';
import { TCardNoPrice, TCardType } from 'entities/Game/types/card';
import { TemplateText } from 'entities/Game/modules/Cards/modules/TemplateText';
import { theme } from 'entities/Game/setting/theme';
import { topic } from 'entities/Game/setting/topic';

export class NoPrice extends CardRect {
  type = TCardType.NoPrice;
  background: BackgroundImage;
  title: TemplateText;

  constructor(props: TCardRect) {
    super(props);
    const { index } = props;
    const { title, background } = topic.cards[index] as TCardNoPrice;

    this.title = new TemplateText({
      ...this.sizeCtx,
      text: title,
      shift: 0.85,
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

  static async init(props: TCardRect): Promise<NoPrice> {
    const instance = new NoPrice(props);
    await instance.background.load();
    return instance;
  }

  render() {
    drawFillRect({ ...this.sizeCtx, color: theme.color.background.card.normal });
    this.renderStroke();
    this.background.render();
    this.title.render();
  }
}
