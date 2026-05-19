import type { TextmodeSource } from '../../media/TextmodeSource';
/**
 * Type for source extension method implementations.
 *
 * The `this` context is bound to the `TextmodeSource` instance.
 */
export type SourceExtensionImplementation = (this: TextmodeSource, ...args: any[]) => unknown;
