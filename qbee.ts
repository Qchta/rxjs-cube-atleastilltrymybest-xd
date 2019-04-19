import P5 from 'p5'

export interface QbeePurpose {
  isUp: boolean;
  isDown: boolean;
  isFront: boolean;
  isBack: boolean;
  isRight: boolean;
  isLeft: boolean;
}

export class Qbee {

  private initailState;

  constructor(
    private p5: P5,
    private x: number,
    private y: number,
    private z: number,
    private purpose: QbeePurpose
  ) {
    this.initailState = { x: x, y: y, z: z };
  }

  public draw() {
    this.p5.push();
    // if (this.purpose.isUp) this.p5.rotateY(-this.p5.HALF_PI);
    this.p5.translate(this.x, this.y, this.z);
    if (this.purpose.isUp) this.drawUp();
    if (this.purpose.isDown) this.drawDown();
    if (this.purpose.isFront) this.drawFront();
    if (this.purpose.isBack) this.drawBack();
    if (this.purpose.isRight) this.drawRight();
    if (this.purpose.isLeft) this.drawLeft();
    this.p5.pop();
  }

  private drawFront() {
    let r = 0.5;
    this.p5.beginShape();
    this.p5.fill('Green');
    this.p5.vertex(r, r, r);
    this.p5.vertex(r, -r, r);
    this.p5.vertex(-r, -r, r);
    this.p5.vertex(-r, r, r);
    this.p5.endShape(this.p5.CLOSE);
  }

  private drawBack() {
    let r = 0.5;
    this.p5.beginShape();
    this.p5.fill('DodgerBlue');
    this.p5.vertex(r, r, -r);
    this.p5.vertex(r, -r, -r);
    this.p5.vertex(-r, -r, -r);
    this.p5.vertex(-r, r, -r);
    this.p5.endShape(this.p5.CLOSE);
  }

  private drawRight() {
    let r = 0.5;
    this.p5.beginShape();
    this.p5.fill('Red');
    this.p5.vertex(r, r, r);
    this.p5.vertex(r, -r, r);
    this.p5.vertex(r, -r, -r);
    this.p5.vertex(r, r, -r);
    this.p5.endShape(this.p5.CLOSE);
  }

  private drawLeft() {
    let r = 0.5;
    this.p5.beginShape();
    this.p5.fill('Orange');
    this.p5.vertex(-r, r, r);
    this.p5.vertex(-r, -r, r);
    this.p5.vertex(-r, -r, -r);
    this.p5.vertex(-r, r, -r);
    this.p5.endShape(this.p5.CLOSE);
  }

  private drawUp() {
    let r = 0.5;
    this.p5.beginShape();
    this.p5.fill('White');
    this.p5.vertex(r, -r, r);
    this.p5.vertex(-r, -r, r);
    this.p5.vertex(-r, -r, -r);
    this.p5.vertex(r, -r, -r);
    this.p5.endShape(this.p5.CLOSE);
  }

  private drawDown() {
    let r = 0.5;
    this.p5.beginShape();
    this.p5.fill('Yellow');
    this.p5.vertex(r, r, r);
    this.p5.vertex(-r, r, r);
    this.p5.vertex(-r, r, -r);
    this.p5.vertex(r, r, -r);
    this.p5.endShape(this.p5.CLOSE);
  }
}