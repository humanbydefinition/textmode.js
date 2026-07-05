import type { Textmodifier } from '../../Textmodifier';
import type { TextmodePluginContext } from './context';
/**
 * A plugin interface for extending the functionality of a {@link Textmodifier} instance.
 *
 * Create plugins by implementing this interface.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePlugin | plugins.TextmodePlugin API reference}
 */
export interface TextmodePlugin {
    /**
     * Unique name for the plugin.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePlugin#name | plugins.TextmodePlugin.name API reference}
     */
    name: string;
    /**
     * Version string for the plugin.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePlugin#version | plugins.TextmodePlugin.version API reference}
     */
    version?: string;
    /**
     * Called when the plugin is installed on a {@link Textmodifier} instance.
     * @param textmodifier The Textmodifier instance the plugin is being installed on.
     * @param context A host-provided context exposing the Textmodifier runtime and plugin hook registration methods.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/install/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePlugin#install | plugins.TextmodePlugin.install API reference}
     */
    install(textmodifier: Textmodifier, context: TextmodePluginContext): void | Promise<void>;
    /**
     * Called when the plugin is uninstalled from a {@link Textmodifier} instance.
     * @param textmodifier The Textmodifier instance the plugin is being uninstalled from.
     * @param context A host-provided context exposing the Textmodifier runtime and plugin hook registration methods.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/uninstall/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/interfaces/TextmodePlugin#uninstall | plugins.TextmodePlugin.uninstall API reference}
     */
    uninstall?(textmodifier: Textmodifier, context: TextmodePluginContext): void | Promise<void>;
}
