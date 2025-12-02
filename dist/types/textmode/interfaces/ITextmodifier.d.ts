import type { TextmodeGrid } from '../Grid';
import type { TextmodeFont } from '../loadables/font';
import type { TextmodeImage } from '../loadables/TextmodeImage';
import type { TextmodeSource } from '../loadables/TextmodeSource';
import type { TextmodeCanvas } from '../Canvas';
import type { AnimationController } from '../AnimationController';
import type { GLFramebuffer, GLShader } from '../../rendering';
import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import type { MouseManager } from '../managers/MouseManager';
import type { KeyboardManager } from '../managers/KeyboardManager';
import type { TouchManager } from '../managers/TouchManager';
import type { IRenderingMixin } from '../mixins/interfaces/IRenderingMixin';
import type { IFontMixin } from '../mixins/interfaces/IFontMixin';
import type { IKeyboardMixin } from '../mixins/interfaces/IKeyboardMixin';
import type { ITouchMixin } from '../mixins/interfaces/ITouchMixin';
import type { IMouseMixin } from '../mixins/interfaces/IMouseMixin';
import type { IAnimationMixin } from '../mixins/interfaces/IAnimationMixin';
import type { LoadingScreenManager } from '../loading/LoadingScreenManager';
import type { TextmodeLayerManager } from '../layers';
/**
 * Manages textmode rendering on a [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) and provides methods for drawing,
 * exporting, font management, event handling, and animation control.
 *
 * If the `Textmodifier` instance is created without a canvas parameter,
 * it creates a new `HTMLCanvasElement` to draw on using the `textmode.js` drawing API.
 * If a canvas is provided, it will use that canvas instead.
 */
