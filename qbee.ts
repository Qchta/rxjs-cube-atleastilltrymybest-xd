import { P5, PMatrix3D } from 'p5'

export interface QbeePurpose {
  isUp: boolean;
  isDown: boolean;
  isFront: boolean;
  isBack: boolean;
  isRight: boolean;
  isLeft: boolean;
}

export class Qbee {

  constructor(
    private p5: P5,
    private x: number,
    private y: number,
    private z: number,
    private purpose: QbeePurpose
  ) {}

  public draw() {
    this.p5.push();
    this.p5.stroke(6);
    this.p5.translate(this.x, this.y, this.z);
    if(this.purpose.isUp) this.drawUp();
    if(this.purpose.isDown) this.drawDown();
    if(this.purpose.isFront) this.drawFront();
    if(this.purpose.isBack) this.drawBack();
    if(this.purpose.isRight) this.drawRight();
    if(this.purpose.isLeft) this.drawLeft();
    this.p5.pop();
  }

  private drawFront() {
    let r = 1;
    this.p5.beginShape();
    this.p5.fill('Green');
    this.p5.vertex(r, r, r);
    this.p5.vertex(r, -r, r);
    this.p5.vertex(-r, -r, r);
    this.p5.vertex(-r, r, r);
    this.p5.endShape(this.p5.CLOSE);
  }

  private drawBack() {
    let r = 1;
    this.p5.beginShape();
    this.p5.fill('DodgerBlue');
    this.p5.vertex(r, r, -r);
    this.p5.vertex(r, -r, -r);
    this.p5.vertex(-r, -r, -r);
    this.p5.vertex(-r, r, -r);
    this.p5.endShape(this.p5.CLOSE);
  }

  private drawRight() {
    let r = 1;
    this.p5.beginShape();
    this.p5.fill('Red');
    this.p5.vertex(r, r, r);
    this.p5.vertex(r, -r, r);
    this.p5.vertex(r, -r, -r);
    this.p5.vertex(r, r, -r);
    this.p5.endShape(this.p5.CLOSE);
  }

  private drawLeft() {
    let r = 1;
    this.p5.beginShape();
    this.p5.fill('Orange');
    this.p5.vertex(-r, r, r);
    this.p5.vertex(-r, -r, r);
    this.p5.vertex(-r, -r, -r);
    this.p5.vertex(-r, r, -r);
    this.p5.endShape(this.p5.CLOSE);
  }

  private drawUp() {
    let r = 1;
    this.p5.beginShape();
    this.p5.fill('White');
    this.p5.vertex(r, -r, r);
    this.p5.vertex(-r, -r, r);
    this.p5.vertex(-r, -r, -r);
    this.p5.vertex(r, -r, -r);
    this.p5.endShape(this.p5.CLOSE);
  }

  private drawDown() {
    let r = 1;
    this.p5.beginShape();
    this.p5.fill('Yellow');
    this.p5.vertex(r, r, r);
    this.p5.vertex(-r, r, r);
    this.p5.vertex(-r, r, -r);
    this.p5.vertex(r, r, -r);
    this.p5.endShape(this.p5.CLOSE);
  }
}