// examples/sketch-2d.js
import p5 from 'https://cdn.jsdelivr.net/npm/p5@1.11.9/+esm';
import { textmode } from '../../../dist/textmode.esm.js';

const sketch = (p) => {

  let textmodifier = null;
  let angle = 0;

  p.setup = async () => {
    // Create a regular 2D canvas (not WebGL)
    p.pixelDensity(1);
    p.createCanvas(p.windowWidth, p.windowHeight);

    // Set up some 2D drawing properties
    p.colorMode(p.HSB, 360, 100, 100);
    p.strokeWeight(2);


    textmodifier = await textmode.create(p.canvas);
  };

  p.draw = () => {
    // Clear the canvas with a dark background
    p.background(220, 20, 10);

    // Draw some 2D graphics
    p.push();
    p.translate(p.width / 2, p.height / 2);

    p.fill(0, 0, 100);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(256);
    p.noStroke();
    p.text('test', -250, -250);
    p.pop();

    // Draw a rotating rectangle
    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.rotate(p.radians(angle));
    p.fill(0, 100, 100);
    p.rectMode(p.CENTER);
    p.rect(0, 0, 200, 100);
    p.pop();

    // Increment the angle for rotation
    angle += 1;


    textmodifier.render();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch);

