import { Textmodifier } from '../../../dist/textmode.esm.js';

import DotGothicFont from '../../assets/fonts/DotGothic16-Regular.ttf';
import BesciiFont from '../../assets/fonts/Bescii-Mono.ttf';

const sketch = (p) => {

  let textmodifier = null;
  let font = null;

  p.preload = () => {
    // Load the font
    font = p.loadFont(DotGothicFont);
  }

  p.setup = async () => {
    p.setAttributes('antialias', false);
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    textmodifier = await Textmodifier.create(p.canvas);

    textmodifier.brightnessConverter.backgroundColor(255, 0, 0, 255);

    await textmodifier.loadFont(BesciiFont);

    textmodifier.brightnessConverter.characters("←↖↑↗→↓↘↙");
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

    // Only render if textmodifier is initialized
    if (textmodifier && textmodifier.isInitialized()) {
      textmodifier.render();
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch);