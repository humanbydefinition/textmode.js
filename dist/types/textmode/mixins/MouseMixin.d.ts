import type { Mixin } from './TextmodifierMixin';
import type { IMouseMixin } from './interfaces/IMouseMixin';
/**
 * Mixin that adds mouse tracking capabilities to Textmodifier.
 *
 * This is a thin wrapper around MouseManager that provides the public API
 * for mouse interaction. All the actual implementation is handled by the
 * MouseManager instance in the ITextmodifier.
 */
export declare const MouseMixin: Mixin<IMouseMixin>;
