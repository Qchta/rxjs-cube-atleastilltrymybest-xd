import P5 from 'p5'
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
  function normal(layer: Layer, p5: P5): P5.Vector {
    switch (layer) {
      case Layer.UP: return p5.createVector(0, -1, 0);
      case Layer.DOWN: return p5.createVector(0, 1, 0);
      case Layer.LEFT: return p5.createVector(-1, 0, 0);
      case Layer.RIGHT: return p5.createVector(1, 0, 0);
      case Layer.FRONT: return p5.createVector(0, 0, 1);
      case Layer.BACK: return p5.createVector(0, 0, -1);
    }
  }

  function color(layer: Layer): string {
    switch (layer) {
      case Layer.UP: return 'White';
      case Layer.DOWN: return 'Yellow';
      case Layer.LEFT: return 'Orange';
      case Layer.RIGHT: return 'Red';
      case Layer.FRONT: return 'Green';
      case Layer.BACK: return 'DodgerBlue';
    }
  }

  export function draw(layer: Layer, p5: P5): void {
    p5.push();
    p5.fill(color(layer));
    let norm = normal(layer, p5);
    p5.translate(norm.div(2));
    if (p5.abs(norm.x) > 0) {
      p5.rotateY(p5.HALF_PI);
    } else if (p5.abs(norm.y) > 0) {
      p5.rotateX(p5.HALF_PI);
    }
    p5.noStroke();
    p5.plane(1, 1);
    p5.pop();
  }

  export function drawNormal(layer: Layer, p5: P5): void {
    p5.push();
    let norm = normal(layer, p5);
    p5.translate(norm.div(2));

    p5.stroke(0.01);
    p5.box(norm.x, norm.y, norm.z);
    p5.pop();
  }

  export function mapWithRotation(layer: Layer, axis: Axis, clockwise: boolean): Layer {
    if (axis === Axis.X) {
      switch (layer) {
        case Layer.FRONT: return clockwise ? Layer.UP : Layer.DOWN;
        case Layer.BACK: return clockwise ? Layer.DOWN : Layer.UP;
        case Layer.UP: return clockwise ? Layer.BACK : Layer.FRONT;
        case Layer.DOWN: return clockwise ? Layer.FRONT : Layer.BACK;
      }
    }
    if (axis === Axis.Y) {
      switch (layer) {
        case Layer.FRONT: return clockwise ? Layer.LEFT : Layer.RIGHT;
        case Layer.BACK: return clockwise ? Layer.RIGHT : Layer.LEFT;
        case Layer.LEFT: return clockwise ? Layer.BACK : Layer.FRONT;
        case Layer.RIGHT: return clockwise ? Layer.FRONT : Layer.BACK;
      }
    }
    if (axis === Axis.Z) {
      switch (layer) {
        case Layer.RIGHT: return clockwise ? Layer.UP : Layer.DOWN;
        case Layer.LEFT: return clockwise ? Layer.DOWN : Layer.UP;
        case Layer.UP: return clockwise ? Layer.RIGHT : Layer.LEFT;
        case Layer.DOWN: return clockwise ? Layer.LEFT : Layer.RIGHT;
      }
    }
    return layer;
  }
}