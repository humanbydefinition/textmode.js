import type { GLFramebuffer } from '../../../rendering';
import type { GLRenderer } from '../../../rendering/webgl/core/Renderer';
import type { TextmodeGrid } from '../../grid/TextmodeGrid';
import type { TextmodeFont, TextmodeTileset } from '../../fonts';
import type { TextmodeGlyphAtlas } from '../../fonts/types';
import type { TextmodeLayer } from '../../layers/TextmodeLayer';
import type { TextmodeLayerManager } from '../../layers';
import type { LayerLifecycleHook, LayerRenderHook, SetupLifecycleHook, TextmodePluginHook } from './hooks';
/**
 * Stable read-only canvas handle exposed to plugins.
 */
export interface TextmodeCanvasHandle {
    /** The DOM canvas used for textmode rendering. */
    readonly canvas: HTMLCanvasElement;
    /** The overlay target, when textmode is running in overlay mode. */
    readonly targetCanvas: HTMLCanvasElement | HTMLVideoElement | null;
    /** Current canvas width in device pixels. */
    readonly width: number;
    /** Current canvas height in device pixels. */
    readonly height: number;
    /** Whether textmode owns the WebGL context lifecycle. */
    readonly ownsContext: boolean;
}
/**
 * Host-provided context passed to plugins when they are installed on a {@link Textmodifier} instance.
 */
export interface TextmodePluginContext {
    /** The WebGL renderer used by the Textmodifier instance. */
    renderer: GLRenderer;
    /** The active glyph source used by the Textmodifier instance (from base layer). */
    font: TextmodeFont | TextmodeTileset;
    /** Backend-neutral glyph atlas used by the Textmodifier instance (from base layer). */
    glyphAtlas: TextmodeGlyphAtlas;
    /** The grid used by the Textmodifier instance (from base layer). */
    grid: TextmodeGrid;
    /** A stable handle for the canvas used by the Textmodifier instance. */
    canvas: TextmodeCanvasHandle;
    /** The framebuffer the user draws to with 3 render targets (from base layer). */
    drawFramebuffer: GLFramebuffer;
    /**
     * The framebuffer containing the ASCII representation (from base layer).<br/>
     * This framebuffer only has a single render target.
     */
    asciiFramebuffer: GLFramebuffer;
    /** The layer manager for accessing and managing all layers. */
    layerManager: TextmodeLayerManager;
    /**
     * Register a callback to be invoked before each draw cycle.
     * Happens just before any framebuffer
     * @returns A function to unregister the hook.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/lifecycle/sketch.js}
     */
    registerPreDrawHook(callback: TextmodePluginHook): () => void;
    /**
     * Register a callback to be invoked after each draw cycle.
     * Happens outside of the draw framebuffer being bound after the final result is drawn to the screen.
     * @returns A function to unregister the hook.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/lifecycle/sketch.js}
     */
    registerPostDrawHook(callback: TextmodePluginHook): () => void;
    /**
     * Register a callback to be invoked when a layer is about to be disposed.
     * @param callback The callback to invoke with the layer being disposed.
     * @returns A function to unregister the hook.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/lifecycle/sketch.js}
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
     * {@includeCode ../../../../examples/plugins/lifecycle/sketch.js}
     */
    registerLayerPreRenderHook(callback: LayerRenderHook): () => void;
    /**
     * Register a callback to be invoked after each layer's render cycle.
     * This happens after the user draw callback but before ASCII conversion.
     * @param callback The callback to invoke with the layer and render context.
     * @returns A function to unregister the hook.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/lifecycle/sketch.js}
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
     * {@includeCode ../../../../examples/plugins/lifecycle/sketch.js}
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
     * {@includeCode ../../../../examples/plugins/lifecycle/sketch.js}
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
     */
    extendLayer<TArgs extends unknown[], TReturn>(methodName: string, implementation: (this: TextmodeLayer, ...args: TArgs) => TReturn): void;
    /**
     * Remove a method extension from TextmodeLayer.
     * @param methodName The name of the method to remove.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/removeLayerExtension/sketch.js}
     */
    removeLayerExtension(methodName: string): void;
}
