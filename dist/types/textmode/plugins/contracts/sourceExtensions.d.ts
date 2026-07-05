import type { TextmodeSource } from '../../media/TextmodeSource';
/**
 * Type for source extension method implementations.
 *
 * The `this` context is bound to the `TextmodeSource` instance.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins/type-aliases/SourceExtensionImplementation | plugins.SourceExtensionImplementation API reference}
 */
export type SourceExtensionImplementation = (this: TextmodeSource, ...args: any[]) => unknown;
