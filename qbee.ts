import P5 from 'p5'

export interface QbeePurpose {
  isUp: boolean;
  isDown: boolean;
  isFront: boolean;
  isBack: boolean;
  isRight: boolean;
  isLeft: boolean;
}

export interface QbeeState {
  x: number,
  y: number,
  z: number,
  rotX: number,
  rotY: number,
  rotZ: number
}

export enum Side {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    FRONT,
    BACK
}

export class Qbee {

  public purpose: QbeePurpose;
  
  private initailState: QbeeState;
  private currentState: QbeeState;

  constructor(
    private p5: P5,
    private x: number,
    private y: number,
    private z: number
  ) {
    this.initailState = {
      x: x,
      y: y,
      z: z,
      rotX: 0,
      rotY: 0,
      rotZ: 0
    };
    this.currentState = {...this.initailState};
    this.purpose = {
      isUp: isOuter(y, false),
      isDown: isOuter(y, true),
      isFront: isOuter(z, true),
      isBack: isOuter(z, false),
      isRight: isOuter(x, true),
      isLeft: isOuter(x, false)
    }
  }

  public draw() {
    this.p5.push();
    this.p5.rotateX(this.currentState.rotX);
    this.p5.rotateY(this.currentState.rotY);
    this.p5.rotateZ(this.currentState.rotZ);
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

  public move(side: Side) {
    switch(side) {
      case Side.FRONT: 
        this.currentState.rotZ += this.p5.HALF_PI;
    }
  }

}

function isOuter(cord: number, positive: boolean): boolean {
  return cord === 1 * (positive ? 1 : -1);
}