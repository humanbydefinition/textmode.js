/**
 * @name [textmode.js] Standalone example
 * @description A simple example of using textmode.js in standalone mode with animated graphics.
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/textmode.js
 * 
 * This example demonstrates how to create a standalone textmodifier instance and 
 * render animated content using the built-in p5.js-like drawing API. 
 */

import { textmode } from '../../dist/textmode.esm.js';

import VertexShader from './shader.vert?raw';
import FragmentShader from './noise.frag?raw';

// Create a standalone textmodifier instance
const t = await textmode.create({
    width: window.innerWidth,
    height: window.innerHeight,
    fontSize: 16
});

//t.fontSize(32);
//t.pipeline.disable();

const shader = t.createShader(VertexShader, FragmentShader);


t.draw(() => {
    t.background(255, 0, 0); // Fill the background with red color

    // Calculate circular motion
    const centerX = t.width / 2;
    const centerY = t.height / 2;
    const radius = Math.min(t.width, t.height) / 3; // Radius for circular motion
    const speed = 0.02; // Adjust speed of rotation

    const angle = t.frameCount * speed;
    const x = centerX + Math.cos(angle) * radius - 100;
    const y = centerY + Math.sin(angle) * radius - 50; 

    t.shader(shader); // Use the custom shader
    t.setUniform('u_bins', 255); // Set the number of bins for quantization
    t.setUniform('u_frameCount', t.frameCount); // Pass the frame count for animation
    t.rect(0, 0, t.width, t.height); // Draw a rectangle covering the entire canvas

    t.fill(255);
    t.rect(x, y, 200, 100); // Draw a white rectangle
});

t.windowResized(() => {
    t.resizeCanvas(window.innerWidth, window.innerHeight);
});