import type { GLFramebuffer } from '../../../rendering';
import type { TextmodeGrid } from '../../grid/TextmodeGrid';
import type { TextmodeFont, TextmodeTileset } from '../../fonts';
import type { TextmodeGlyphAtlas } from '../../fonts/types';
import type { TextmodeLayer } from '../../layers/TextmodeLayer';
import type { TextmodeLayerManager } from '../../layers';
import type { TextmodeSource } from '../../media/TextmodeSource';
import type { LayerLifecycleHook, LayerRenderHook, SetupLifecycleHook, TextmodePluginHook } from './hooks';
/**
 * Stable read-only canvas handle exposed to plugins.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodeCanvasHandle | plugins.TextmodeCanvasHandle API reference}
 */
export interface TextmodeCanvasHandle {
    /**
     * The DOM canvas used for textmode rendering.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodeCanvasHandle#canvas | plugins.TextmodeCanvasHandle.canvas API reference}
     */
    readonly canvas: HTMLCanvasElement;
    /**
     * The overlay target, when textmode is running in overlay mode.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodeCanvasHandle#targetcanvas | plugins.TextmodeCanvasHandle.targetCanvas API reference}
     */
    readonly targetCanvas: HTMLCanvasElement | HTMLVideoElement | null;
    /**
     * Current canvas width in device pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodeCanvasHandle#width | plugins.TextmodeCanvasHandle.width API reference}
     */
    readonly width: number;
    /**
     * Current canvas height in device pixels.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodeCanvasHandle#height | plugins.TextmodeCanvasHandle.height API reference}
     */
    readonly height: number;
    /**
     * Whether textmode owns the WebGL context lifecycle.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodeCanvasHandle#ownscontext | plugins.TextmodeCanvasHandle.ownsContext API reference}
     */
    readonly ownsContext: boolean;
}
/**
 * Host-provided context passed to plugins when they are installed on a {@link Textmodifier} instance.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext | plugins.TextmodePluginContext API reference}
 */
