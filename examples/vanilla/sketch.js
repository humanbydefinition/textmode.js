/**
 * @name [textmode.js] Vanilla Example
 * @description A simple example of using textmode.js with Vanilla JavaScript.
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/textmode.js
 *
 * This example demonstrates how to use textmode.js with Vanilla JavaScript.
 */

import { textmode } from '../../dist/textmode.esm.js';

class VanillaSketch {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.textmodifier = null;

    this.init();
  }

  async init() {
    this.setupCanvas();

    // Initialize textmodifier after canvas is set up
    this.textmodifier = await textmode.create(this.canvas);

    this.start();
  }

  setupCanvas() {
    const maxWidth = 1000;
    const maxHeight = 700;

    this.canvas.width = maxWidth;
    this.canvas.height = maxHeight;

    this.canvas.style.width = maxWidth + 'px';
    this.canvas.style.height = maxHeight + 'px';
  }

  render() {
    // Fill canvas with solid gray background
    this.ctx.fillStyle = '#222';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();

    // Set font and alignment
    this.ctx.fillStyle = '#fff';
    this.ctx.font = 'bold 256px "JetBrains Mono", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    // Center text horizontally and vertically
    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2;
    this.ctx.fillText('vanilla', x, y);

    this.ctx.restore();
  }

  animate() {
    this.render();
    requestAnimationFrame(this.animate.bind(this));
  }

  start() {
    requestAnimationFrame(this.animate.bind(this));
  }
}

// Initialize the sketch
const sketch = new VanillaSketch('canvas');