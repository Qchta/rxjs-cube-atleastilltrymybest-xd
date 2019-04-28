import * as THREE from 'three';

import { Axis } from './index'

export enum Layer {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  FRONT,
  BACK
}

export namespace Layer {
  export function normal(layer: Layer): THREE.Vector3 {
    switch (layer) {
      case Layer.UP: return new THREE.Vector3(0, -1, 0);
      case Layer.DOWN: return new THREE.Vector3(0, 1, 0);
      case Layer.LEFT: return new THREE.Vector3(-1, 0, 0);
      case Layer.RIGHT: return new THREE.Vector3(1, 0, 0);
      case Layer.FRONT: return new THREE.Vector3(0, 0, 1);
      case Layer.BACK: return new THREE.Vector3(0, 0, -1);
    }
  }

  function color(layer: Layer): string {
    switch (layer) {
      case Layer.UP: return 'white';
      case Layer.DOWN: return 'yellow';
      case Layer.LEFT: return 'orange';
      case Layer.RIGHT: return 'red';
      case Layer.FRONT: return 'green';
      case Layer.BACK: return 'dodgerblue';
    }
  }

  export function getMesh(layer: Layer): THREE.Object3D {
    let nrml = normal(layer);
    const geometry = new THREE.PlaneGeometry(.9, .9);
    const material = new THREE.MeshBasicMaterial({ color: color(layer), side: THREE.DoubleSide });
    let cube = new THREE.Mesh(geometry, material);
    cube.position.add(nrml.divideScalar(1.99));
    
    if (Math.abs(nrml.x) > 0) {
      cube.rotateY(Math.PI / 2);
    } else if (Math.abs(nrml.y) > 0) {
      cube.rotateX(Math.PI / 2);
    }

    return cube;
  }

  export function mapWithRotation(layer: Layer, movingLayer: Layer, clockwise: boolean): Layer {
    if (movingLayer === Layer.LEFT || movingLayer === Layer.DOWN || movingLayer === Layer.BACK) {
      clockwise = !clockwise
    }
    if (movingLayer === Layer.RIGHT || movingLayer === Layer.LEFT) {
      switch (layer) {
        case Layer.FRONT: return clockwise ? Layer.UP : Layer.DOWN;
        case Layer.BACK: return clockwise ? Layer.DOWN : Layer.UP;
        case Layer.UP: return clockwise ? Layer.BACK : Layer.FRONT;
        case Layer.DOWN: return clockwise ? Layer.FRONT : Layer.BACK;
      }
    }
    if (movingLayer === Layer.UP || movingLayer === Layer.DOWN) {
      switch (layer) {
        case Layer.FRONT: return clockwise ? Layer.LEFT : Layer.RIGHT;
        case Layer.BACK: return clockwise ? Layer.RIGHT : Layer.LEFT;
        case Layer.LEFT: return clockwise ? Layer.BACK : Layer.FRONT;
        case Layer.RIGHT: return clockwise ? Layer.FRONT : Layer.BACK;
      }
    }
    if (movingLayer === Layer.FRONT || movingLayer === Layer.BACK) {
      switch (layer) {
        case Layer.RIGHT: return clockwise ? Layer.DOWN : Layer.UP;
        case Layer.LEFT: return clockwise ? Layer.UP : Layer.DOWN;
        case Layer.UP: return clockwise ? Layer.RIGHT : Layer.LEFT;
        case Layer.DOWN: return clockwise ? Layer.LEFT : Layer.RIGHT;
      }
    }
    return layer;
  }
}