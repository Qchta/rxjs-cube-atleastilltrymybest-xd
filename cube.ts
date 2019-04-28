import * as THREE from 'three';

import { Cubie } from './cubie'

export class Cube {
  
  public cubies: Cubie[] = [];
  private mesh: THREE.Object3D;

  constructor() {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          this.cubies.push(new Cubie(x, y, z));
        }
      }
    }
    this.mesh = new THREE.Mesh();
    this.cubies.forEach(cubie => {
      this.mesh.add(cubie.getMesh());
    })
  }

  public getMesh(): THREE.Object3D {
    return this.mesh;
  }
}