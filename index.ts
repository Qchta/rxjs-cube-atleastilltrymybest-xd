import './style.css'
import P5 from 'p5'


import Qbee from './qbee'


const p5 = new P5(function (p5) {

  
let b = new Qbee(p5, 0, 0, 0, 50);

  p5.setup = () => {
    p5.createCanvas(400, 400, p5.WEBGL);
    p5.frameRate(60);

  }

  p5.draw = () => {
    p5.background(200);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.box(50);
  }
})


