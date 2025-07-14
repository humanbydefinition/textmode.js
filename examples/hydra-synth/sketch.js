// Import the libraries
import hydraSynth from 'https://cdn.jsdelivr.net/npm/hydra-synth@1.3.29/+esm';
import { Textmodifier } from '../../dist/textmode.esm.js';

// Initialize hydra-synth
const hydraInstance = new hydraSynth({
    makeGlobal: false,
    detectAudio: false,
    width: window.innerWidth,
    height: window.innerHeight
});

const hydra = hydraInstance.synth;

// Create animated pattern with hydra
hydra.osc().rotate().out();

// Get the canvas that hydra is rendering to
const canvas = hydraInstance.canvas;

// Initialize textmodifier
const textmodifier = await Textmodifier.create(canvas);

// Configure the text effect
textmodifier.brightnessConverter.characters("abcdefghijklmnopqrstuvwxyz");

// Start the render loop
function render() {
    textmodifier.render();
    requestAnimationFrame(render);
}

// Handle window resize
window.addEventListener('resize', () => {
    hydra.setResolution(window.innerWidth, window.innerHeight);
});

// Start rendering
render();
