import { TextmodeFont } from './font';
import { TextmodeGrid } from './Grid';
import { TextmodeConversionPipeline } from './ConversionPipeline';
import type { TextmodeConverter } from './converters';
import { type SVGExportOptions } from '../export/svg';
import { type TXTExportOptions } from '../export/txt';
import { type ImageExportOptions } from '../export/image';
import type { Shader } from '../rendering';
/**
 * Supported capture sources for textmode rendering
 */
export type CaptureSource = HTMLCanvasElement | HTMLVideoElement;
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
    /** Maximum frames per second for auto rendering. Defaults to 60. */
    frameRate?: number;
    /** The width of the canvas in standalone mode. Defaults to 800. */
    width?: number;
    /** The height of the canvas in standalone mode. Defaults to 600. */
    height?: number;
    /**
     * URL or path to a custom font file (.otf/.ttf).
     * Required when using minified builds that don't include embedded fonts.
     * Optional for full builds (will override embedded font if provided).
     */
    fontSource?: string;
};
/**
 * Manages textmode rendering on a canvas or video element.
 *
 * Each `Textmodifier` instance can be applied to a specific HTML canvas or video element via {@link textmode.create},
 * or created as a standalone instance for independent rendering.
 */
export declare class Textmodifier {
    /** The element to capture content from (optional for standalone mode) */
    private captureSource;
    /** Our WebGL overlay canvas manager */
    private textmodeCanvas;
    /** Core WebGL renderer */
    private _renderer;
    private _canvasFramebuffer;
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
    private frameTimeHistory;
    private frameTimeHistorySize;
    private _pipeline;
    private _standalone;
    private _drawCallback;
    private _resizedCallback;
    private constructor();
    /**
     * Static factory method for creating and initializing a Textmodifier instance.
     * @param source The HTML canvas or video element to capture content from. Pass `null` for standalone mode.
     * @param opts Optional configuration options for the `Textmodifier` instance.
     * @ignore
     */
    static create(source?: CaptureSource | null, opts?: TextmodeOptions): Promise<Textmodifier>;
    private setupEventListeners;
    /**
     * Generate the current textmode rendering as a text string.
     * @param options Options for text generation *(excluding filename)*
     * @returns Textmode grid content as a string.
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
     * // Get the current rendering as a text string
     * const textString = textmodifier.toString({
     *   preserveTrailingSpaces: false,
     *   lineEnding: 'lf'
     * });
     *
     * // Print to console or use otherwise
     * console.log(textString);
     *
     * ////////
     *
     * // Example with video element
     * const video = document.querySelector('video#myVideo');
     * const videoTextmodifier = await textmode.create(video);
     *
     * // The textmode overlay will automatically update as the video plays
     * video.play();
     *
     * // Get current frame as ASCII
     * const videoFrame = videoTextmodifier.toString();
     * ```
     */
    toString(options?: Omit<TXTExportOptions, 'filename'>): string;
    /**
     * Export the current textmode rendering to a TXT file.
     * @param options Options for TXT export
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
     * // Export the current rendering to a TXT file
     * textmodifier.saveStrings({
     *   filename: 'my_textmode_rendering',
     *   preserveTrailingSpaces: false
     * });
     * ```
     */
    saveStrings(options?: TXTExportOptions): void;
    /**
     * Generate the current textmode rendering as an SVG string.
     * @param options Options for SVG generation *(excluding filename)*
     * @returns SVG content as a string.
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
     * // Get the current rendering as an SVG string
     * const svgString = textmodifier.toSVG({
     *   includeBackgroundRectangles: true,
     *   drawMode: 'fill'
     * });
     *
     * // Print to console or use otherwise
     * console.log(svgString);
     * ```
     */
    toSVG(options?: Omit<SVGExportOptions, 'filename'>): string;
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
     * Export the current textmode rendering to an image file.
     * @param filename The filename (without extension) to save the image as
     * @param format The image format ('png', 'jpg', or 'webp')
     * @param options Additional options for image export
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
     * // Export the current rendering to a PNG file
     * textmodifier.saveCanvas('my_textmode_rendering', 'png');
     *
     * // Export with custom options
     * textmodifier.saveCanvas('my_textmode_rendering', 'jpg', {
     *   quality: 0.8,
     *   scale: 2.0,
     *   backgroundColor: 'white'
     * });
     * ```
     */
    saveCanvas(filename: string, format: 'png' | 'jpg' | 'webp', options?: Omit<ImageExportOptions, 'filename' | 'format'>): Promise<void>;
    /**
     * Update the font used for rendering.
     * @param fontSource The URL of the font to load.
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
     * await textmodifier.loadFont('https://example.com/fonts/myfont.ttf');
     *
     * // Local font example
     * // await textmodifier.loadFont('./fonts/myfont.ttf');
     * ```
     */
    loadFont(fontSource: string): Promise<void>;
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
     * Uses a rolling average for smoother frame rate reporting
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
     * // Set the maximum frame rate to 30 FPS
     * textmodifier.frameRate(30);
     * ```
     */
    frameRate(fps?: number): number | void;
    /**
     * Set the font size used for rendering.
     * @param size The font size to set.
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
    fontSize(size: number): void;
    /**
     * Set a draw callback function that will be executed before each render.
     * This method is primarily useful for standalone textmodifier instances.
     * @param callback The function to call before each render
     *
     * @example
     * ```javascript
     * // Create a standalone textmodifier instance
     * const t = await textmode.create({
     *  width: 800,
     *  height: 600,
     * });
     *
     * // Set up draw callback
     * t.draw(() => {
     *   // Set background color
     *   t.background(128);
     *
     *   // Draw some content
     *   t.fill(255, 0, 0); // Set fill color to red
     *   t.rect(50, 50, 100, 100);
     * });
     * ```
     */
    draw(callback: () => void): void;
    /**
     * Set a callback function that will be called when the window is resized.
     * @param callback The function to call when the window is resized.
     *
     * @example
     * ```javascript
     * // Create a standalone textmodifier instance
     * const t = await textmode.create({
     *  width: window.innerWidth,
     *  height: window.innerHeight,
     * });
     *
     * // Draw callback to update content
     * t.draw(() => {
     *   // Set background color
     *   t.background(128);
     *
     *   // Draw some content
     *   t.fill(255, 0, 0); // Set fill color to red
     *   t.rect(50, 50, 100, 100);
     * });
     *
     * // Set up window resize callback
     * t.windowResized(() => {
     *   // Resize the canvas to match window size
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     *
     */
    windowResized(callback: () => void): void;
    /**
     * Resize the `textmode.js` canvas.
     * @param width The new width of the canvas.
     * @param height The new height of the canvas.
     */
    resizeCanvas(width: number, height: number): void;
    /**
     * @inheritDoc TextmodeConversionPipeline.get
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
    /**
     * Sets the fill color for subsequent rendering operations
     * @param r Red component (0-255)
     * @param g Green component (0-255, optional)
     * @param b Blue component (0-255, optional)
     * @param a Alpha component (0-255, optional)
     *
     * @example
     * ```javascript
     * const t = await textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   // Set the background color to black
     *   t.background(0);
     *
     *   const centerX = t.width / 2;
     *   const centerY = t.height / 2;
     *   const radius = Math.min(t.width, t .height) / 3;
     *   const speed = 0.02; // Adjust speed of rotation
     *
     *   const angle = t.frameCount * speed;
     *   const x = centerX + Math.cos(angle) * radius - 100;
     *   const y = centerY + Math.sin(angle) * radius - 50;
     *
     *   // Set the fill color to white
     *   t.fill(255);
     *
     *   // Draw a rectangle with the fill color
     *   t.rect(x, y, 200, 150);
     * });
     * ```
     */
    fill(r: number, g?: number, b?: number, a?: number): void;
    /**
     * Draw a rectangle with the current shader or fill color.
     * @param x X-coordinate of the rectangle
     * @param y Y-coordinate of the rectangle
     * @param width Width of the rectangle
     * @param height Height of the rectangle
     *
     * @example
     * ```javascript
     * const t = await textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   // Set the background color to black
     *   t.background(0);
     *
     *   const centerX = t.width / 2;
     *   const centerY = t.height / 2;
     *   const radius = Math.min(t.width, t .height) / 3;
     *   const speed = 0.02; // Adjust speed of rotation
     *
     *   const angle = t.frameCount * speed;
     *   const x = centerX + Math.cos(angle) * radius - 100;
     *   const y = centerY + Math.sin(angle) * radius - 50;
     *
     *   // Set the fill color to white
     *   t.fill(255);
     *
     *   // Draw a rectangle with the fill color
     *   t.rect(x, y, 200, 150);
     * });
     * ```
     */
    rect(x: number, y: number, width?: number, height?: number): void;
    /**
     * Set the background color for the canvas.
     * @param r Red component (0-255)
     * @param g Green component (0-255, optional)
     * @param b Blue component (0-255, optional)
     * @param a Alpha component (0-255, optional)
     *
     * @example
     * ```javascript
     * const t = await textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   // Set the background color to black
     *   t.background(0);
     *
     *   const centerX = t.width / 2;
     *   const centerY = t.height / 2;
     *   const radius = Math.min(t.width, t .height) / 3;
     *   const speed = 0.02; // Adjust speed of rotation
     *
     *   const angle = t.frameCount * speed;
     *   const x = centerX + Math.cos(angle) * radius - 100;
     *   const y = centerY + Math.sin(angle) * radius - 50;
     *
     *   // Set the fill color to white
     *   t.fill(255);
     *
     *   // Draw a rectangle with the fill color
     *   t.rect(x, y, 200, 150);
     * });
     * ```
     */
    background(r: number, g?: number, b?: number, a?: number): void;
    /**
     * Create a shader program from vertex and fragment source code.
     * @param vertexSource The GLSL source code for the vertex shader.
     * @param fragmentSource The GLSL source code for the fragment shader.
     * @returns The created shader program for use in `textmode.js`.
     */
    createShader(vertexSource: string, fragmentSource: string): Shader;
    /**
     * Set the current shader for rendering.
     * @param shader The shader program to use for rendering.
     */
    shader(shader: Shader): void;
    /**
     * Set a uniform variable for the current shader.
     * @param name The name of the uniform variable to set.
     * @param value The value to set for the uniform variable.
     */
    setUniform(name: string, value: any): void;
    /** Get the current grid object used for rendering. */
    get grid(): TextmodeGrid;
    /** Get the current font object used for rendering. */
    get font(): TextmodeFont;
    /** Get the current rendering mode.*/
    get mode(): 'manual' | 'auto';
    /** Get the current textmode conversion pipeline. */
    get pipeline(): TextmodeConversionPipeline;
    /** Get the current frame count. */
    get frameCount(): number;
    /** Get the width of the canvas. */
    get width(): number;
    /** Get the height of the canvas. */
    get height(): number;
}
