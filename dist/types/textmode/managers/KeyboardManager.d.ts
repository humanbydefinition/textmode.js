/**
 * Key event data passed to event handlers
 */
export interface KeyboardEventData {
    /** The key that was pressed/released (e.g., 'a', 'Enter', 'ArrowLeft') */
    key: string;
    /** The key code (for compatibility) */
    keyCode: number;
    /** Whether Ctrl key is held down */
    ctrlKey: boolean;
    /** Whether Shift key is held down */
    shiftKey: boolean;
    /** Whether Alt key is held down */
    altKey: boolean;
    /** Whether Meta key (Windows/Cmd) is held down */
    metaKey: boolean;
    /** Whether this key is currently being held down (for keyPressed) or was released (for keyReleased) */
    isPressed: boolean;
    /** Original DOM keyboard event */
    originalEvent: KeyboardEvent;
}
/**
 * Keyboard event handler function type
 */
export type KeyboardEventHandler = (data: KeyboardEventData) => void;
