import type { TextmodeLayer } from '../../layers/TextmodeLayer';
/**
 * Type for layer extension method implementations.
 *
 * The `this` context is bound to the `TextmodeLayer` instance.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/type-aliases/LayerExtensionImplementation | plugins.LayerExtensionImplementation API reference}
 */
export type LayerExtensionImplementation = (this: TextmodeLayer, ...args: any[]) => unknown;
