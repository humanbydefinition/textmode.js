import type { GLFramebuffer } from '../../rendering';
import { TextmodeGrid } from '../grid/TextmodeGrid';
import { TextmodeFont, TextmodeTileset } from '../fonts';
import type { TextmodeTilesetOptions } from '../fonts';
import { type TextmodeLayerBlendMode } from './types';
import type { FilterName, BuiltInFilterName, BuiltInFilterParams } from '../filters/types';
import { TextmodeCamera } from '../camera';
/**
 * A single layer within a multi-layered textmode rendering context.
 *
 * Each layer has its own draw callback, grid, glyph source, filters, camera state,
 * opacity, blend mode, offset, and rotation.
 *
 * Draw on a layer by providing a callback, similar to {@link Textmodifier.draw}
 * on the base layer.
 *
 * Plugins can extend TextmodeLayer with additional methods using the plugin API's
 * `extendLayer` function. For example, the `textmode-synth` plugin adds a `.synth()`
 * method for hydra-like procedural generation.
 *
 * The base layer, which is always present at the bottom of the layer stack,
 * can be accessed via {@link Textmodifier.layers} as `t.layers.base`.
 */
export declare class TextmodeLayer {
    private _renderer;
    private _deps?;
    private _grid?;
    private _font;
    private _drawFramebuffer;
    private _asciiFramebuffer;
    private _rawAsciiFramebuffer?;
    private _pingPongBuffers?;
    private _drawCallback;
    private _postDrawCallback;
    private _filterQueue;
    private _postFilterQueue;
    private _isRunningPostDraw;
    private _useTilesetColors;
    private _cameraController;
    private _fontSizeWasExplicitlySet;
    private _pluginState;
    /**
     * Set this layer's draw callback.
     *
     * The callback runs each frame and should contain this layer's drawing commands.
     *
     * @param callback Function to run when drawing this layer.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/draw/sketch.js}
     */
    draw(callback: () => void): void;
    /**
     * Set this layer's post-draw callback.
     *
     * The callback is executed after the layer has been converted to ASCII and after
     * any filters queued in {@link filter} during {@link draw} have been applied.
     * Filters queued inside this callback are applied to the layer's final ASCII texture
     * before the layer is composited with the rest of the scene.
     *
     * @param callback Function to run after this layer has been drawn and filtered.
     *
     * @example
     * ```js
     * const layer = t.layers.add();
     *
     * layer.draw(() => {
     * 	t.background(0);
     * 	t.char('A');
     * 	t.rect(12, 8);
     * 	layer.filter('grayscale', 0.4);
     * });
     *
     * layer.postDraw(() => {
     * 	layer.filter('invert');
     * });
     * ```
     */
    postDraw(callback: () => void): void;
    /**
     * Show this layer for rendering.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/show/sketch.js}
     */
    show(): void;
    /**
     * Hide this layer from rendering.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/hide/sketch.js}
     */
    hide(): void;
    /**
     * Set or get this layer's opacity.
     * @param opacity Opacity from `0` to `1`.
     * @returns Current opacity when called without arguments.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/opacity/sketch.js}
     */
    opacity(opacity?: number): number | void;
    /**
     * Set or get this layer's blend mode.
     *
     * Available modes are listed in {@link TEXTMODE_LAYER_BLEND_MODES}.
     *
     * @param mode Blend mode to apply.
     * @returns Current blend mode when called without arguments.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/blendMode/sketch.js}
     */
    blendMode(mode?: TextmodeLayerBlendMode): TextmodeLayerBlendMode | void;
    /**
     * Set or get this layer's compositing offset in pixels.
     * @param x Horizontal offset in pixels.
     * @param y Vertical offset in pixels.
     * @returns Current offset when called without arguments.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/offset/sketch.js}
     */
    offset(x?: number, y?: number): {
        x: number;
        y: number;
    } | void;
    /**
     * Set or get this layer's compositing rotation in degrees.
     *
     * The rotation is applied during compositing around the center of the layer's
     * rectangular bounds. The rotation origin remains at the center even when
     * an offset is applied.
     *
     * @param z Rotation angle in degrees. Positive values rotate clockwise.
     * @returns Current rotation in degrees when called without arguments.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/rotateZ/sketch.js}
     */
    rotateZ(z?: number): number | void;
    /**
     * Create and activate a camera initialized from this layer's camera state.
     * @returns The created camera.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/createCamera/sketch.js}
     */
    createCamera(): TextmodeCamera;
    /**
     * Activate a camera for this layer.
     * @param camera Camera instance to apply.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/setCamera/sketch.js}
     */
    setCamera(camera: TextmodeCamera): void;
    /**
     * Reset this layer to default auto camera behavior.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/resetCamera/sketch.js}
     */
    resetCamera(): void;
    /**
     * Set explicit camera parameters for this layer.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/camera/sketch.js}
     */
    camera(eyeX: number, eyeY: number, eyeZ: number, targetX?: number, targetY?: number, targetZ?: number, upX?: number, upY?: number, upZ?: number): void;
    /**
     * Update this layer camera's target and optional up vector.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/lookAt/sketch.js}
     */
    lookAt(targetX: number, targetY: number, targetZ: number, upX?: number, upY?: number, upZ?: number): void;
    /**
     * Enable perspective projection for this layer.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/perspective/sketch.js}
     */
    perspective(fov?: number, near?: number, far?: number): void;
    /**
     * Enable orthographic projection for this layer.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/ortho/sketch.js}
     */
    ortho(near?: number, far?: number): void;
    /**
     * Queue a post-processing filter for this layer.
     *
     * Filters are applied after ASCII conversion in the order they are called.
     * Call this method within your layer's draw callback to apply effects.
     *
     * **Built-in filters:**
     * - `'invert'` - Inverts all colors
     * - `'grayscale'` - Converts to grayscale (param: amount 0-1, default 1)
     * - `'sepia'` - Applies sepia tone (param: amount 0-1, default 1)
     * - `'threshold'` - Black/white threshold (param: threshold 0-1, default 0.5)
     *
     * @param name Built-in or registered filter name.
     * @param params Optional filter parameters.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/filter/sketch.js}
     */
    filter<T extends BuiltInFilterName>(name: T, params?: BuiltInFilterParams[T]): void;
    /**
     * Queue a registered custom filter for this layer.
     * @param name Custom filter name.
     * @param params Optional filter parameters.
     */
    filter<TParams = unknown>(name: FilterName, params?: TParams): void;
    /**
     * Store plugin-specific state on this layer.
     * Plugins can use this to attach their own data to layer instances.
     *
     * @param pluginName Plugin identifier.
     * @param state State object to store.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/setPluginState/sketch.js}
     */
    setPluginState<T>(pluginName: string, state: T): void;
    /**
     * Retrieve plugin-specific state stored on this layer.
     *
     * @param pluginName Plugin identifier.
     * @returns Stored state, or `undefined` when not set.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/getPluginState/sketch.js}
     */
    getPluginState<T>(pluginName: string): T | undefined;
    /**
     * Check whether plugin-specific state exists on this layer.
     *
     * @param pluginName Plugin identifier.
     * @returns `true` when state exists.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/hasPluginState/sketch.js}
     */
    hasPluginState(pluginName: string): boolean;
    /**
     * Delete plugin-specific state from this layer.
     *
     * @param pluginName Plugin identifier.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/deletePluginState/sketch.js}
     */
    deletePluginState(pluginName: string): boolean;
    /**
     * Get or set this layer's font size.
     *
     * Changing the font size will re-initialize the layer's grid based on the new character dimensions.
     *
     * @param size Font size to apply.
     * @returns Current font size when called without arguments.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/fontSize/sketch.js}
     */
    fontSize(size?: number): number | void;
    /**
     * Configure authored tileset color preservation for this layer.
     *
     * When disabled (default), tileset texels are remapped to the current character (`primary`)
     * and cell (`secondary`) colors. Vector/font atlases always use character/cell recoloring
     * regardless of this setting.
     *
     * @param enabled Whether to preserve authored tileset colors.
     * @returns Current tileset-color mode when called without arguments.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/useTileColors/sketch.js}
     */
    useTileColors(enabled?: boolean): boolean | void;
    /**
     * Load a font into this layer from a URL/path or existing {@link TextmodeFont}.
     *
     * @param fontSource Font URL/path or TextmodeFont to fork from.
     * @returns The loaded TextmodeFont.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/loadFont/sketch.js}
     */
    loadFont(fontSource: string | TextmodeFont): Promise<TextmodeFont>;
    /**
     * Load a tileset into this layer from options or an existing {@link TextmodeTileset}.
     *
     * @param tilesetSource Tileset options or TextmodeTileset to fork from.
     * @returns The loaded TextmodeTileset.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/loadTileset/sketch.js}
     */
    loadTileset(tilesetSource: TextmodeTilesetOptions | TextmodeTileset): Promise<TextmodeTileset>;
    /**
     * WebGL texture of the final ASCII framebuffer.
     *
     * Returns `undefined` before the layer is initialized.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/texture/sketch.js}
     */
    get texture(): WebGLTexture | undefined;
    /**
     * Grid associated with this layer.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/grid/sketch.js}
     */
    get grid(): TextmodeGrid | undefined;
    /**
     * Font or tileset used by this layer.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/font/sketch.js}
     */
    get font(): TextmodeFont | TextmodeTileset;
    /**
     * Width of the final ASCII framebuffer in pixels.
     *
     * Returns `0` before the layer is initialized.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/width/sketch.js}
     */
    get width(): number;
    /**
     * Height of the final ASCII framebuffer in pixels.
     *
     * Returns `0` before the layer is initialized.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/height/sketch.js}
     */
    get height(): number;
    /**
     * Draw framebuffer for this layer.
     *
     * Returns `undefined` before the layer is initialized.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/drawFramebuffer/sketch.js}
     */
    get drawFramebuffer(): GLFramebuffer | undefined;
    /**
     * Framebuffer containing this layer's rendered textmode output.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/asciiFramebuffer/sketch.js}
     */
    get asciiFramebuffer(): GLFramebuffer | undefined;
    private _syncGridToFont;
    private static _isValidBlendMode;
    private _replaceFont;
    private _resolveNextGlyphSourceSize;
    private _applyCameraStateIfRendering;
    private _getCameraViewportDimensions;
}
