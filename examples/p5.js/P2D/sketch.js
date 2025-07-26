/**
 * @name [textmode.js] p5.js P2D Example
 * @description A simple example of using textmode.js with p5.js in P2D mode.
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/textmode.js
 * 
 * This example demonstrates how to use textmode.js with p5.js in P2D mode.
 */

import p5 from 'https://cdn.jsdelivr.net/npm/p5@1.11.9/+esm';
import { textmode } from '../../../dist/textmode.esm.js';

const sketch = (p) => {

  let textmodifier = null;
  let angle = 0;

  p.setup = async () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    p.colorMode(p.HSB, 360, 100, 100);
    p.strokeWeight(2);

    textmodifier = await textmode.create(p.canvas);
  };

  p.draw = () => {
    // Clear the canvas with a dark background
    p.background(220, 20, 10);

    // Draw some 2D text
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
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch);

