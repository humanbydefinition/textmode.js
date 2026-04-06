import type { GLFramebuffer } from '../../rendering';
import { TextmodeGrid } from '../Grid';
import { TextmodeFont } from '../loadables/font';
import { type TextmodeLayerBlendMode } from './types';
import type { FilterName, BuiltInFilterName, BuiltInFilterParams } from '../filters';
import { TextmodeCamera } from '../TextmodeCamera';
/**
 * A single layer within a multi-layered textmode rendering context.
 *
 * Layers are composited together using various blend modes
 * to create complex visual effects. Each layer can be independently
 * manipulated in terms of visibility, opacity, blend mode, and position.
 *
 * You can draw on each layer by providing a draw callback function,
 * like you would with the base layer's {@link Textmodifier.draw} method.
 *
 * Plugins can extend TextmodeLayer with additional methods using the plugin API's
 * `extendLayer` function. For example, the `textmode-synth` plugin adds a `.synth()`
 * method for hydra-like procedural generation.
 *
 * The base layer, which is always present at the bottom of the layer stack,
 * can be accessed via {@link Textmodifier.layers.base}.
 */
export declare class TextmodeLayer {
    private _deps?;
    private _grid?;
    private _font;
    private _drawFramebuffer;
    private _asciiFramebuffer;
    private _rawAsciiFramebuffer?;
    private _pingPongBuffers?;
    private _drawCallback;
    private _filterQueue;
    private _cameraController;
    private _pluginState;
    /**
     * Define this layer's draw callback. The callback is executed each frame
     * and should contain all drawing commands for this layer.
     *
     * Inside the callback, use `t` (your `Textmodifier` instance) to access drawing
     * methods like `char()`, `charColor()`, `translate()`, and `rect()`.
     *
     * @param callback The function to call when drawing this layer.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/draw/sketch.js}
     */
    draw(callback: () => void): void;
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
     * Define or retrieve the layer's opacity.
     * @param opacity The opacity value to set (between 0 and 1).
     * @returns The current opacity if no parameter is provided.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/opacity/sketch.js}
     */
    opacity(opacity?: number): number | void;
    /**
     * Set or get the layer's blend mode for compositing with layers below.
     *
     * @param mode The blend mode to set.
     * @returns The current blend mode if no parameter is provided.
     *
     * **Available blend modes:**
     * - `'normal'` - Standard alpha compositing
     * - `'additive'` - Adds colors together (great for glow/energy effects)
     * - `'multiply'` - Darkens by multiplying colors
     * - `'screen'` - Lightens; inverse of multiply
     * - `'subtract'` - Subtracts layer from base
     * - `'darken'` - Takes minimum of each channel
     * - `'lighten'` - Takes maximum of each channel
     * - `'overlay'` - Combines multiply/screen for contrast
     * - `'softLight'` - Subtle contrast enhancement
     * - `'hardLight'` - Intense overlay effect
     * - `'colorDodge'` - Brightens base by blend color
     * - `'colorBurn'` - Darkens base by blend color
     * - `'difference'` - Absolute difference; creates inverted effects
     * - `'exclusion'` - Softer difference effect
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/blendMode/sketch.js}
     */
    blendMode(mode?: TextmodeLayerBlendMode): TextmodeLayerBlendMode | void;
    /**
     * Set or get the layer's offset in pixels.
     * @param x The x offset in pixels.
     * @param y The y offset in pixels.
     * @returns The current offset if no parameters are provided.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/offset/sketch.js}
     */
    offset(x?: number, y?: number): {
        x: number;
        y: number;
    } | void;
    /**
     * Set or get the layer's rotation in degrees around its center.
     *
     * The rotation is applied during compositing around the center of the layer's
     * rectangular bounds. The rotation origin remains at the center even when
     * an offset is applied.
     *
     * @param z The rotation angle in degrees. Positive values rotate clockwise.
     * @returns The current rotation in degrees if no parameter is provided.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/rotateZ/sketch.js}
     */
    rotateZ(z?: number): number | void;
    /**
     * Create a camera initialized from this layer's camera state and set it active for this layer.
     * @returns The created camera.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/createCamera/sketch.js}
     */
    createCamera(): TextmodeCamera;
    /**
     * Set the active camera for this layer.
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
     * Apply a post-processing filter to this layer's rendered output.
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
     * @param name The name of the filter to apply (built-in or custom registered filter)
     * @param params Optional parameters for the filter
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/filter/sketch.js}
     */
    filter<T extends BuiltInFilterName>(name: T, params?: BuiltInFilterParams[T]): void;
    /**
     * Apply a custom filter registered via `t.layers.filters.register()`.
     * @param name The name of the custom filter
     * @param params Optional parameters for the custom filter
     */
    filter<TParams = unknown>(name: FilterName, params?: TParams): void;
    /**
     * Store plugin-specific state on this layer.
     * Plugins can use this to attach their own data to layer instances.
     *
     * @param pluginName Unique identifier for the plugin.
     * @param state The state object to store.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/setPluginState/sketch.js}
     */
    setPluginState<T>(pluginName: string, state: T): void;
    /**
     * Retrieve plugin-specific state stored on this layer.
     *
     * @param pluginName Unique identifier for the plugin.
     * @returns The stored state object, or undefined if not set.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/getPluginState/sketch.js}
     */
    getPluginState<T>(pluginName: string): T | undefined;
    /** Check if plugin-specific state exists on this layer.
     *
     * @param pluginName Unique identifier for the plugin.
     * @returns True if state exists, false otherwise.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/hasPluginState/sketch.js}
     */
    hasPluginState(pluginName: string): boolean;
    /** Delete plugin-specific state from this layer.
     *
     * @param pluginName Unique identifier for the plugin.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/deletePluginState/sketch.js}
     */
    deletePluginState(pluginName: string): boolean;
    /**
     * Get or set the font size for this layer.
     *
     * Changing the font size will re-initialize the layer's grid based on the new character dimensions.
     *
     * @param size The font size to set.
     * @returns The current font size if called without arguments.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/fontSize/sketch.js}
     */
    fontSize(size?: number): number | void;
    /**
     * Load a font into this layer from a URL/path or from an existing {@link TextmodeFont}.
     * When a `TextmodeFont` is provided, the layer creates a layer-local fork with independent GPU resources.
     *
     * @param fontSource The URL/path to the font file, or an existing TextmodeFont to fork from.
     * @returns The loaded TextmodeFont instance.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/loadFont/sketch.js}
     */
    loadFont(fontSource: string | TextmodeFont): Promise<TextmodeFont>;
    /**
     * Returns the WebGL texture of the final ASCII framebuffer.
     * If the layer is not yet initialized, returns undefined.
     */
    get texture(): WebGLTexture | undefined;
    /**
     * Get the grid associated with this layer.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/grid/sketch.js}
     */
    get grid(): TextmodeGrid | undefined;
    /**
     * The font used by this layer.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/font/sketch.js}
     */
    get font(): TextmodeFont;
    /**
     * Returns the width of the final ASCII framebuffer in pixels.
     * If the layer is not yet initialized, returns 0.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/width/sketch.js}
     */
    get width(): number;
    /**
     * Returns the height of the final ASCII framebuffer in pixels.
     * If the layer is not yet initialized, returns 0.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/height/sketch.js}
     */
    get height(): number;
    /**
     * Returns the draw framebuffer for this layer.
     * If the layer is not yet initialized, returns undefined.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/drawFramebuffer/sketch.js}
     */
    get drawFramebuffer(): GLFramebuffer | undefined;
    /**
     * Get the framebuffer containing the rendered textmode output for this layer.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeLayer/asciiFramebuffer/sketch.js}
     */
    get asciiFramebuffer(): GLFramebuffer | undefined;
    private _syncGridToFont;
    private static _isValidBlendMode;
    private _replaceFont;
    private _applyCameraStateIfRendering;
    private _getCameraViewportDimensions;
}
