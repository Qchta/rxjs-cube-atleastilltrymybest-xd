import P5 from 'p5'
import { Axis } from './index'

export interface CubieState {
  x: number,
  y: number,
  z: number,
  rotX: number,
  rotY: number,
  rotZ: number,
  layers: Array<Layer>
}

export enum Layer {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    FRONT,
    BACK
}

export class Cubie {
  
  private initailState: CubieState;
  public currentState: CubieState;

  constructor(
    private p5: P5,
    x: number,
    y: number,
    z: number
  ) {
    let layers: Array<Layer> = new Array();;
    if(isOuter(y, false))layers.push(Layer.UP);
    if(isOuter(y, true))layers.push(Layer.DOWN);
    if(isOuter(z, true))layers.push(Layer.FRONT);
    if(isOuter(z, false))layers.push(Layer.BACK);
    if(isOuter(x, true))layers.push(Layer.RIGHT);
    if(isOuter(x, false))layers.push(Layer.LEFT);
    this.initailState = {
      x: x,
      y: y,
      z: z,
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      layers: layers
    };
    this.currentState = {...this.initailState};
  }

  public draw() {
    this.p5.push();
    this.p5.rotateX(this.currentState.rotX);
    this.p5.rotateY(this.currentState.rotY);
    this.p5.rotateZ(this.currentState.rotZ);
    this.p5.translate(this.initailState.x, this.initailState.y, this.initailState.z);
    if (this.initailState.layers.includes(Layer.UP)) this.drawUp();
    if (this.initailState.layers.includes(Layer.DOWN)) this.drawDown();
    if (this.initailState.layers.includes(Layer.FRONT)) this.drawFront();
    if (this.initailState.layers.includes(Layer.BACK)) this.drawBack();
    if (this.initailState.layers.includes(Layer.RIGHT)) this.drawRight();
    if (this.initailState.layers.includes(Layer.LEFT)) this.drawLeft();
    this.p5.pop();
  }

  public rotate(axis: Axis, clockwise: boolean) {
    switch(axis) {
      case Axis.X:
        this.currentState.rotX += this.p5.HALF_PI * (clockwise ? 1 : -1); break;
      case Axis.Y:
        this.currentState.rotY += this.p5.HALF_PI * (clockwise ? 1 : -1); break;
      case Axis.Z:
        this.currentState.rotZ += this.p5.HALF_PI * (clockwise ? 1 : -1); break;
    }
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

function isOuter(cord: number, positive: boolean): boolean {
  return cord === 1 * (positive ? 1 : -1);
}