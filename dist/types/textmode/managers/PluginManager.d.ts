import type { Textmodifier } from '../Textmodifier';
import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import type { GLFramebuffer } from '../../rendering';
import type { TextmodeFont } from '../loadables/font';
import type { TextmodeGrid } from '../Grid';
import type { TextmodeCanvas } from '../Canvas';
export type TextmodePluginHook = () => void;
/**
 * An extended API provided to plugins when they are installed on a {@link Textmodifier} instance.
 */
export interface TextmodePluginAPI {
    /** The WebGL renderer used by the Textmodifier instance. */
    renderer: GLRenderer;
    /** The font used by the Textmodifier instance. */
    font: TextmodeFont;
    /** The grid used by the Textmodifier instance. */
    grid: TextmodeGrid;
    /** The canvas used by the Textmodifier instance. */
    canvas: TextmodeCanvas;
    /** The framebuffer the user draws to with 3 render targets. */
    drawFramebuffer: GLFramebuffer;
    /** The framebuffer containing the ASCII representation.<br/>
     * This framebuffer only has a single render target. */
    asciiFramebuffer: GLFramebuffer;
    /**
     * Register a callback to be invoked before each draw cycle. Happens just before the draw framebuffer is being bound.
     */
    registerPreDrawHook(callback: () => void): () => void;
    /**
     * Register a callback to be invoked after each draw cycle. Happens outside of the draw framebuffer being bound after the final result is drawn to the screen.
     */
    registerPostDrawHook(callback: () => void): () => void;
}
/**
 * A plugin interface for extending the functionality of a {@link Textmodifier} instance.
 *
 * Users can create plugins by implementing this interface.
 *
 * @note
 * Plugins are currently experimental and the API may change in future releases.
 * For now, it has been integrated to outsource export features to `textmode.export.js`.
 * Documentation and examples will be provided as the plugin system matures.
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
export declare class TextmodePluginManager {
    private readonly _textmodifier;
    private readonly _plugins;
    private readonly _installationOrder;
    private readonly _preDrawHooks;
    private readonly _postDrawHooks;
    constructor(textmodifier: Textmodifier);
    $installMany(plugins: TextmodePlugin[]): Promise<void>;
    $unuse(pluginName: string): Promise<void>;
    $runPreDrawHooks(): void;
    $runPostDrawHooks(): void;
    $disposeAll(): Promise<void>;
    private _createAPI;
    private _registerHook;
    private _removePluginHooks;
    private _runHooks;
}
