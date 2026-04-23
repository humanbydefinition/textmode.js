import type { KeyboardEventHandler } from '../input/keyboard';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Set a callback function that will be called when a key is pressed down.
         *
         * @param callback The function to call when a key is pressed
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/keyPressed/sketch.js}
         */
        keyPressed(callback: KeyboardEventHandler): void;
        /**
         * Set a callback function that will be called when a printable character is typed.
         *
         * This only fires for keys that produce character input, such as letters, numbers,
         * punctuation, and space. It does not fire for modifier keys or control-key chords.
         *
         * @param callback The function to call when a printable character is typed
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/keyTyped/sketch.js}
         */
        keyTyped(callback: KeyboardEventHandler): void;
        /**
         * Set a callback function that will be called when a key is released.
         *
         * @param callback The function to call when a key is released
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/keyReleased/sketch.js}
         */
        keyReleased(callback: KeyboardEventHandler): void;
        /**
         * Check if a specific key is currently being pressed.
         *
         * @param key The key to check (e.g., 'a', 'Enter', 'ArrowLeft')
         * @returns true if the key is currently pressed, false otherwise
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/isKeyPressed/sketch.js}
         */
        isKeyPressed(key: string): boolean;
        /**
         * Get the last key that was pressed.
         *
         * Returns the key string of the last pressed key, or null if no key has been pressed.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/lastKeyPressed/sketch.js}
         */
        readonly lastKeyPressed: string | null;
        /**
         * Get the last key that was released.
         *
         * Returns the key string of the last released key, or null if no key has been released.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/lastKeyReleased/sketch.js}
         */
        readonly lastKeyReleased: string | null;
        /**
         * Get all currently pressed keys.
         *
         * Returns an array of key strings that are currently being held down.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/pressedKeys/sketch.js}
         */
        readonly pressedKeys: string[];
        /**
         * Get current modifier key states.
         *
         * Returns an object with boolean properties for each modifier key.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/modifierState/sketch.js}
         */
        readonly modifierState: {
            /** Whether the Ctrl key is currently pressed */
            ctrl: boolean;
            /** Whether the Shift key is currently pressed */
            shift: boolean;
            /** Whether the Alt key is currently pressed */
            alt: boolean;
            /** Whether the Meta key *(Command on Mac, Windows key on Windows)* is currently pressed */
            meta: boolean;
        };
    }
}
