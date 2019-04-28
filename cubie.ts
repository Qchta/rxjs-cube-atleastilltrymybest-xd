import * as THREE from 'three';

import { Layer } from './layer'

export interface CubieState {
  layers: Map<Layer, Layer>
}

export class Cubie {

  private initailState: CubieState;
  public currentState: CubieState;

  private moves = [];
  private mesh: THREE.Object3D;

  constructor(
    x: number,
    y: number,
    z: number,
  ) {
    let layers: Map<Layer, Layer> = new Map();;
    if (this.isOuter(y, false)) layers.set(Layer.UP, Layer.UP);
    if (this.isOuter(y, true)) layers.set(Layer.DOWN, Layer.DOWN);
    if (this.isOuter(z, true)) layers.set(Layer.FRONT, Layer.FRONT);
    if (this.isOuter(z, false)) layers.set(Layer.BACK, Layer.BACK);
    if (this.isOuter(x, true)) layers.set(Layer.RIGHT, Layer.RIGHT);
    if (this.isOuter(x, false)) layers.set(Layer.LEFT, Layer.LEFT);
    this.initailState = {
      layers: layers
    };
    this.currentState = { ...this.initailState };
    
    this.mesh = new THREE.Mesh();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "black" });
    let cube = new THREE.Mesh(geometry, material);
    this.mesh.add(cube);
    cube.position.x += x;
    cube.position.y += y;
    cube.position.z += z;

    this.currentState.layers.forEach((layer) => {
        cube.add(Layer.getMesh(layer));
    });
  }

  public rotate(mvL: Layer, clockwise: boolean) {
    this.mesh.rotateOnAxis(
      Layer.normal(this.currentState.layers.get(mvL)), clockwise ? Math.PI / 2 : -Math.PI / 2);
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

  public getMesh(): THREE.Object3D {
    return this.mesh;
  }

}