export interface ITextmodifier extends IRenderingMixin, IFontMixin, IAnimationMixin, IMouseMixin, ITouchMixin, IKeyboardMixin {
    /** Core WebGL renderer @ignore */
    readonly _renderer: GLRenderer;
    /** Font management @ignore */
    readonly _font: TextmodeFont;
    /** Canvas management @ignore */
    readonly _canvas: TextmodeCanvas;
    /** Grid management @ignore */
    readonly _grid: TextmodeGrid;
    /** Animation controller for managing rendering loop @ignore */
    readonly _animationController: AnimationController;
    /** Mouse interaction manager @ignore */
    readonly _mouseManager: MouseManager;
    /** Touch interaction manager @ignore */
    readonly _touchManager: TouchManager;
    /** Keyboard interaction manager @ignore */
    readonly _keyboardManager: KeyboardManager;
    /** Framebuffer used for offscreen rendering @ignore */
    readonly _textmodeDrawFramebuffer: GLFramebuffer;
    /** Shader used for converting pixels to textmode grid format @ignore */
    readonly _textmodeConversionShader: GLShader;
    /** Framebuffer used for textmode conversion @ignore */
    readonly _textmodeFramebuffer: GLFramebuffer;
    /** Shader used for final presentation to the screen @ignore */
    readonly _presentShader: GLShader;
    /** Loading screen manager for boot-time UX @ignore */
    readonly _loading: LoadingScreenManager;
    /** Sources registered for rendering @ignore */
    readonly _sources: Set<TextmodeSource>;
    /** Layer manager for handling multiple layers @ignore */
    readonly _layerManager: TextmodeLayerManager;
    /** @ignore */
    $registerSource(source: TextmodeSource): void;
    /** Main render method @ignore */
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
     *   rectWidth = Math.floor(cols / 3);
     *   rectHeight = Math.floor(rows / 2);
     * });
     *
     * // Draw callback - called every frame
     * textmodifier.draw(() => {
     *   textmodifier.background(128);
     *   textmodifier.char('A');
     *   textmodifier.rotateZ(textmodifier.frameCount * 2);
     *   textmodifier.rect(rectWidth, rectHeight);
     * });
     * ```
     */
    setup(callback: () => void): void;
    /**
     * Set a draw callback function for the base layer.
     *
     * This callback function is where all drawing commands should be placed for textmode rendering on the main layer.
     *
     * If multiple layers are added via {@link Textmodifier.layers}, each layer can have its own draw callback set via {@link TextmodeLayer.draw}.
     * This allows for complex multi-layered compositions with independent rendering logic per layer.
     *
     * @param callback The function to call before each render
     *
     * @example
     * ```javascript
     * // Create a textmodifier instance
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
     *   // Draw a textmode rectangle
     *   t.char('A');
     *   t.rotateZ(t.frameCount * 2);
     *   t.rect(16, 16);
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
     *   width: window.innerWidth,
     *   height: window.innerHeight,
     * });
     *
     * // Draw callback to update content
     * t.draw(() => {
     *  // Set background color
     *  t.background(128);
     *  t.char('A');
     *  t.rotateZ(t.frameCount * 2);
     *  t.rect(16, 16);
     * });
     *
     * // Set up window resize callback
     * t.windowResized(() => {
     *   // Resize the canvas to match window size
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    windowResized(callback: () => void): void;
    /**
     * Resize the canvas and adjust all related components accordingly.
     *
     * @param width The new width of the canvas.
     * @param height The new height of the canvas.
     *
     * @example
     * ```javascript
     * // Create a standalone textmodifier instance
     * const t = textmode.create({
     *   width: window.innerWidth,
     *   height: window.innerHeight,
     * });
     *
     * // Draw callback to update content
     * t.draw(() => {
     *  // Set background color
     *  t.background(128);
     *  t.char('A');
     *  t.rotateZ(t.frameCount * 2);
     *  t.rect(16, 16);
     * });
     *
     * // Set up window resize callback
     * t.windowResized(() => {
     *   // Resize the canvas to match window size
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
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
    readonly grid: TextmodeGrid;
    /** Get the current font object used for rendering. */
    readonly font: TextmodeFont;
    /** Get the width of the canvas in pixels. */
    readonly width: number;
    /** Get the height of the canvas in pixels. */
    readonly height: number;
    /** Get the textmodifier canvas containing the rendered output. */
    readonly canvas: HTMLCanvasElement;
    /** Get the WebGL framebuffer used for drawing operations in {@link Textmodifier.draw}. */
    readonly drawFramebuffer: GLFramebuffer;
    /** Check if the instance has been disposed/destroyed. */
    readonly isDisposed: boolean;
    /**
     * If in overlay mode, returns the {@link TextmodeImage} instance capturing the target canvas/video content,
     * allowing further configuration of the conversion parameters.
     *
     * @example
     * ```javascript
     * // Create the textmode instance using the p5 canvas as input overlay
     * const t = textmode.create({ fontSize: 16, canvas: p.canvas, overlay: true });
     *
     * // Configure overlay conversion once fonts and grid are ready
     * t.setup(() => {
     *   t.overlay
     *     .characters(' .:-=+*#%@')        // Character set for brightness mapping
     *     .cellColorMode('fixed')          // Use fixed background cell color
     *     .cellColor(0, 0, 0)              // Black background for each cell
     *     .charColorMode('sampled')        // Sample the character color from the image
     *     .background(0, 0, 0, 255);       // Black fallback for transparent pixels
     * });
     *
     * // In the draw loop, pass the overlay into the text grid
     * t.draw(() => {
     *   t.clear();
     *   t.image(t.overlay, t.grid.cols, t.grid.rows);
     * });
     *```
     */
    readonly overlay: TextmodeImage | undefined;
    /**
     * Provides access to the loading screen manager to control boot-time loading UX.
     *
     * @example
    * ```javascript
    * const t = textmode.create({ width: 800, height: 600, loadingScreen: { message: 'loading...' } });
    *
    * t.setup(async () => {
    *   // Initialize two loading phases
    *   const phase1 = t.loading.addPhase('Loading assets');
    *   const phase2 = t.loading.addPhase('Initializing game');
    *
    *   // Start the first phase and simulate asset loading
    *   await phase1.track(async () => {
    *     for (let i = 0; i <= 5; i++) {
    *       phase1.report(i / 5);
    *       // Small delay — increases visibility of the loading animation
    *       await new Promise((r) => setTimeout(r, 200));
    *     }
    *   });
    *
    *   // Start the second phase and simulate initialization
    *   await phase2.track(async () => {
    *     for (let i = 0; i <= 5; i++) {
    *       phase2.report(i / 5);
    *       await new Promise((r) => setTimeout(r, 150));
    *     }
    *   });
    *
    *   // Optionally set a final message before the screen transitions away
    *   t.loading.message('Ready - enjoy!');
    * });
    * ```
     */
    readonly loading: LoadingScreenManager;
}
