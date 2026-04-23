export type { KeyboardEventData, KeyboardEventHandler } from './types';
/**
 * All keyboard event names accepted by {@link Textmodifier.on}, {@link Textmodifier.off}, and
 * {@link Textmodifier.once}.
 *
 * @example
 * ```ts
 * t.on(input.keyboard.KEYBOARD_EVENT_NAMES[0], (data) => {
 *   console.log(data.key);
 * });
 * ```
 */
export { KEYBOARD_EVENT_NAMES } from '../core/InputEventRegistry';
