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
/**
 * Key state information
 * @ignore
 */
export interface KeyState {
    /** Whether the key is currently pressed */
    isPressed: boolean;
    /** Timestamp when the key was last pressed */
    lastPressTime: number;
    /** Timestamp when the key was last released */
    lastReleaseTime: number;
}
/**
 * Manages all keyboard interaction for a Textmodifier instance.
 * Handles event listeners, key state tracking, and event dispatching.
 *
 * Provides keyboard functionality including:
 * - keyPressed() and keyReleased() callbacks
 * - Current key state tracking
 * - Special key handling (arrows, function keys, etc.)
 * - Modifier key support (Ctrl, Shift, Alt, Meta)
 * @ignore
 */
export declare class KeyboardManager {
    private _keyStates;
    private _lastKeyPressed;
    private _lastKeyReleased;
    private _keyDownListener;
    private _keyUpListener;
    private _areListenersSetup;
    private _keyPressedCallback?;
    private _keyReleasedCallback?;
    private readonly _specialKeyMap;
    /**
     * Setup keyboard event listeners.
     */
    $setupListeners(): void;
    /**
     * Remove keyboard event listeners.
     */
    $cleanupListeners(): void;
    /**
     * Set a callback function that will be called when a key is pressed down.
     * @param callback The function to call when a key is pressed
     */
    $setPressedCallback(callback: KeyboardEventHandler): void;
    /**
     * Set a callback function that will be called when a key is released.
     * @param callback The function to call when a key is released
     */
    $setReleasedCallback(callback: KeyboardEventHandler): void;
    /**
     * Check if a specific key is currently being pressed.
     * @param key The key to check (e.g., 'a', 'Enter', 'ArrowLeft', or special constants like 'SPACE')
     * @returns true if the key is currently pressed, false otherwise
     */
    $isKeyPressed(key: string): boolean;
    /**
     * Get the last key that was pressed.
     * @returns The key string of the last pressed key, or null if no key has been pressed
     */
    $getLastKeyPressed(): string | null;
    /**
     * Get the last key that was released.
     * @returns The key string of the last released key, or null if no key has been released
     */
    $getLastKeyReleased(): string | null;
    /**
     * Get all currently pressed keys.
     * @returns Array of key strings that are currently pressed
     */
    $getPressedKeys(): string[];
    /**
     * Check if any modifier key is currently pressed.
     * @returns Object with boolean properties for each modifier key
     */
    $getModifierState(): {
        ctrl: boolean;
        shift: boolean;
        alt: boolean;
        meta: boolean;
    };
    /**
     * Clear all key states (useful for focus loss scenarios).
     */
    $clearKeyStates(): void;
    /**
     * Handle key down events
     */
    private _handleKeyDown;
    /**
     * Handle key up events
     */
    private _handleKeyUp;
    /**
     * Normalize key names for consistency
     */
    private _normalizeKey;
}
