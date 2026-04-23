import type { GamepadEventMap } from '../gamepad';
import type { KeyboardEventMap } from '../keyboard/types';
import type { MouseEventMap } from '../mouse';
import type { TouchEventMap } from '../touch';
/**
 * Union of every input event emitted by the library.
 *
 * This map is the single source of truth for the `on()` / `off()` / `once()` API,
 * combining keyboard, mouse, touch, gesture, and gamepad events into one flat namespace.
 */
export type InputEventMap = KeyboardEventMap & MouseEventMap & TouchEventMap & GamepadEventMap;
/**
 * Every valid event name accepted by {@link Textmodifier.on}, {@link Textmodifier.off}, and {@link Textmodifier.once}.
 */
export type InputEventName = keyof InputEventMap;
/**
 * Input subsystem that owns a given event name.
 */
export type InputEventOwner = 'keyboard' | 'mouse' | 'touch' | 'gesture' | 'gamepad';
/**
 * Keyboard event names supported by the shared input event API.
 */
export declare const KEYBOARD_EVENT_NAMES: readonly ["keyPressed", "keyTyped", "keyReleased"];
/**
 * Mouse event names supported by the shared input event API.
 */
export declare const MOUSE_EVENT_NAMES: readonly ["mouseClicked", "doubleClicked", "mousePressed", "mouseReleased", "mouseMoved", "mouseDragged", "mouseScrolled"];
/**
 * Touch lifecycle event names supported by the shared input event API.
 */
export declare const TOUCH_EVENT_NAMES: readonly ["touchStarted", "touchMoved", "touchEnded", "touchCancelled"];
/**
 * Touch gesture event names supported by the shared input event API.
 */
export declare const GESTURE_EVENT_NAMES: readonly ["tap", "doubleTap", "longPress", "swipe", "pinch", "rotateGesture"];
/**
 * Gamepad event names supported by the shared input event API.
 */
export declare const GAMEPAD_EVENT_NAMES: readonly ["gamepadConnected", "gamepadDisconnected", "gamepadButtonPressed", "gamepadButtonReleased", "gamepadAxisChanged"];
/**
 * Flat readonly list of every input event name accepted by {@link Textmodifier.on}, {@link Textmodifier.off}, and
 * {@link Textmodifier.once}.
 */
export declare const INPUT_EVENT_NAMES: readonly ["keyPressed", "keyTyped", "keyReleased", "mouseClicked", "doubleClicked", "mousePressed", "mouseReleased", "mouseMoved", "mouseDragged", "mouseScrolled", "touchStarted", "touchMoved", "touchEnded", "touchCancelled", "tap", "doubleTap", "longPress", "swipe", "pinch", "rotateGesture", "gamepadConnected", "gamepadDisconnected", "gamepadButtonPressed", "gamepadButtonReleased", "gamepadAxisChanged"];
export declare function getInputEventOwner(event: InputEventName): InputEventOwner;
