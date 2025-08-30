import { GLRenderer } from '../rendering/webgl/Renderer';
import { TextmodeFont } from './font';
import { TextmodeGrid } from './Grid';
import { TextmodeCanvas } from './Canvas';
import { TextmodeConversionPipeline } from './ConversionPipeline';
import { type TextmodifierContext } from './mixins';
import type { RenderingCapabilities } from './mixins/RenderingMixin';
import type { ExportCapabilities } from './mixins/ExportMixin';
import type { FontCapabilities } from './mixins/FontMixin';
import type { ConversionCapabilities } from './mixins/ConversionMixin';
/**
 * Supported capture sources for textmode rendering.
 * @ignore
 */
export type TextmodeCaptureSource = HTMLCanvasElement | HTMLVideoElement;
/**
 * Options for creating a {@link Textmodifier} instance.
 */
export type TextmodeOptions = {
    /** The font size to use for text rendering. Defaults to 16. */
    fontSize?: number;
    /**
     * Automatic rendering mode. Defaults to 'auto'.
     * - `'manual'`: Requires manual `render()` calls
     * - `'auto'`: Automatically renders using [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
     */
    renderMode?: 'manual' | 'auto';
    /** Maximum frames per second for auto rendering. Defaults to 60. */
    frameRate?: number;
    /** The width of the canvas in `standalone` mode. Defaults to 800. */
    width?: number;
    /** The height of the canvas in `standalone` mode. Defaults to 600. */
    height?: number;
    /**
     * URL or path to a custom font file *(.otf/.ttf)*.
     * Required when using minified builds that don't include a default font.
     * Optional for full builds *(will override embedded font if provided)*.
     */
    fontSource?: string;
};
/**
 * Base class for mixin application
 */
declare class TextmodifierCore implements TextmodifierContext {
    _renderer: GLRenderer;
    _font: TextmodeFont;
    _pipeline: TextmodeConversionPipeline;
    _canvas: TextmodeCanvas;
    _grid: TextmodeGrid;
}
declare const Textmodifier_base: typeof TextmodifierCore;
/**
 * Manages textmode rendering on a canvas or video element.
 *
 * Each `Textmodifier` instance applies a `HTMLCanvasElement` with custom WebGL rendering on top of the original content.
 *
 * If the `Textmodifier` instance is created in `standalone` mode without a capture source,
 * it simply creates a new `HTMLCanvasElement` to draw on using the `textmode.js` drawing API.
 */
