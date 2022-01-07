export type callbackType = (...args: any) => void;

export class EventBus {
  private listeners: {
    [event: string]: callbackType[];
  };
  private static instance: EventBus;
  static getInstance() {
    return EventBus.instance;
  }

  constructor() {
    this.listeners = {};
    EventBus.instance = this;
  }

  on(event: string, callback: callbackType) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: callbackType) {
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
