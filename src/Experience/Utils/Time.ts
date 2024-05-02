import { EventEmitter } from "events";
export default class Time extends EventEmitter {
  start: number;
  current: any;
  elapsed: number;
  delta: number;

  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    this.update();
  }

  update() {
    this.emit("update");

    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;
    window.requestAnimationFrame(() => this.update());
  }
}
