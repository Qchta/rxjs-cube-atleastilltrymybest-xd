import './style.css'
import P5 from 'p5'
import { Qbee } from './qbee'


const p5 = new P5(function (p5) {

  const dim = 3;
  let cube: Qbee[][][];

  p5.setup = () => {
    p5.createCanvas(400, 400, p5.WEBGL);
    p5.frameRate(30);
    p5.smooth();

    cube = new Array(dim);
    for(let i = 0; i < dim; i++) {
      cube[i] = new Array(dim);
      for(let j = 0; j < dim; j++) {
        cube[i][j] = new Array(dim);
        for(let k = 0; k < dim; k++) {
          cube[i][j][k] = new Qbee(p5, i, j, k, 50, {
            isUp: j === 0,
            isDown: j === dim -1,
            isFront: k === dim - 1,
            isBack: k === 0,
            isRight: i === dim -1,
            isLeft: i === 0
          });
        }
      }
    }
  }

  p5.draw = () => {
    p5.background(200);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    drawHelpers();
    for(let i = 0; i < dim; i++) {
      for(let j = 0; j < dim; j++) {
        for(let k = 0; k < dim; k++) {
          cube[i][j][k].draw();
        }
      }
    }
  }

  function drawHelpers() {
    p5.push();
    p5.translate(200,0,0);
    p5.stroke('red');
    p5.box(400,0,0);
    p5.pop();
    p5.push();
    p5.translate(0,200,0);
    p5.stroke('green');
    p5.box(0,400,0);
    p5.pop();
    p5.push();
    p5.translate(0,0,200);
    p5.stroke('blue');
    p5.box(0,0,400);
    p5.pop();
  }
})


