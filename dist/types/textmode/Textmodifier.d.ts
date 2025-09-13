import { GLRenderer } from '../rendering/webgl/Renderer';
import { TextmodeFont } from './font';
import { TextmodeGrid } from './Grid';
import { TextmodeCanvas } from './Canvas';
import { AnimationController } from './AnimationController';
import { type TextmodifierContext } from './mixins';
import type { RenderingCapabilities } from './mixins/RenderingMixin';
import type { ExportCapabilities } from './mixins/ExportMixin';
import type { FontCapabilities } from './mixins/FontMixin';
import type { AnimationCapabilities } from './mixins/AnimationMixin';
import type { GLFramebuffer, Shader } from '../rendering';
/**
 * Options for creating a {@link Textmodifier} instance.
 */
export type TextmodeOptions = {
    /** An existing [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) to use instead of creating a new one. */
    canvas?: HTMLCanvasElement;
    /** The font size to use for text rendering. Defaults to 16. */
    fontSize?: number;
    /** Maximum frames per second for auto rendering. Defaults to 60. */
    frameRate?: number;
    /** The width of the canvas when creating a new canvas. Defaults to 800. */
    width?: number;
    /** The height of the canvas when creating a new canvas. Defaults to 600. */
    height?: number;
    /**
     * URL or path to a custom font file *(.otf/.ttf)*.
     *
     * Required when using minified builds that don't include a default font.
     *
     * Optional for full builds *(will override embedded font if provided)*.
     */
    fontSource?: string;
};
/**
 * Base class for mixin application.
 */
declare class TextmodifierCore implements TextmodifierContext {
    _renderer: GLRenderer;
    _font: TextmodeFont;
    _canvas: TextmodeCanvas;
    _grid: TextmodeGrid;
    _animationController: AnimationController;
    _textmodeDrawShader: Shader;
    _textmodeDrawFramebuffer: GLFramebuffer;
    _textmodeConversionShader: Shader;
    $render(): void;
}
declare const Textmodifier_base: typeof TextmodifierCore;
/**
 * Manages textmode rendering on a [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) and provides methods for drawing,
 * exporting, font management, and animation control.
 *
 * If the `Textmodifier` instance is created without a canvas parameter,
 * it creates a new `HTMLCanvasElement` to draw on using the `textmode.js` drawing API.
 * If a canvas is provided, it will use that canvas instead.
 */
export declare class Textmodifier extends Textmodifier_base {
    private _isDisposed;
    private _setupCallback;
    private _drawCallback;
    private _resizedCallback;
    private _windowResizeListener;
    /**
     * Creates an instance of Textmodifier.
     * @param opts Optional configuration options for the Textmodifier instance.
     * @ignore
     */
    constructor(opts?: TextmodeOptions);
    /**
     * Internal async initialization method.
     * @param opts Configuration options
     */
    private _initialize;
    /**
     * Setup event listeners for resize handling.
     * @ignore
     */
    $setupEventListeners(): void;
    /**
     * Renders the current frame.
     * @returns void
     * @ignore
     */
    $render(): void;
    /**
     * Set a setup callback function that will be executed once when initialization is complete.
     *
     * This callback is called after font loading and grid initialization, allowing access to
     * properties like `textmodifier.grid.cols` for calculating layout or setup variables.
     *
     * @param callback The function to call when setup is complete
     *
     * @example
     * ```javascript
     * const textmodifier = textmode.create({
     *   width: 800,
     *   height: 600,
     *   fontSize: 16
     * });
     *
     * // Setup callback - called once when ready
     * textmodifier.setup(() => {
     *   // Now you can access grid properties
     *   const cols = textmodifier.grid.cols;
     *   const rows = textmodifier.grid.rows;
     *
     *   // Initialize any variables that depend on grid size
     *   cellWidth = Math.floor(cols / 3);
     *   cellHeight = Math.floor(rows / 2);
     * });
     *
     * // Draw callback - called every frame
     * textmodifier.draw(() => {
     *   textmodifier.background(128);
     *   textmodifier.rect(0, 0, cellWidth, cellHeight);
     * });
     * ```
     */
    setup(callback: () => void): void;
    /**
     * Set a draw callback function that will be executed before each render.
     *
     * This callback function is where all drawing commands should be placed for textmode rendering.
     *
     * @param callback The function to call before each render
     *
     * @example
     * ```javascript
     * // Create a standalone textmodifier instance
     * const t = textmode.create({
     *  width: 800,
     *  height: 600,
     * });
     *
     * // Set up draw callback
     * t.draw(() => {
     *   // Set background color
     *   t.background(128);
     *
     *   // Draw a textmode rectangle with default settings
     *   t.rect(0, 0, 16, 16);
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
     * const t = textmode.create({
     *  width: window.innerWidth,
     *  height: window.innerHeight,
     * });
     *
     * // Draw callback to update content
     * t.draw(() => {
     *   // Set background color
     *   t.background(128);
     *
     *   t.rect(0, 0, t.grid.cols, t.grid.rows);
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
     * Resize the canvas and adjust all related components accordingly.
     *
     * @param width The new width of the canvas.
     * @param height The new height of the canvas.
     */
    resizeCanvas(width: number, height: number): void;
    /**
     * Completely destroy this Textmodifier instance and free all associated resources.
     *
     * After calling this method, the instance should not be used and will be eligible for garbage collection.
     *
     * @example
     * ```javascript
     * // Create a textmodifier instance
     * const textmodifier = textmode.create();
     *
     * // ...
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
    /** Get the width of the canvas. */
    get width(): number;
    /** Get the height of the canvas. */
    get height(): number;
    /** Get the textmodifier canvas containing the rendered output. */
    get canvas(): HTMLCanvasElement;
    /** Check if the instance has been disposed/destroyed. */
    get isDisposed(): boolean;
    /** Get the draw framebuffer used for offscreen rendering. @ignore */
    get drawFramebuffer(): any;
}
export interface Textmodifier extends RenderingCapabilities, ExportCapabilities, FontCapabilities, AnimationCapabilities {
}
export {};
