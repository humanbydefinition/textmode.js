/**
 * @name [textmode.js] p5.js WEBGL Example
 * @description A simple example of using textmode.js with p5.js in WEBGL mode.
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/textmode.js
 * 
 * This example demonstrates how to use textmode.js with p5.js in WEBGL mode.
 */

import p5 from 'https://cdn.jsdelivr.net/npm/p5@1.11.9/+esm';
import { textmode } from '../../../dist/textmode.esm.js';

const sketch = (p) => {

  let textmodifier;

  p.setup = async () => {
    p.setAttributes('antialias', false);
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    textmodifier = await textmode.create(p.canvas, { fontSize: 16 });
  };

  p.draw = () => {
    p.clear();
    p.push();
    p.fill(255);
    p.rotateX(p.radians(p.frameCount * 3));
    p.rotateZ(p.radians(p.frameCount));
    p.directionalLight(255, 255, 255, 0, 0, -1);
    p.box(800, 100, 100);
    p.pop();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch);

