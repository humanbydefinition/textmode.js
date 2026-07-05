import { type GamepadAxisEventHandler, type GamepadButtonEventHandler, type GamepadConnectionEventHandler, type TextmodeGamepadSnapshot } from '../input/gamepad';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Register the single-callback handler for gamepad connection events.
         *
         * This is a legacy-style single-callback shortcut for the `'gamepadConnected'` event.
         * Calling it replaces the previous callback registered through this same method while
         * leaving any listeners added via {@link Textmodifier.on} untouched.
         *
         * @param callback Handler to run with gamepad connection data when a controller connects.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/gamepadConnected/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/gamepadConnected | Textmodifier.gamepadConnected API reference}
         */
        gamepadConnected(callback: GamepadConnectionEventHandler): void;
        /**
         * Register the single-callback handler for gamepad disconnection events.
         *
         * This is a legacy-style single-callback shortcut for the `'gamepadDisconnected'` event.
         *
         * @param callback Handler to run with gamepad connection data when a controller disconnects.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/gamepadDisconnected/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/gamepadDisconnected | Textmodifier.gamepadDisconnected API reference}
         */
        gamepadDisconnected(callback: GamepadConnectionEventHandler): void;
        /**
         * Register the single-callback handler for gamepad button press events.
         *
         * This is a legacy-style single-callback shortcut for the `'gamepadButtonPressed'` event.
         *
         * @param callback Handler to run with gamepad button data when a button is pressed.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/gamepadButtonPressed/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/gamepadButtonPressed | Textmodifier.gamepadButtonPressed API reference}
         */
        gamepadButtonPressed(callback: GamepadButtonEventHandler): void;
        /**
         * Register the single-callback handler for gamepad button release events.
         *
         * This is a legacy-style single-callback shortcut for the `'gamepadButtonReleased'` event.
         *
         * @param callback Handler to run with gamepad button data when a button is released.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/gamepadButtonReleased/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/gamepadButtonReleased | Textmodifier.gamepadButtonReleased API reference}
         */
        gamepadButtonReleased(callback: GamepadButtonEventHandler): void;
        /**
         * Register the single-callback handler for meaningful gamepad axis changes.
         *
         * Axis callbacks are derived from per-frame polling, not native DOM events. For continuous
         * stick or trigger state, polling {@link Textmodifier.gamepads} inside `draw()` is often the
         * simpler choice; use this callback when you specifically want change notifications.
         *
         * @param callback Handler to run with gamepad axis data when an axis changes.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/gamepadAxisChanged/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/gamepadAxisChanged | Textmodifier.gamepadAxisChanged API reference}
         */
        gamepadAxisChanged(callback: GamepadAxisEventHandler): void;
        /**
         * Currently connected gamepads as a compact readonly list.
         *
         * The returned array is sorted by browser `Gamepad.index`, but unlike the browser API
         * it does not contain sparse `null` holes for disconnected slots. Use
         * {@link Textmodifier.gamepad} when you need to resolve a specific browser slot index.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/gamepads/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/properties/gamepads | Textmodifier.gamepads API reference}
         */
        readonly gamepads: readonly TextmodeGamepadSnapshot[];
        /**
         * Resolve a connected gamepad by its browser-assigned slot index.
         *
         * Returns `undefined` when that slot is currently absent or disconnected.
         *
         * @param index The browser `Gamepad.index` to resolve.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/gamepad/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/gamepad | Textmodifier.gamepad API reference}
         */
        gamepad(index: number): TextmodeGamepadSnapshot | undefined;
    }
}
