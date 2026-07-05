import type { GamepadEventMap } from '../gamepad';
import type { KeyboardEventMap } from '../keyboard/types';
import type { MouseEventMap } from '../mouse';
import type { TouchEventMap } from '../touch';
/**
 * Union of every input event emitted by the library.
 *
 * This map is the single source of truth for the `on()` / `off()` / `once()` API,
 * combining keyboard, mouse, touch, gesture, and gamepad events into one flat namespace.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/type-aliases/InputEventMap | input.InputEventMap API reference}
 */
export type InputEventMap = KeyboardEventMap & MouseEventMap & TouchEventMap & GamepadEventMap;
/**
 * Every valid event name accepted by {@link Textmodifier.on}, {@link Textmodifier.off}, and {@link Textmodifier.once}.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/type-aliases/InputEventName | input.InputEventName API reference}
 */
export type InputEventName = keyof InputEventMap;
/**
 * Input subsystem that owns a given event name.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/type-aliases/InputEventOwner | input.InputEventOwner API reference}
 */
export type InputEventOwner = 'keyboard' | 'mouse' | 'touch' | 'gesture' | 'gamepad';
/**
 * Keyboard event names supported by the shared input event API.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/variables/KEYBOARD_EVENT_NAMES | input.keyboard.KEYBOARD_EVENT_NAMES API reference}
 */
export declare const KEYBOARD_EVENT_NAMES: readonly ["keyPressed", "keyTyped", "keyReleased"];
/**
 * Mouse event names supported by the shared input event API.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/variables/MOUSE_EVENT_NAMES | input.mouse.MOUSE_EVENT_NAMES API reference}
 */
export declare const MOUSE_EVENT_NAMES: readonly ["mouseClicked", "doubleClicked", "mousePressed", "mouseReleased", "mouseMoved", "mouseDragged", "mouseScrolled"];
/**
 * Touch lifecycle event names supported by the shared input event API.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/variables/TOUCH_EVENT_NAMES | input.touch.TOUCH_EVENT_NAMES API reference}
 */
export declare const TOUCH_EVENT_NAMES: readonly ["touchStarted", "touchMoved", "touchEnded", "touchCancelled"];
/**
 * Touch gesture event names supported by the shared input event API.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/touch/variables/GESTURE_EVENT_NAMES | input.touch.GESTURE_EVENT_NAMES API reference}
 */
export declare const GESTURE_EVENT_NAMES: readonly ["tap", "doubleTap", "longPress", "swipe", "pinch", "rotateGesture"];
/**
 * Gamepad event names supported by the shared input event API.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/variables/GAMEPAD_EVENT_NAMES | input.gamepad.GAMEPAD_EVENT_NAMES API reference}
 */
export declare const GAMEPAD_EVENT_NAMES: readonly ["gamepadConnected", "gamepadDisconnected", "gamepadButtonPressed", "gamepadButtonReleased", "gamepadAxisChanged"];
/**
 * Flat readonly list of every input event name accepted by {@link Textmodifier.on}, {@link Textmodifier.off}, and
 * {@link Textmodifier.once}.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/variables/INPUT_EVENT_NAMES | input.INPUT_EVENT_NAMES API reference}
 */
export declare const INPUT_EVENT_NAMES: readonly ["keyPressed", "keyTyped", "keyReleased", "mouseClicked", "doubleClicked", "mousePressed", "mouseReleased", "mouseMoved", "mouseDragged", "mouseScrolled", "touchStarted", "touchMoved", "touchEnded", "touchCancelled", "tap", "doubleTap", "longPress", "swipe", "pinch", "rotateGesture", "gamepadConnected", "gamepadDisconnected", "gamepadButtonPressed", "gamepadButtonReleased", "gamepadAxisChanged"];
/**
 * A typed observer registry for all textmode input events.
 *
 * Replaces single-callback fields with a multi-listener model that supports
 * `on()`, `off()`, and `once()` — enabling plugins, composed behaviours, and
 * per-frame polling to coexist on the same event without overwriting each other.
 *
 * One bus is shared across all input managers (mouse, keyboard, touch, gamepad)
 * for a single {@link Textmodifier} instance.
 *
 * @template TEventMap - The event map (defaults to the full {@link InputEventMap} union).
 */
export declare class InputEventBus<TEventMap extends {
    [K in keyof TEventMap]: (...args: never[]) => void;
} = InputEventMap> {
    private _listeners;
    /**
     * Register a listener for the given event.
     *
     * @returns A dispose function that removes this specific listener.
     */
    _on<K extends keyof TEventMap>(event: K, fn: TEventMap[K]): () => void;
    /**
     * Remove a previously registered listener.
     * If the same function was added multiple times, only the first match is removed.
     */
    _off<K extends keyof TEventMap>(event: K, fn: TEventMap[K]): void;
    /**
     * Register a listener that fires at most once, then auto-removes itself.
     *
     * @returns A dispose function that removes this specific listener.
     */
    _once<K extends keyof TEventMap>(event: K, fn: TEventMap[K]): () => void;
    /**
     * Emit an event, calling all registered listeners in registration order.
     * `once` listeners are removed after invocation.
     */
    _emit<K extends keyof TEventMap>(event: K, ...args: Parameters<TEventMap[K]>): void;
    /**
     * Check whether a given event has any listeners registered.
     */
    _hasListeners<K extends keyof TEventMap>(event: K): boolean;
    /**
     * Remove all listeners, optionally scoped to a single event.
     */
    _removeAll(event?: keyof TEventMap): void;
}
