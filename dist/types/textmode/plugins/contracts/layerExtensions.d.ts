import type { TextmodeLayer } from '../../layers/TextmodeLayer';
/**
 * Type for layer extension method implementations.
 *
 * The `this` context is bound to the `TextmodeLayer` instance.
 */
export type LayerExtensionImplementation = (this: TextmodeLayer, ...args: any[]) => unknown;
