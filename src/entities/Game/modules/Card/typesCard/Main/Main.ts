import { drawFillRect } from 'entities/Game/utils/drawFillRect';
import { Label } from 'entities/Game/modules/Card/typesCard/Main/Label';
import { Rect } from 'entities/Game/modules/Card/modules/Rect/Rect';
import { TCard } from 'entities/Game/modules/Card/typesCard/types';
import { TCardMain, TCardType } from 'entities/Game/types/card';
import { TemplateText } from 'entities/Game/modules/Card/modules/TemplateText';
import { theme } from 'entities/Game/setting/theme';
import { topic } from 'entities/Game/setting/topic';

export class Main extends Rect {
  type = TCardType.Main;

  title: TemplateText;

  price: TemplateText;

  label: Label;

  constructor(props: TCard) {
    super(props);
    const { position, orientation } = props;
    const { title, color, price } = topic.cards[position] as TCardMain;

    this.title = new TemplateText({
      ...this.sizeCtx,
      text: title,
      shift: 0.8,
      orientation,
    });
    this.price = new TemplateText({
      ...this.sizeCtx,
      text: `${price} ${topic.currency}`,
      shift: 0.1,
      orientation,
    });
    this.label = new Label({
      ...this.sizeCtx,
      color,
      orientation,
    });
  }

  render() {
    const { hover, normal } = theme.color.background.card;
    drawFillRect({
      ...this.sizeCtx,
      color: this.hover ? hover : normal,
    });
    this.label.render();
    this.renderStroke();
    this.title.render();
    this.price.render();
  }
}
