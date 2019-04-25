import P5 from 'p5'
import { of, from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Cubie } from './cubie'
import { Layer } from './layer'
import './style.css'

export enum Axis {
  X, Y, Z
}

new P5(function (p5) {

  let cube: Cubie[] = [];
  let cameraOn = true;

  let rotX = 0;
  let rotY = 0;

  let rotXd = 0;
  let rotYd = 0;

  let mouseX = 0;
  let mouseY = 0;

  p5.setup = () => {
    p5.createCanvas(400, 400, p5.WEBGL);
    p5.frameRate(30);
    p5.smooth();

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          // if (x !== 1) continue;
          cube.push(new Cubie(p5, x, y, z));
        }
      }
    }
    // cube.push(new Cubie(p5, -1, -1, -1));
  }

  p5.draw = () => {

    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      rotY -= 5;
    }

    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
      rotY += 5;
    }

    if (p5.keyIsDown(p5.UP_ARROW)) {
      rotX += 5;
    }

    if (p5.keyIsDown(p5.DOWN_ARROW)) {
      rotX -= 5;
    }

    let angleY = (rotY + rotYd) * 0.01;
    let angleX = (rotX + rotXd) * 0.01;

    p5.rotate(angleY, p5.createVector(0, 1, 0));
    p5.rotate(angleX, p5.createVector(p5.cos(angleY), 0, p5.sin(angleY)));

    //if(cameraOn) p5.orbitControl();
    // p5.debugMode();
    p5.background(200);
    p5.scale(40);
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
      case 'q':
        cameraOn = !cameraOn
    }
  };

  function rotate(layer: Layer, clockwise: boolean) {
    from(cube).pipe(
      filter(qb => qb.currentState.layers.has(layer)),

    ).forEach(qb => qb.rotate(layer, clockwise));
  }

  function layerToAxis(layer: Layer): Axis {
    switch (layer) {
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

}, 'canvas')


