type TChip = {
  color: string;
  ctx: CanvasRenderingContext2D;
};

type TCord = {
  x: number;
  y: number;
};

export class Chip {
  private x = 0;

  private y = 0;

  private ctx: CanvasRenderingContext2D;

  private radius = 15;

  private position = 0;

  private readonly color: string;

  constructor({ color, ctx }: TChip) {
    this.color = color;
    this.ctx = ctx;
  }

  setCoordinates({ x, y }: TCord) {
    this.x = x;
    this.y = y;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  takeStep(value: number) {
    this.position += value;
    if (this.position >= 40) {
      this.position -= 40;
    }
    return this.position;
  }
}
