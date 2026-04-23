/**
 * Key event data passed to event handlers.
 */
export interface KeyboardEventData {
    /** The key that was pressed/released (e.g., 'a', 'Enter', 'ArrowLeft'). */
    key: string;
    /** The key code (for compatibility). */
    keyCode: number;
    /** Whether Ctrl key is held down. */
    ctrlKey: boolean;
    /** Whether Shift key is held down. */
    shiftKey: boolean;
    /** Whether Alt key is held down. */
    altKey: boolean;
    /** Whether Meta key (Windows/Cmd) is held down. */
    metaKey: boolean;
    /** Whether this key is currently being held down (for keyPressed) or was released (for keyReleased). */
    isPressed: boolean;
    /** Original DOM keyboard event. */
    originalEvent: KeyboardEvent;
}
/**
 * Keyboard event handler function type.
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
 * Event map for all keyboard events emitted by the {@link KeyboardInput}.
 */
export interface KeyboardEventMap {
    /** Fires when a key is pressed down (no repeat). */
    keyPressed: KeyboardEventHandler;
    /** Fires when a printable character is typed. */
    keyTyped: KeyboardEventHandler;
    /** Fires when a key is released. */
    keyReleased: KeyboardEventHandler;
}