export declare class Textmodifier extends Textmodifier_base {
    /** The element to capture content from (optional for standalone mode) */
    private _captureSource;
    /** Canvas framebuffer for capturing source content */
    private _canvasFramebuffer;
    private _resizeObserver;
    private _mode;
    private _frameRateLimit;
    private _animationFrameId;
    private _lastFrameTime;
    private _frameInterval;
    private _isLooping;
    private _frameRate;
    private _lastRenderTime;
    private _frameCount;
    private _frameTimeHistory;
    private _frameTimeHistorySize;
    private _isDisposed;
    private _standalone;
    private _drawCallback;
    private _resizedCallback;
    private _windowResizeListener;
    /**
     * Creates an instance of Textmodifier.
     * @param source The HTML canvas or video element to capture content from. Pass `null` for standalone mode.
     * @param opts Optional configuration options for the Textmodifier instance.
     * @ignore
     */
    constructor(source?: TextmodeCaptureSource | null, opts?: TextmodeOptions);
    /**
     * Static factory method for creating and initializing a Textmodifier instance.
     * @param source The HTML canvas or video element to capture content from. Pass `null` for standalone mode.
     * @param opts Optional configuration options for the `Textmodifier` instance.
     * @ignore
     */
    static create(source?: TextmodeCaptureSource | null, opts?: TextmodeOptions): Promise<Textmodifier>;
    /**
     * Setup event listeners for resize handling.
     * @ignore
     */
    $setupEventListeners(): void;
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
    private _resize;
    /**
     * Start automatic rendering
     */
    private _startAutoRendering;
    /**
     * Update FPS measurement - works for both auto and manual modes
     * Uses a rolling average for smoother frame rate reporting
     */
    private _measureFrameRate;
    /**
     * Stop automatic rendering
     */
    private _stopAutoRendering;
    /**
     * Update the rendering mode.
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
    renderMode(mode: 'manual' | 'auto'): void;
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
     * Stop the automatic rendering loop while keeping the render mode as 'auto'.
     *
     * This method pauses the render loop without changing the render mode, allowing
     * it to be resumed later with {@link loop}. This is useful for temporarily pausing
     * animation while maintaining the ability to restart it.
     *
     * **Note:** This only affects rendering when in `'auto'` mode. In `'manual'` mode,
     * this method has no effect since rendering is already controlled manually.
     *
     * @example
     * ```javascript
     * // Create a textmodifier instance in auto mode
     * const textmodifier = await textmode.create(canvas);
     *
     * // The render loop is running automatically
     * console.log(textmodifier.isLooping()); // true
     *
     * // Stop the automatic rendering loop
     * textmodifier.noLoop();
     * console.log(textmodifier.isLooping()); // false
     *
     * // Resume the automatic rendering loop
     * textmodifier.loop();
     * console.log(textmodifier.isLooping()); // true
     * ```
     */
    noLoop(): void;
    /**
     * Resume the automatic rendering loop if it was stopped by {@link noLoop}.
     *
     * This method restarts the render loop when in `'auto'` mode. If the render mode
     * is `'manual'`, the loop state will be set but automatic rendering will not start
     * until the mode is changed back to `'auto'`.
     *
     * @example
     * ```javascript
     * // Create a textmodifier instance
     * const textmodifier = await textmode.create(canvas);
     *
     * // Stop the loop
     * textmodifier.noLoop();
     *
     * // Resume the loop
     * textmodifier.loop();
     *
     * // You can also use this pattern for conditional animation
     * if (someCondition) {
     *   textmodifier.loop();
     * } else {
     *   textmodifier.noLoop();
     * }
     * ```
     */
    loop(): void;
    /**
     * Execute the render function a specified number of times.
     *
     * This method is useful when the render loop has been stopped with {@link noLoop}
     * or when in `'manual'` mode, allowing you to trigger rendering on demand.
     * Similar to p5.js's `redraw()` function.
     *
     * @param n The number of times to execute the render function. Defaults to 1.
     *
     * @example
     * ```javascript
     * // Create a textmodifier instance
     * const textmodifier = await textmode.create(canvas, { renderMode: 'manual' });
     *
     * // Set up drawing
     * textmodifier.draw(() => {
     *   textmodifier.background(0);
     *   textmodifier.fill(255, 0, 0);
     *   textmodifier.rect(100, 100, 200, 150);
     * });
     *
     * // Render once manually
     * textmodifier.redraw();
     *
     * // Render 5 times
     * textmodifier.redraw(5);
     *
     * // Also useful when loop is stopped
     * textmodifier.noLoop();
     * textmodifier.redraw(3); // Render 3 times despite loop being stopped
     * ```
     */
    redraw(n?: number): void;
    /**
     * Check whether the textmodifier is currently running the automatic render loop.
     *
     * Returns `true` when both the render mode is `'auto'` AND the loop is active.
     * Returns `false` when in `'manual'` mode or when {@link noLoop} has been called.
     *
     * @returns True if the automatic render loop is currently active, false otherwise.
     *
     * @example
     * ```javascript
     * const textmodifier = await textmode.create(canvas);
     *
     * // Check loop status in different states
     * console.log(textmodifier.isLooping()); // true (auto mode, looping)
     *
     * textmodifier.noLoop();
     * console.log(textmodifier.isLooping()); // false (auto mode, not looping)
     *
     * textmodifier.renderMode('manual');
     * console.log(textmodifier.isLooping()); // false (manual mode)
     *
     * textmodifier.renderMode('auto');
     * console.log(textmodifier.isLooping()); // false (auto mode, but loop was stopped)
     *
     * textmodifier.loop();
     * console.log(textmodifier.isLooping()); // true (auto mode, looping)
     * ```
     */
    isLooping(): boolean;
    /**
     * Set a draw callback function that will be executed before each render.
     * This method is primarily useful for standalone textmodifier instances,
     * but can also be used to draw on top of the captured video or canvas.
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
     *
     * Can only be used in `standalone` mode since the textmode canvas otherwise automatically adjusts to the video/canvas size.
     * @param width The new width of the canvas.
     * @param height The new height of the canvas.
     */
    resizeCanvas(width: number, height: number): void;
    /**
     * Completely destroy this Textmodifier instance and free all associated resources.
     *
     * After calling this method, the instance should not be used and will be eligible for garbage collection.
     *
     * This method is idempotent and safe to call multiple times.
     *
     * @example
     * ```javascript
     * // Create a textmodifier instance
     * const textmodifier = await textmode.create(canvas);
     *
     * // Use it for rendering
     * textmodifier.render();
     *
     * // When done, completely clean up
     * textmodifier.destroy();
     *
     * // Instance is now safely disposed and ready for garbage collection
     * ```
     */
    destroy(): void;
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
    /** Get the WebGL renderer. */
    get renderer(): GLRenderer;
    /** Set the current frame count. */
    set frameCount(value: number);
    /** Get the width of the canvas. */
    get width(): number;
    /** Get the height of the canvas. */
    get height(): number;
    /** Get the textmodifier canvas containing the rendered output. */
    get canvas(): TextmodeCanvas;
    /** Check if the instance has been disposed/destroyed. */
    get isDisposed(): boolean;
}
export interface Textmodifier extends RenderingCapabilities, ExportCapabilities, FontCapabilities, ConversionCapabilities {
}
export {};
