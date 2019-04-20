import P5 from 'p5'
import { abs, round, floor } from 'math'
import { of, from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Qbee, Side } from './qbee'
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
          // if (x === 0 || y === 0 || z === 0) continue;
          cube.push(new Qbee(p5, x, y, z));
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
    cube.forEach(qbee => qbee.draw());
  }

  p5.keyPressed = () => {
    switch (p5.key) {
      case 'f': 
        from(cube).pipe(
          filter(qbee => qbee.purpose.isFront),

        ).forEach(qbee => qbee.move(Side.FRONT)); 
        break;
      case 'F': console.log('F'); break;
    }
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

}, 'canvas')


