import P5 from 'p5'

export class Qbee {

  constructor(
    private p5: P5,
    private x: number,
    private y: number,
    private z: number,
    private size: number
  ) {}

  public draw() {
    this.p5.box(50);
  }
}