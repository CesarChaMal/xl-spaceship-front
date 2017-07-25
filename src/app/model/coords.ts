export class Coords {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toStr() {
    return this.y.toString(16) + 'x' + this.x.toString(16);
  }
}
