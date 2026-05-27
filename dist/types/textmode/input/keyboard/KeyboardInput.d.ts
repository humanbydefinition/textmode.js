import { InputEventEmitter } from '../core/InputEventEmitter';
import type { KeyboardEventMap } from './types';
/**
 * Manages all keyboard interaction for a Textmodifier instance.
 *
 * Tracks key state, exposes the most recent press/release, and dispatches
 * keyboard callbacks through the shared input event emitter.
 */
export declare class KeyboardInput {
    private _keyStates;
    private _lastKeyPressed;
    private _lastKeyReleased;
    private readonly _listeners;
    private _areListenersSetup;
    /** Multi-listener event emitter */
    readonly _emitter: InputEventEmitter<KeyboardEventMap>;
    private readonly _specialKeyMap;
    /**
     * Setup keyboard event listeners.
     */
    _setupListeners(): void;
    /**
     * Remove keyboard event listeners.
     */
    _cleanupListeners(): void;
    /**
     * Check if a specific key is currently being pressed.
     * @param key The key to check (e.g., 'a', 'Enter', 'ArrowLeft', or special constants like 'SPACE')
     * @returns true if the key is currently pressed, false otherwise
     */
    _isKeyPressed(key: string): boolean;
    /**
     * Get the last key that was pressed.
     * @returns The key string of the last pressed key, or null if no key has been pressed
     */
    _getLastKeyPressed(): string | null;
    /**
     * Get the last key that was released.
     * @returns The key string of the last released key, or null if no key has been released
     */
    _getLastKeyReleased(): string | null;
    /**
     * Get all currently pressed keys.
     * @returns Array of key strings that are currently pressed
     */
    _getPressedKeys(): string[];
    /**
     * Check if any modifier key is currently pressed.
     * @returns Object with boolean properties for each modifier key
     */
    _getModifierState(): {
        ctrl: boolean;
        shift: boolean;
        alt: boolean;
        meta: boolean;
    };
    /**
     * Reset keyboard state after focus loss.
     */
    _clearKeyStates(): void;
    /**
     * Handle key down events.
     */
    private _handleKeyDown;
    /**
     * Create normalized keyboard event data.
     */
    private _createEventData;
    /**
     * Handle key up events.
     */
    private _handleKeyUp;
    /**
     * Normalize browser key names to p5-style aliases where available.
     */
    private _normalizeKey;
    private _isTypedCharacter;
}
