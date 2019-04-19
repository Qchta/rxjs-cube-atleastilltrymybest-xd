import P5 from 'p5'
import { abs, round, floor } from 'math'
import { Qbee } from './qbee'
import './style.css'


new P5(function (p5) {

  let cube: Qbee[] = [];

  p5.setup = () => {
    p5.createCanvas(400, 400, p5.WEBGL);
    p5.frameRate(30);
    p5.smooth();

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          cube.push(new Qbee(p5, x, y, z, {
            isUp: isOuter(y, false),
            isDown: isOuter(y, true),
            isFront: isOuter(z, true),
            isBack: isOuter(z, false),
            isRight: isOuter(x, true),
            isLeft: isOuter(x, false)
          }))
        }
      }
    }
  }

  p5.draw = () => {
    p5.background(200);
    p5.scale(50);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    drawHelpers();
    cube.forEach(qbee => qbee.draw());
  }

  p5.keyPressed = () => {
    if (p5.key == 'a') console.log('a');
    if (p5.key == 'q') console.log('q');
  };

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

  function isOuter(cord: number, positive: boolean): boolean {
    return cord === 1 * (positive ? 1 : -1);
  }

}, 'canvas')


