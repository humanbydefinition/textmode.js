import { TextmodeFont } from './font';
import { TextmodeGrid } from './Grid';
import { TextmodeConversionPipeline } from './ConversionPipeline';
import type { TextmodeConverter } from './converters';
import { type SVGExportOptions } from '../export/svg';
/**
 * Options for creating a {@link Textmodifier} instance.
 */
export type TextmodeOptions = {
    /** The font size to use for text rendering. Defaults to 16. */
    fontSize?: number;
    /**
     * Automatic rendering mode. Defaults to 'auto'.
     * - 'manual': Requires manual `render()` calls
     * - 'auto': Automatically renders using requestAnimationFrame
     */
    renderMode?: 'manual' | 'auto';
    /** Maximum frames per second for auto rendering. Defaults to 120. */
    frameRate?: number;
};
/**
 * Manages textmode rendering on a canvas.
 *
 * Each `Textmodifier` instance is applied to a specific HTML canvas element via `textmode.create()`.
 */
export declare class Textmodifier {
    /** The canvas element to capture content from */
    private captureCanvas;
    /** Our WebGL overlay canvas manager */
    private textmodeCanvas;
    /** Core WebGL renderer */
    private renderer;
    private canvasFramebuffer;
    private _font;
    private _grid;
    private resizeObserver;
    private _mode;
    private _frameRateLimit;
    private animationFrameId;
    private lastFrameTime;
    private frameInterval;
    private _frameRate;
    private lastRenderTime;
    private _frameCount;
    private _pipeline;
    private constructor();
    /**
     * Static factory method for creating and initializing a Textmodifier instance.
     * @param canvas The HTML canvas element to capture content from.
     * @param opts Optional configuration options for the `Textmodifier` instance.
     * @ignore
     */
    static create(canvas: HTMLCanvasElement, opts?: TextmodeOptions): Promise<Textmodifier>;
    private setupEventListeners;
    /**
     * Export the current textmode rendering to an SVG file.
     * @param options Options for SVG export
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = await textmode.create(canvas, {renderMode: 'manual'});
     *
     * // Render a single frame
     * textmodifier.render();
     *
     * // Export the current rendering to an SVG file
     * textmodifier.saveSVG({
     *   filename: 'my_textmode_rendering',
     * });
     * ```
     */
    saveSVG(options?: SVGExportOptions): void;
    /**
     * Update the font used for rendering.
     * @param fontUrl The URL of the font to load.
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = await textmode.create(canvas);
     *
     * // Load a custom font from a URL
     * textmodifier.loadFont('https://example.com/fonts/myfont.ttf');
     *
     * // Local font example
     * // textmodifier.loadFont('./fonts/myfont.ttf');
     * ```
     */
    loadFont(fontUrl: string): Promise<void>;
    /**
     * Apply textmode rendering to the canvas.
     *
     * **Note:** In `'auto'` mode, this is called automatically.
     * In `'manual'` mode, you need to call this method when you want to update the textmode rendering.
     *
     * @example
     * ```javascript
     * // p5.js example
     *
     * let textmodifier;
     *
     * // p5.js setup function
     * async function setup() {
     *
     *   // Create a p5.js canvas
     *   const canvas = createCanvas(800, 600);
     *
     *   // Create a Textmodifier instance
     *   textmodifier = await textmode.create(canvas.elt);
     *
     *   // Update the rendering mode to 'manual'
     *   textmodifier.renderMode('manual');
     * }
     *
     * // p5.js draw function
     * function draw() {
     *
     *   // Draw something on the p5.js canvas
     *   background(220);
     *   fill(255, 0, 0);
     *   rect(50, 50, 100, 100);
     *
     *   // Apply textmode rendering
     *   textmodifier.render();
     * }
     * ```
     */
    render(): void;
    private resize;
    /**
     * Start automatic rendering
     */
    private startAutoRendering;
    /**
     * Update FPS measurement - works for both auto and manual modes
     */
    private measureFrameRate;
    /**
     * Stop automatic rendering
     */
    private stopAutoRendering;
    /**
     * Update the rendering mode.
     *
     * If called without arguments, returns the current mode.
     *
     * - `'manual'`: Requires manual [render](#render) calls
     * - `'auto'`: Automatically renders using [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
     *
     * @param mode The new rendering mode to set.
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = await textmode.create(canvas);
     *
     * // Update the rendering mode to 'manual'
     * textmodifier.renderMode('manual');
     *
     * // Now you need to call textmodifier.render() manually in your animation loop
     * ```
     */
    renderMode(mode?: 'manual' | 'auto'): void | 'auto' | 'manual';
    /**
     * Set the maximum frame rate for auto rendering. If called without arguments, returns the current measured frame rate.
     * @param fps The maximum frames per second for auto rendering.
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = await textmode.create(canvas);
     *
     * // Set the maximum frame rate to 60 FPS
     * textmodifier.frameRate(60);
     * ```
     */
    frameRate(fps?: number): number | void;
    /**
     * Get or set the font size used for rendering.
     * If called without arguments, returns the current font size.
     * @param size The font size to set. If undefined, returns the current font size.
     * @returns `void` if setting the size, or the current font size if called without arguments.
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = await textmode.create(canvas);
     *
     * // Set the font size to 24
     * textmodifier.fontSize(24);
     * ```
     */
    fontSize(size?: number): void | number;
    /**
     * Get a specific converter by name.
     * @param name The name of the converter to retrieve.
     * @returns The requested `TextmodeConverter` instance.
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = await textmode.create(canvas);
     *
     * // Get the pre-defined brightness converter from the pipeline
     * const brightnessConverter = textmodifier.converter('brightness');
     *
     * // Update properties of the brightness converter
     * brightnessConverter.invert(true);
     * brightnessConverter.characters(" .,;:*");
     * ```
     */
    converter(name: string): TextmodeConverter | void;
    /** Get the current grid object used for rendering. */
    get grid(): TextmodeGrid;
    /** Get the current font object used for rendering. */
    get font(): TextmodeFont;
    /** Get the current rendering mode.*/
    get mode(): 'manual' | 'auto';
    /** Get the current textmode conversion pipeline */
    get pipeline(): TextmodeConversionPipeline;
    /** Get the current frame count. */
    get frameCount(): number;
}
