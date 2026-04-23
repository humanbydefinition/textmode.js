/**
 * Types and interfaces for gamepad event handling
 */
export * as gamepad from './gamepad';
/**
 * Types and interfaces for keyboard event handling
 */
export * as keyboard from './keyboard';
/**
 * Types and interfaces for mouse event handling
 */
export * as mouse from './mouse';
/**
 * Types and interfaces for touch event handling
 */
export * as touch from './touch';
/**
 * Combined event map unifying keyboard, mouse, touch, gamepad, and gesture events
 */
export type { InputEventMap, InputEventName, InputEventOwner } from './core/InputEventRegistry';
/**
 * Flat readonly list of every event name accepted by {@link Textmodifier.on}, {@link Textmodifier.off}, and
 * {@link Textmodifier.once}.
 *
 * Use this when you need to inspect or document the full event surface at runtime.
 * For per-domain event lists, see {@link input.keyboard.KEYBOARD_EVENT_NAMES},
 * {@link input.mouse.MOUSE_EVENT_NAMES}, {@link input.touch.TOUCH_EVENT_NAMES},
 * {@link input.touch.GESTURE_EVENT_NAMES}, and {@link input.gamepad.GAMEPAD_EVENT_NAMES}.
 */
export { INPUT_EVENT_NAMES } from './core/InputEventRegistry';
