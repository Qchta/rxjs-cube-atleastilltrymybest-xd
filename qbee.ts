import P5 from 'p5'

export class Qbee {

  private p5: P5;

  private x: number;
  private y: number;
  private z: number;
  private size: number;

  constructor(p5: P5, x: number, y: number, z: number, size: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.p5 = p5;
  }

  public draw() {
    this.p5.box(50);
  }
}