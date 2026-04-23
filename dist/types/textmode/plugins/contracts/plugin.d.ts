import type { Textmodifier } from '../../Textmodifier';
import type { TextmodePluginContext } from './context';
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
     * @param context A host-provided context exposing the Textmodifier runtime and plugin hook registration methods.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/lifecycle/sketch.js}
     */
    install(textmodifier: Textmodifier, context: TextmodePluginContext): void | Promise<void>;
    /**
     * Called when the plugin is uninstalled from a {@link Textmodifier} instance.
     * @param textmodifier The Textmodifier instance the plugin is being uninstalled from.
     * @param context A host-provided context exposing the Textmodifier runtime and plugin hook registration methods.
     *
     * @example
     * {@includeCode ../../../../examples/plugins/lifecycle/sketch.js}
     */
    uninstall?(textmodifier: Textmodifier, context: TextmodePluginContext): void | Promise<void>;
}