export interface TextmodePluginContext {
    /**
     * The active glyph source used by the Textmodifier instance (from base layer).
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext#font | plugins.TextmodePluginContext.font API reference}
     */
    font: TextmodeFont | TextmodeTileset;
    /**
     * Backend-neutral glyph atlas used by the Textmodifier instance (from base layer).
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext#glyphatlas | plugins.TextmodePluginContext.glyphAtlas API reference}
     */
    glyphAtlas: TextmodeGlyphAtlas;
    /**
     * The grid used by the Textmodifier instance (from base layer).
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext#grid | plugins.TextmodePluginContext.grid API reference}
     */
    grid: TextmodeGrid;
    /**
     * A stable handle for the canvas used by the Textmodifier instance.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext#canvas | plugins.TextmodePluginContext.canvas API reference}
     */
    canvas: TextmodeCanvasHandle;
    /**
     * The framebuffer the user draws to with 3 attachments (from base layer).
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext#drawframebuffer | plugins.TextmodePluginContext.drawFramebuffer API reference}
     */
    drawFramebuffer: GLFramebuffer;
    /**
     * The framebuffer containing the ASCII representation (from base layer).<br/>
     * This framebuffer only has a single attachment.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext#asciiframebuffer | plugins.TextmodePluginContext.asciiFramebuffer API reference}
     */
    asciiFramebuffer: GLFramebuffer;
    /**
     * The layer manager for accessing and managing all layers.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext#layermanager | plugins.TextmodePluginContext.layerManager API reference}
     */
    layerManager: TextmodeLayerManager;
    /**
     * Register a callback to be invoked before each draw cycle.
     * Happens just before any framebuffer
     * @returns A function to unregister the hook.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/registerPreDrawHook/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext/methods/registerPreDrawHook | plugins.TextmodePluginContext.registerPreDrawHook API reference}
     */
    registerPreDrawHook(callback: TextmodePluginHook): () => void;
    /**
     * Register a callback to be invoked after each draw cycle.
     * Happens outside of the draw framebuffer being bound after the final result is drawn to the screen.
     * @returns A function to unregister the hook.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/registerPostDrawHook/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext/methods/registerPostDrawHook | plugins.TextmodePluginContext.registerPostDrawHook API reference}
     */
    registerPostDrawHook(callback: TextmodePluginHook): () => void;
    /**
     * Register a callback to be invoked when a layer is about to be disposed.
     * @param callback The callback to invoke with the layer being disposed.
     * @returns A function to unregister the hook.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/registerLayerDisposedHook/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext/methods/registerLayerDisposedHook | plugins.TextmodePluginContext.registerLayerDisposedHook API reference}
     */
    registerLayerDisposedHook(callback: LayerLifecycleHook): () => void;
    /**
     * Register a callback to be invoked before each layer's render cycle.
     * This happens after the layer's visibility check but before any drawing operations.
     * Useful for rendering content to the layer's framebuffer before user draw callbacks.
     * @param callback The callback to invoke with the layer and render context.
     * @returns A function to unregister the hook.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/registerLayerPreRenderHook/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext/methods/registerLayerPreRenderHook | plugins.TextmodePluginContext.registerLayerPreRenderHook API reference}
     */
    registerLayerPreRenderHook(callback: LayerRenderHook): () => void;
    /**
     * Register a callback to be invoked after each layer's render cycle.
     * This happens after the user draw callback but before the ASCII resolve pass.
     * @param callback The callback to invoke with the layer and render context.
     * @returns A function to unregister the hook.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/registerLayerPostRenderHook/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext/methods/registerLayerPostRenderHook | plugins.TextmodePluginContext.registerLayerPostRenderHook API reference}
     */
    registerLayerPostRenderHook(callback: LayerRenderHook): () => void;
    /**
     * Register a callback to be invoked before the user's setup callback runs.
     * This happens after the Textmodifier and all layers are fully initialized,
     * but before user code in `setup()` executes.
     * Useful for plugins that need to prepare resources or state before user setup.
     * @param callback The callback to invoke before setup.
     * @returns A function to unregister the hook.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/registerPreSetupHook/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext/methods/registerPreSetupHook | plugins.TextmodePluginContext.registerPreSetupHook API reference}
     */
    registerPreSetupHook(callback: SetupLifecycleHook): () => void;
    /**
     * Register a callback to be invoked after the user's setup callback completes.
     * This happens after user code in `setup()` has finished executing,
     * but before the loading screen finishes and the main render loop begins.
     * Useful for plugins that need to finalize initialization after user setup.
     * @param callback The callback to invoke after setup.
     * @returns A function to unregister the hook.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/registerPostSetupHook/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext/methods/registerPostSetupHook | plugins.TextmodePluginContext.registerPostSetupHook API reference}
     */
    registerPostSetupHook(callback: SetupLifecycleHook): () => void;
    /**
     * Extend TextmodeLayer instances with a new method.
     * The method will be available on all existing and future layer instances.
     *
     * @param methodName The name of the method to add.
     * @param implementation The implementation function. `this` will be bound to the TextmodeLayer instance.
     *
     * @example
     * ```ts
     * api.extendLayer('synth', function(source: SynthSource) {
     *   // `this` is the TextmodeLayer instance
     *   this.setPluginState('synth', { source, compiled: compile(source) });
     * });
     * ```
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext/methods/extendLayer | plugins.TextmodePluginContext.extendLayer API reference}
     */
    extendLayer<TArgs extends unknown[], TReturn>(methodName: string, implementation: (this: TextmodeLayer, ...args: TArgs) => TReturn): void;
    /**
     * Remove a method extension from TextmodeLayer.
     * @param methodName The name of the method to remove.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/removeLayerExtension/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext/methods/removeLayerExtension | plugins.TextmodePluginContext.removeLayerExtension API reference}
     */
    removeLayerExtension(methodName: string): void;
    /**
     * Extend TextmodeSource instances with a new method.
     * The method will be available on image, video, texture, and overlay sources.
     *
     * @param methodName The name of the method to add.
     * @param implementation The implementation function. `this` will be bound to the TextmodeSource instance.
     *
     * @example
     * ```ts
     * api.extendSource('edgeDetection', function() {
     *   // `this` is the TextmodeSource instance
     *   return this.conversionMode('edge');
     * });
     * ```
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext/methods/extendSource | plugins.TextmodePluginContext.extendSource API reference}
     */
    extendSource<TArgs extends unknown[], TReturn>(methodName: string, implementation: (this: TextmodeSource, ...args: TArgs) => TReturn): void;
    /**
     * Remove a method extension from TextmodeSource.
     * @param methodName The name of the method to remove.
     *
     * @example
     * ```ts
     * api.removeSourceExtension('edgeDetection');
     * ```
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePluginContext/methods/removeSourceExtension | plugins.TextmodePluginContext.removeSourceExtension API reference}
     */
    removeSourceExtension(methodName: string): void;
}
