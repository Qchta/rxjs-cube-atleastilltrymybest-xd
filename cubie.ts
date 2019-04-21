import P5 from 'p5'
import { Axis } from './index'
import { Layer } from './layer'

export interface CubieState {
  x: number,
  y: number,
  z: number,
  rotX: number,
  rotY: number,
  rotZ: number,
  layers: Array<Layer>
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
    if(this.isOuter(y, false))layers.push(Layer.UP);
    if(this.isOuter(y, true))layers.push(Layer.DOWN);
    if(this.isOuter(z, true))layers.push(Layer.FRONT);
    if(this.isOuter(z, false))layers.push(Layer.BACK);
    if(this.isOuter(x, true))layers.push(Layer.RIGHT);
    if(this.isOuter(x, false))layers.push(Layer.LEFT);
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
    this.initailState.layers.forEach(layer => Layer.draw(layer, this.p5));
    this.p5.pop();
  }

  public rotate(axis: Axis, clockwise: boolean) {
    switch(axis) {
      case Axis.X:
        this.currentState.rotX += this.p5.HALF_PI * (clockwise ? 1 : -1);
        this.currentState = {...this.currentState,
          rotX: this.currentState.rotX += this.p5.HALF_PI * (clockwise ? 1 : -1),
          layers: layers
        };
        break;
      case Axis.Y:
        this.currentState.rotY += this.p5.HALF_PI * (clockwise ? 1 : -1); break;
      case Axis.Z:
        this.currentState.rotZ += this.p5.HALF_PI * (clockwise ? 1 : -1); break;
    }
  }

  

  private isOuter(cord: number, positive: boolean): boolean {
    return cord === 1 * (positive ? 1 : -1);
  }

}

