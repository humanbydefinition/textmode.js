import type { Mixin } from './TextmodifierMixin';
import type { IKeyboardMixin } from './interfaces/IKeyboardMixin';
/**
 * Mixin that adds keyboard interaction capabilities to Textmodifier.
 *
 * This is a thin wrapper around KeyboardManager that provides the public API
 * for keyboard interaction. All the actual implementation is handled by the
 * KeyboardManager instance in the ITextmodifier.
 *
 * Provides p5.js-like keyboard functionality including key state tracking,
 * event callbacks, and special key handling.
 */
export declare const KeyboardMixin: Mixin<IKeyboardMixin>;
