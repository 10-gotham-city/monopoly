type TGameLoop = {
  render: () => void;
  update: () => void;
};

/**
 * Игровой цикл
 * https://dou.ua/lenta/articles/javascript-gamedev/
 */
export class GameLoop {
  private readonly render: () => void;
  private readonly update: () => void;

  // время вызова предыдущего кадра
  private last: number = performance.now();
  // текущее время
  private now: number = performance.now();
  // количество времени на один кадр
  private step: number = 1 / 60;
  // время, прошедшее между кадрами
  private dt = 0;

  constructor({ render, update }: TGameLoop) {
    this.render = render;
    this.update = update;
  }

  // TODO подумать как быть с неактивной вкладкой
  run() {
    // определяем текущее время
    this.now = performance.now();
    // Добавляем прошедшую разницу во времени. Не более, чем 1 секунда
    this.dt += Math.min(1, (this.now - this.last) / 1000);

    /**
     * вложенный цикл может вызывать обновление состояния несколько раз подряд,
     * если прошло больше времени, чем выделено на один кадр
     */
    while (this.dt > this.step) {
      this.dt -= this.step;
      this.update();
    }
    this.last = this.now;
    this.render();
    requestAnimationFrame(() => {
      this.run();
    });
  }
}
