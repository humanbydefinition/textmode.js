/**
 * Keyboard event payload passed to input callbacks.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/interfaces/KeyboardEventData | input.keyboard.KeyboardEventData API reference}
 */
export interface KeyboardEventData {
    /**
     * The key that was pressed/released (e.g., 'a', 'Enter', 'ArrowLeft').
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/interfaces/KeyboardEventData#key | input.keyboard.KeyboardEventData.key API reference}
     */
    key: string;
    /**
     * The key code (for compatibility).
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/interfaces/KeyboardEventData#keycode | input.keyboard.KeyboardEventData.keyCode API reference}
     */
    keyCode: number;
    /**
     * Whether Ctrl key is held down.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/interfaces/KeyboardEventData#ctrlkey | input.keyboard.KeyboardEventData.ctrlKey API reference}
     */
    ctrlKey: boolean;
    /**
     * Whether Shift key is held down.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/interfaces/KeyboardEventData#shiftkey | input.keyboard.KeyboardEventData.shiftKey API reference}
     */
    shiftKey: boolean;
    /**
     * Whether Alt key is held down.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/interfaces/KeyboardEventData#altkey | input.keyboard.KeyboardEventData.altKey API reference}
     */
    altKey: boolean;
    /**
     * Whether Meta key (Windows/Cmd) is held down.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/interfaces/KeyboardEventData#metakey | input.keyboard.KeyboardEventData.metaKey API reference}
     */
    metaKey: boolean;
    /**
     * Whether this key is currently held down for this event.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/interfaces/KeyboardEventData#ispressed | input.keyboard.KeyboardEventData.isPressed API reference}
     */
    isPressed: boolean;
    /**
     * Original DOM keyboard event.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/interfaces/KeyboardEventData#originalevent | input.keyboard.KeyboardEventData.originalEvent API reference}
     */
    originalEvent: KeyboardEvent;
}
/**
 * Keyboard event callback signature.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/type-aliases/KeyboardEventHandler | input.keyboard.KeyboardEventHandler API reference}
 */
export type KeyboardEventHandler = (data: KeyboardEventData) => void;
/**
 * Key state information.
 */
export interface KeyState {
    /** Whether the key is currently pressed. */
    isPressed: boolean;
    /** Timestamp when the key was last pressed. */
    lastPressTime: number;
    /** Timestamp when the key was last released. */
    lastReleaseTime: number;
}
/**
 * Keyboard events emitted by the keyboard input manager.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/interfaces/KeyboardEventMap | input.keyboard.KeyboardEventMap API reference}
 */
export interface KeyboardEventMap {
    /**
     * Fires when a key is pressed down (no repeat).
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/interfaces/KeyboardEventMap#keypressed | input.keyboard.KeyboardEventMap.keyPressed API reference}
     */
    keyPressed: KeyboardEventHandler;
    /**
     * Fires when a printable character is typed.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/interfaces/KeyboardEventMap#keytyped | input.keyboard.KeyboardEventMap.keyTyped API reference}
     */
    keyTyped: KeyboardEventHandler;
    /**
     * Fires when a key is released.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/keyboard/interfaces/KeyboardEventMap#keyreleased | input.keyboard.KeyboardEventMap.keyReleased API reference}
     */
    keyReleased: KeyboardEventHandler;
}
