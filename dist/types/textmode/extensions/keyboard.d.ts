import { type KeyboardEventHandler } from '../input/keyboard';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Register the single-callback handler for key press events.
         *
         * @param callback Handler to run with keyboard event data when a key is pressed.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/keyPressed/sketch.js}
         */
        keyPressed(callback: KeyboardEventHandler): void;
        /**
         * Register the single-callback handler for printable character input.
         *
         * This only fires for keys that produce character input, such as letters, numbers,
         * punctuation, and space. It does not fire for modifier keys or control-key chords.
         *
         * @param callback Handler to run with keyboard event data when a printable character is typed.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/keyTyped/sketch.js}
         */
        keyTyped(callback: KeyboardEventHandler): void;
        /**
         * Register the single-callback handler for key release events.
         *
         * @param callback Handler to run with keyboard event data when a key is released.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/keyReleased/sketch.js}
         */
        keyReleased(callback: KeyboardEventHandler): void;
        /**
         * Check whether a key is currently pressed.
         *
         * @param key The key to check (e.g., 'a', 'Enter', 'ArrowLeft')
         * @returns `true` when the key is currently pressed.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/isKeyPressed/sketch.js}
         */
        isKeyPressed(key: string): boolean;
        /**
         * Last key pressed, or `null` before any key press.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/lastKeyPressed/sketch.js}
         */
        readonly lastKeyPressed: string | null;
        /**
         * Last key released, or `null` before any key release.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/lastKeyReleased/sketch.js}
         */
        readonly lastKeyReleased: string | null;
        /**
         * Keys currently being held down.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/pressedKeys/sketch.js}
         */
        readonly pressedKeys: string[];
        /**
         * Current modifier key state.
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
