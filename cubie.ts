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
  layers: Map<Layer, Layer>
}

export class Cubie {

  private initailState: CubieState;
  public currentState: CubieState;

  private axises: { [key: number]: { axis: Axis, inverted: boolean }; } = {
    0: { axis: Axis.X, inverted: false },
    1: { axis: Axis.Y, inverted: false },
    2: { axis: Axis.Z, inverted: false }
  };

  private moves = [];

  constructor(
    private p5: P5,
    x: number,
    y: number,
    z: number
  ) {
    let layers: Map<Layer, Layer> = new Map();;
    if (this.isOuter(y, false)) layers.set(Layer.UP, Layer.UP);
    if (this.isOuter(y, true)) layers.set(Layer.DOWN, Layer.DOWN);
    if (this.isOuter(z, true)) layers.set(Layer.FRONT, Layer.FRONT);
    if (this.isOuter(z, false)) layers.set(Layer.BACK, Layer.BACK);
    if (this.isOuter(x, true)) layers.set(Layer.RIGHT, Layer.RIGHT);
    if (this.isOuter(x, false)) layers.set(Layer.LEFT, Layer.LEFT);
    this.initailState = {
      x: x,
      y: y,
      z: z,
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      layers: layers
    };
    this.currentState = { ...this.initailState };
  }

  public draw() {
    this.p5.push();
    this.moves.forEach(move => {
      this.p5.rotate(this.p5.HALF_PI * (move.clockwise ? 1 : -1), Layer.normal(move.layer, this.p5));
    })
    this.p5.translate(this.initailState.x, this.initailState.y, this.initailState.z);
    this.p5.fill(0);
    this.p5.box(0.999);
    this.initailState.layers.forEach(layer => Layer.draw(layer, this.p5));
    this.p5.pop();
  }

  public rotate(mvL: Layer, clockwise: boolean) {
    this.moves.push({ layer: this.currentState.layers.get(mvL), clockwise: clockwise });
    let newLayers: Map<Layer, Layer> = new Map();
    this.currentState.layers.forEach((posL, orgnL) => {
        newLayers.set(
          Layer.mapWithRotation(orgnL, mvL, clockwise), 
          posL);
      });
    this.currentState.layers = newLayers;
  }

  private isOuter(cord: number, positive: boolean): boolean {
    return cord === 1 * (positive ? 1 : -1);
  }

}

