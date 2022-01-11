// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TCallbackType = (...args: any) => void;

export class EventBus {
  private readonly listeners: {
    [event: string]: TCallbackType[];
  };
  private static instance: EventBus;
  static getInstance() {
    return EventBus.instance;
  }

  constructor() {
    this.listeners = {};
    EventBus.instance = this;
  }

  on(event: string, callback: TCallbackType) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: TCallbackType) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit<T>(event: string, ...args: T[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => listener(...args));
  }
}
