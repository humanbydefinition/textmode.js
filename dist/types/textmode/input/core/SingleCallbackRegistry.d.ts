import type { Textmodifier } from '../../Textmodifier';
import type { InputEventMap } from './InputEventRegistry';
/**
 * Replace the single-callback registration for one input event.
 *
 * This preserves the p5-style callback semantics where assigning a callback for
 * one event replaces the previous single callback for that same event, while
 * still routing through the shared typed emitter infrastructure.
 *
 * Unlike `_removeAll`, this only removes the previous single-callback listener,
 * leaving any listeners registered via `on()` intact.
 */
export declare function replaceSingleInputCallback<K extends keyof InputEventMap>(self: Textmodifier, event: K, handler: InputEventMap[K]): void;
