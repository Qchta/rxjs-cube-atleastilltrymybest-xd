import P5 from 'p5'
import { of, from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Cubie, Layer } from './cubie'
import './style.css'

export enum Axis {
  X,Y,Z
}

new P5(function (p5) {

  let cube: Cubie[] = [];

  p5.setup = () => {
    p5.createCanvas(400, 400, p5.WEBGL);
    p5.frameRate(30);
    p5.smooth();

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          // if (x === 0 || y === 0 || z === 0) continue;
          cube.push(new Cubie(p5, x, y, z));
        }
      }
    }
  }

  p5.draw = () => {
    p5.background(200);
    p5.scale(50);
    p5.rotateX(-p5.HALF_PI / 3);
    p5.rotateY(-p5.HALF_PI / 3);
    drawHelpers();
    cube.forEach(qb => qb.draw());
  }

  p5.keyPressed = () => {
    switch (p5.key) {
      case 'f': 
        rotate(Layer.FRONT, true); break;
      case 'F':
        rotate(Layer.FRONT, false); break;
      case 'b': 
        rotate(Layer.BACK, true); break;
      case 'B':
        rotate(Layer.BACK, false); break;
      case 'r': 
        rotate(Layer.RIGHT, true); break;
      case 'R':
        rotate(Layer.RIGHT, false); break;
      case 'l': 
        rotate(Layer.LEFT, true); break;
      case 'L':
        rotate(Layer.LEFT, false); break;
      case 'u': 
        rotate(Layer.UP, true); break;
      case 'U':
        rotate(Layer.UP, false); break;
      case 'd': 
        rotate(Layer.DOWN, true); break;
      case 'D':
        rotate(Layer.DOWN, false); break;
    }
  };

  function rotate(layer: Layer, clockwise: boolean) {
    from(cube).pipe(
      filter(qb => qb.currentState.layers.includes(layer)),
      
    ).forEach(qb => qb.rotate(layerToAxis(layer), clockwise)); 
  }

  function layerToAxis(layer: Layer): Axis {
    switch(layer) {
      case Layer.FRONT:
      case Layer.BACK:
        return Axis.Z;
      case Layer.UP:
      case Layer.DOWN:
        return Axis.Y;
      case Layer.LEFT:
      case Layer.RIGHT:
        return Axis.X;
    }
  }

  function drawHelpers() {
    p5.push();
    p5.translate(200, 0, 0);
    p5.stroke('red');
    p5.box(400, 0, 0);
    p5.pop();
    p5.push();
    p5.translate(0, 200, 0);
    p5.stroke('green');
    p5.box(0, 400, 0);
    p5.pop();
    p5.push();
    p5.translate(0, 0, 200);
    p5.stroke('blue');
    p5.box(0, 0, 400);
    p5.pop();
  }

}, 'canvas')


