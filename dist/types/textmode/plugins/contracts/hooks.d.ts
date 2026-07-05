import type { TextmodeLayer } from '../../layers/TextmodeLayer';
/**
 * Callback type for simple plugin hooks without parameters.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/type-aliases/TextmodePluginHook | plugins.TextmodePluginHook API reference}
 */
export type TextmodePluginHook = () => void;
/**
 * Callback type for setup lifecycle hooks.
 *
 * Can be synchronous or return a Promise for async operations.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/type-aliases/SetupLifecycleHook | plugins.SetupLifecycleHook API reference}
 */
export type SetupLifecycleHook = () => void | Promise<void>;
/**
 * Callback type for layer lifecycle events.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/type-aliases/LayerLifecycleHook | plugins.LayerLifecycleHook API reference}
 */
export type LayerLifecycleHook = (layer: TextmodeLayer) => void;
/**
 * Callback type for layer render hooks.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/type-aliases/LayerRenderHook | plugins.LayerRenderHook API reference}
 */
export type LayerRenderHook = (layer: TextmodeLayer) => void;
