import P5 from 'p5'

export enum Layer {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    FRONT,
    BACK
}

export namespace Layer {
  export function draw(layer: Layer, p5: P5): void {

    let r = 0.5;
    p5.beginShape();
    switch(layer) {
      case Layer.FRONT:
        p5.fill('Green');
        p5.vertex(r, r, r);
        p5.vertex(r, -r, r);
        p5.vertex(-r, -r, r);
        p5.vertex(-r, r, r);
        break;
      case Layer.BACK:
        p5.fill('DodgerBlue');
        p5.vertex(r, r, -r);
        p5.vertex(r, -r, -r);
        p5.vertex(-r, -r, -r);
        p5.vertex(-r, r, -r);
        break;
      case Layer.RIGHT:
        p5.fill('Red');
        p5.vertex(r, r, r);
        p5.vertex(r, -r, r);
        p5.vertex(r, -r, -r);
        p5.vertex(r, r, -r);
        break;
      case Layer.LEFT:
        p5.fill('Orange');
        p5.vertex(-r, r, r);
        p5.vertex(-r, -r, r);
        p5.vertex(-r, -r, -r);
        p5.vertex(-r, r, -r);
        break;
      case Layer.UP:
        p5.fill('White');
        p5.vertex(r, -r, r);
        p5.vertex(-r, -r, r);
        p5.vertex(-r, -r, -r);
        p5.vertex(r, -r, -r);
        break;
      case Layer.DOWN:
        p5.fill('Yellow');
        p5.vertex(r, r, r);
        p5.vertex(-r, r, r);
        p5.vertex(-r, r, -r);
        p5.vertex(r, r, -r);
        break;
    }
    p5.endShape(p5.CLOSE);
  }
}