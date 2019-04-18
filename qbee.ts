import P5 from 'p5'

export class Qbee {

  p5: P5;

  x: number;
  y: number;
  z: number;
  size: number;

  constructor(p5: P5, x: number, y: number, z: number, size: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
  }

  draw(): void {
    this.p5.box(50);
  }
}