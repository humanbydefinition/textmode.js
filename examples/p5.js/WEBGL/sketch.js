// examples/sketch.js
import p5 from 'https://cdn.jsdelivr.net/npm/p5@1.11.9/+esm';
import { textmode } from '../../../dist/textmode.esm.js';

import DotGothicFont from '../../assets/fonts/DotGothic16-Regular.ttf';

const sketch = (p) => {

  let textmodifier = null;
  let brightnessConverter = null;
  let brightnessConverter2 = null;
  let customConverter = null;
  let font = null;

  p.preload = () => {
    // Load the font
    font = p.loadFont(DotGothicFont);
  }

  p.setup = async () => {
    p.setAttributes('antialias', false);
    //p.pixelDensity(2);
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    textmodifier = await textmode.create(p.canvas, { fontSize: 16 });
    textmodifier.fontSize(32);
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

    p.push();
    p.translate(250, 250, 0);
    p.textFont(font);
    p.textSize(256);
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(255);
    p.stroke(0);
    p.text('test', 0, 0, 0);
    p.pop();

    if (p.frameCount === 60) {
      // textmodifier.saveSVG({
      //   filename: 'my-ascii-art',
      //   drawMode: 'fill',
      //   includeBackgroundRectangles: true,
      //   strokeWidth: 1.0,
      //   backgroundColor: [0, 0, 0, 255]
      // });

      // p.noLoop();
      // textmodifier.renderMode('manual');

    }

    //console.log("FPS:", textmodifier.frameRate());

    
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch);

