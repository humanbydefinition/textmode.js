import type { TextmodeLayer } from '../../layers/TextmodeLayer';
/**
 * Callback type for simple plugin hooks without parameters.
 */
export type TextmodePluginHook = () => void;
/**
 * Callback type for setup lifecycle hooks.
 *
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
