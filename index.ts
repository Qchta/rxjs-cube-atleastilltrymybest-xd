import './style.css'
import P5 from 'p5'
import { Qbee } from './qbee'


const p5 = new P5(function (p5) {

  const dim = 3;
  let cube: Qbee[][][];

  p5.setup = () => {
    p5.createCanvas(400, 400, p5.WEBGL);
    p5.frameRate(60);

    cube = new Array(dim);
    for(let i = 0; i < dim; i++) {
      cube[i] = new Array(dim);
      for(let j = 0; j < dim; j++) {
        cube[i][j] = new Array(dim);
        for(let k = 0; k < dim; k++) {
          cube[i][j][k] = new Qbee(p5, i, j, k, 50);
        }
      }
    }
  }

  p5.draw = () => {
    p5.background(200);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    for(let i = 0; i < dim; i++) {
      for(let j = 0; j < dim; j++) {
        for(let k = 0; k < dim; k++) {
          cube[i][j][k].
        }
      }
    }
  }
})


