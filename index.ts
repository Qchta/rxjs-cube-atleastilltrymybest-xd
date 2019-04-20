import P5 from 'p5'
import { of, from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Cubie, Layer } from './cubie'
import './style.css'

export enum Axis {
  X, Y, Z
}

new P5(function (p5) {

  let cube: Cubie[] = [];

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
          // if (y !== -1) continue;
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

    p5.background(200);
    p5.scale(50);
    p5.rotateX(-p5.HALF_PI / 3);
    p5.rotateY(-p5.HALF_PI / 3);
    p5.push();

    // let sinx = p5.sin((rotX + rotXd) * 0.01);
    // let cosx = p5.cos((rotX + rotXd) * 0.01);
    // let siny = p5.sin((rotY + rotYd) * 0.01);
    // let cosy = p5.cos((rotY + rotYd) * 0.01);

    // p5.applyMatrix(
    //   cosy,       0,    -siny,      0,
    //   -sinx*siny, cosx, -sinx*cosy, 0,
    //   cosx*siny,  sinx, cosx*cosy,  0,
    //   0,          0,    0,          1,
    // )

    p5.rotateY((rotY + rotYd) * 0.01);
    p5.rotateX(p5.cos(rotY + rotYd) * p5.cos(rotY + rotYd) * (rotX + rotXd) * 0.01);
    p5.rotateZ(p5.sin(rotY + rotYd) * p5.sin(rotY + rotYd) * (rotX + rotXd) * 0.01);

    cube.forEach(qb => qb.draw());
    p5.pop();
    drawHelpers();
  }

  p5.keyPressed = () => {
    switch (p5.key) {
      case 'f':
        rotate(Layer.FRONT, true); break;
      case 'F':
        rotate(Layer.FRONT, false); break;
      case 'b':
        rotate(Layer.BACK, false); break;
      case 'B':
        rotate(Layer.BACK, true); break;
      case 'r':
        rotate(Layer.RIGHT, true); break;
      case 'R':
        rotate(Layer.RIGHT, false); break;
      case 'l':
        rotate(Layer.LEFT, false); break;
      case 'L':
        rotate(Layer.LEFT, true); break;
      case 'u':
        rotate(Layer.UP, false); break;
      case 'U':
        rotate(Layer.UP, true); break;
      case 'd':
        rotate(Layer.DOWN, true); break;
      case 'D':
        rotate(Layer.DOWN, false); break;
    }
  };

  p5.mousePressed = () => {
    mouseX = p5.mouseX;
    mouseY = p5.mouseY;
  }

  p5.mouseDragged = () => {
    rotYd = p5.mouseX - mouseX;
    rotXd = -(p5.mouseY - mouseY);
  }

  p5.mouseReleased = () => {
    rotY += rotYd;
    rotX += rotXd;
    rotYd = 0;
    rotXd = 0;
  }

  function rotate(layer: Layer, clockwise: boolean) {
    from(cube).pipe(
      filter(qb => qb.currentState.layers.includes(layer)),

    ).forEach(qb => qb.rotate(layerToAxis(layer), clockwise));
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


