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

  private axises: { [key:number]:{axis: Axis, inverted: boolean}; } = {
    0: {axis: Axis.X, inverted: false},
    1: {axis: Axis.Y, inverted: false},
    2: {axis: Axis.Z, inverted: false}
  };

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
    this.p5.fill(0);
    this.p5.box(0.999);
    this.initailState.layers.forEach(layer => Layer.draw(layer, this.p5));
    this.initailState.layers.forEach(layer => Layer.drawNormal(layer, this.p5));
    this.p5.pop();
  }

  public rotate(axis: Axis, clockwise: boolean) {
    console.log(this.currentState);
    switch(this.axises[axis].axis) {
      case Axis.X:
        this.currentState = {...this.currentState, 
          rotX: this.currentState.rotX + this.p5.HALF_PI * (clockwise ? 1 : -1),
          layers: this.currentState.layers.map(layer => Layer.mapWithRotation(layer, axis, clockwise))
        };
        this.axises = {...this.axises,
          1: this.axises[2],
          2: this.axises[1]
        }
        break;
      case Axis.Y:
        this.currentState.rotY += this.p5.HALF_PI * (clockwise ^ this.axises.inverted ? 1 : -1); break;
      case Axis.Z:
        this.currentState.rotZ += this.p5.HALF_PI * (clockwise ^ this.axises.inverted ? 1 : -1); break;
    }
    console.log(this.currentState);
  }

  

  private isOuter(cord: number, positive: boolean): boolean {
    return cord === 1 * (positive ? 1 : -1);
  }

}

