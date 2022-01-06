import { drawFillRect } from 'entities/Game/utils/drawFillRect';
import { Label } from 'entities/Game/modules/Cards/typesCard/Main/Label';
import { CardRect, TCardRect } from 'entities/Game/modules/Cards/modules/CardRect/CardRect';
import { TCardMain, TCardType } from 'entities/Game/types/card';
import { TemplateText } from 'entities/Game/modules/Cards/modules/TemplateText';
import { theme } from 'entities/Game/setting/theme';
import { topic } from 'entities/Game/setting/topic';

export class Main extends CardRect {
  type = TCardType.Main;
  title: TemplateText;
  price: TemplateText;
  label: Label;

  constructor(props: TCardRect) {
    super(props);
    const { index } = props;
    const { title, color, price } = topic.cards[index] as TCardMain;

    this.title = new TemplateText({
      ...this.sizeCtx,
      text: title,
      shift: 0.8,
      position: this.position,
      orientation: this.orientation,
    });

    this.price = new TemplateText({
      ...this.sizeCtx,
      text: `${price} ${topic.currency}`,
      shift: 0.1,
      position: this.position,
      orientation: this.orientation,
    });

    this.label = new Label({
      ...this.sizeCtx,
      color,
      position: this.position,
      orientation: this.orientation,
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
