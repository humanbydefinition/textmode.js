import type { Textmodifier } from '../Textmodifier';
import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import type { GLFramebuffer } from '../../rendering';
import type { TextmodeFont } from '../loadables/font';
import type { TextmodeGrid } from '../Grid';
import type { TextmodeCanvas } from '../Canvas';
import type { TextmodeLayer } from '../layers/TextmodeLayer';
import type { TextmodeLayerManager } from '../layers';
/**
 * Type for layer extension method implementations.
 * The `this` context is bound to the `TextmodeLayer` instance.
 */
export type LayerExtensionImplementation = (this: TextmodeLayer, ...args: any[]) => unknown;
/**
 * Callback type for simple plugin hooks without parameters.
 */
export type TextmodePluginHook = () => void;
/**
 * Callback type for setup lifecycle hooks.
 * Can be synchronous or return a Promise for async operations.
 */
export type SetupLifecycleHook = () => void | Promise<void>;
/**
 * Callback type for layer lifecycle events.
 */
export type LayerLifecycleHook = (layer: TextmodeLayer) => void;
/**
 * Callback type for layer render hooks.
 */
export type LayerRenderHook = (layer: TextmodeLayer) => void;
/**
 * An extended API provided to plugins when they are installed on a {@link Textmodifier} instance.
 */
export interface TextmodePluginAPI {
    /** The WebGL renderer used by the Textmodifier instance. */
    renderer: GLRenderer;
    /** The font used by the Textmodifier instance (from base layer). */
    font: TextmodeFont;
    /** The grid used by the Textmodifier instance (from base layer). */
    grid: TextmodeGrid;
    /** The canvas used by the Textmodifier instance. */
    canvas: TextmodeCanvas;
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
     */
    registerPreDrawHook(callback: () => void): () => void;
    /**
     * Register a callback to be invoked after each draw cycle.
     * Happens outside of the draw framebuffer being bound after the final result is drawn to the screen.
     * @returns A function to unregister the hook.
     */
    registerPostDrawHook(callback: () => void): () => void;
    /**
     * Register a callback to be invoked when a layer is about to be disposed.
     * @param callback The callback to invoke with the layer being disposed.
     * @returns A function to unregister the hook.
     */
    registerLayerDisposedHook(callback: LayerLifecycleHook): () => void;
    /**
     * Register a callback to be invoked before each layer's render cycle.
     * This happens after the layer's visibility check but before any drawing operations.
     * Useful for rendering content to the layer's framebuffer before user draw callbacks.
     * @param callback The callback to invoke with the layer and render context.
     * @returns A function to unregister the hook.
     */
    registerLayerPreRenderHook(callback: LayerRenderHook): () => void;
    /**
     * Register a callback to be invoked after each layer's render cycle.
     * This happens after the user draw callback but before ASCII conversion.
     * @param callback The callback to invoke with the layer and render context.
     * @returns A function to unregister the hook.
     */
    registerLayerPostRenderHook(callback: LayerRenderHook): () => void;
    /**
     * Register a callback to be invoked before the user's setup callback runs.
     * This happens after the Textmodifier and all layers are fully initialized,
     * but before user code in `setup()` executes.
     * Useful for plugins that need to prepare resources or state before user setup.
     * @param callback The callback to invoke before setup.
     * @returns A function to unregister the hook.
     */
    registerPreSetupHook(callback: () => void | Promise<void>): () => void;
    /**
     * Register a callback to be invoked after the user's setup callback completes.
     * This happens after user code in `setup()` has finished executing,
     * but before the loading screen finishes and the main render loop begins.
     * Useful for plugins that need to finalize initialization after user setup.
     * @param callback The callback to invoke after setup.
     * @returns A function to unregister the hook.
     */
    registerPostSetupHook(callback: () => void | Promise<void>): () => void;
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
     */
    removeLayerExtension(methodName: string): void;
}
/**
 * A plugin interface for extending the functionality of a {@link Textmodifier} instance.
 *
 * Create plugins by implementing this interface.
 */
export interface TextmodePlugin {
    /** Unique name for the plugin. */
    name: string;
    /** Version string for the plugin. */
    version?: string;
    /**
     * Called when the plugin is installed on a {@link Textmodifier} instance.
     * @param textmodifier The Textmodifier instance the plugin is being installed on.
     * @param api An API object providing access to the Textmodifier's context and hook registration methods.
     */
    install(textmodifier: Textmodifier, api: TextmodePluginAPI): void | Promise<void>;
    /**
     * Called when the plugin is uninstalled from a {@link Textmodifier} instance.
     * @param textmodifier The Textmodifier instance the plugin is being uninstalled from.
     * @param api An API object providing access to the Textmodifier's context and hook registration methods.
     */
    uninstall?(textmodifier: Textmodifier, api: TextmodePluginAPI): void | Promise<void>;
}
/**
 * Manager for handling TextmodePlugin installation, uninstallation, and hook execution.
 * @ignore
 */
export declare class TextmodePluginManager {
    private readonly _textmodifier;
    private readonly _plugins;
    private readonly _installationOrder;
    private readonly _preDrawHooks;
    private readonly _postDrawHooks;
    private readonly _layerDisposedHooks;
    private readonly _layerPreRenderHooks;
    private readonly _layerPostRenderHooks;
    private readonly _preSetupHooks;
    private readonly _postSetupHooks;
    private readonly _layerExtensions;
    constructor(textmodifier: Textmodifier);
    /**
     * Install plugins synchronously.
     * This is called from the constructor to ensure layer method extensions
     * are available immediately after textmode.create() returns.
     *
     * Plugin install() methods should be synchronous or return void.
     * Any async operations in install() will be started but not awaited.
     *
     * @ignore
     */
    $installManySync(plugins: TextmodePlugin[]): void;
    $installMany(plugins: TextmodePlugin[]): Promise<void>;
    $unuse(pluginName: string): Promise<void>;
    $runPreDrawHooks(): void;
    $runPostDrawHooks(): void;
    /**
     * Notify plugins that a layer is about to be disposed.
     * Called by LayerManager/TextmodeLayer before disposal.
     * @ignore
     */
    $notifyLayerDisposed(layer: TextmodeLayer): void;
    /**
     * Run all registered pre-render hooks for a layer.
     * Called by TextmodeLayer.$render() before drawing.
     * @ignore
     */
    $runLayerPreRenderHooks(layer: TextmodeLayer): void;
    /**
     * Run all registered post-render hooks for a layer.
     * Called by TextmodeLayer.$render() after drawing but before ASCII conversion.
     * @ignore
     */
    $runLayerPostRenderHooks(layer: TextmodeLayer): void;
    /**
     * Run all registered pre-setup hooks.
     * Called by Textmodifier before the user's setup callback.
     * @ignore
     */
    $runPreSetupHooks(): Promise<void>;
    /**
     * Run all registered post-setup hooks.
     * Called by Textmodifier after the user's setup callback completes.
     * @ignore
     */
    $runPostSetupHooks(): Promise<void>;
    $disposeAll(): Promise<void>;
    private _createAPI;
    private _registerHook;
    private _removePluginHooks;
    private _runHooks;
    private _runHooksAsync;
    private _addLayerExtension;
    private _removeLayerExtension;
    private _addMethodToLayerPrototype;
    private _removeMethodFromLayerPrototype;
}
