type TArc = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  fill?: string;
  radius: number;
  startAngle?: number;
  endAngle?: number;
};

export function arc({ ctx, x, y, radius, fill, endAngle = Math.PI * 2, startAngle = 0 }: TArc) {
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
}
