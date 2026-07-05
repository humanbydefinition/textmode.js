/**
 * Immutable snapshot of a single gamepad button for the current frame.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadButtonSnapshot | input.gamepad.TextmodeGamepadButtonSnapshot API reference}
 */
export interface TextmodeGamepadButtonSnapshot {
    /**
     * Whether the browser currently reports this button as pressed.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadButtonSnapshot#pressed | input.gamepad.TextmodeGamepadButtonSnapshot.pressed API reference}
     */
    pressed: boolean;
    /**
     * Whether the button is being touched, when the browser exposes that data.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadButtonSnapshot#touched | input.gamepad.TextmodeGamepadButtonSnapshot.touched API reference}
     */
    touched?: boolean;
    /**
     * Analog value in the range the browser reports, typically `0..1`.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadButtonSnapshot#value | input.gamepad.TextmodeGamepadButtonSnapshot.value API reference}
     */
    value: number;
}
/**
 * Normalized two-axis stick state for standard-mapped controllers.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadStickSnapshot | input.gamepad.TextmodeGamepadStickSnapshot API reference}
 */
export interface TextmodeGamepadStickSnapshot {
    /**
     * Horizontal stick displacement.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadStickSnapshot#x | input.gamepad.TextmodeGamepadStickSnapshot.x API reference}
     */
    x: number;
    /**
     * Vertical stick displacement.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadStickSnapshot#y | input.gamepad.TextmodeGamepadStickSnapshot.y API reference}
     */
    y: number;
    /**
     * Euclidean magnitude derived from `x` and `y`.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadStickSnapshot#magnitude | input.gamepad.TextmodeGamepadStickSnapshot.magnitude API reference}
     */
    magnitude: number;
}
/**
 * Semantic helpers derived from the browser's standard gamepad mapping.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeStandardGamepadSnapshot | input.gamepad.TextmodeStandardGamepadSnapshot API reference}
 */
export interface TextmodeStandardGamepadSnapshot {
    /**
     * Face button cluster.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeStandardGamepadSnapshot#facebuttons | input.gamepad.TextmodeStandardGamepadSnapshot.faceButtons API reference}
     */
    faceButtons: {
        south: TextmodeGamepadButtonSnapshot;
        east: TextmodeGamepadButtonSnapshot;
        west: TextmodeGamepadButtonSnapshot;
        north: TextmodeGamepadButtonSnapshot;
    };
    /**
     * Shoulder and trigger buttons.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeStandardGamepadSnapshot#shoulders | input.gamepad.TextmodeStandardGamepadSnapshot.shoulders API reference}
     */
    shoulders: {
        l1: TextmodeGamepadButtonSnapshot;
        r1: TextmodeGamepadButtonSnapshot;
        l2: TextmodeGamepadButtonSnapshot;
        r2: TextmodeGamepadButtonSnapshot;
    };
    /**
     * Center and stick-press buttons.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeStandardGamepadSnapshot#center | input.gamepad.TextmodeStandardGamepadSnapshot.center API reference}
     */
    center: {
        select: TextmodeGamepadButtonSnapshot;
        start: TextmodeGamepadButtonSnapshot;
        leftStickPress: TextmodeGamepadButtonSnapshot;
        rightStickPress: TextmodeGamepadButtonSnapshot;
        home?: TextmodeGamepadButtonSnapshot;
    };
    /**
     * Directional pad buttons.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeStandardGamepadSnapshot#dpad | input.gamepad.TextmodeStandardGamepadSnapshot.dpad API reference}
     */
    dpad: {
        up: TextmodeGamepadButtonSnapshot;
        down: TextmodeGamepadButtonSnapshot;
        left: TextmodeGamepadButtonSnapshot;
        right: TextmodeGamepadButtonSnapshot;
    };
    /**
     * Left analog stick helper.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeStandardGamepadSnapshot#leftstick | input.gamepad.TextmodeStandardGamepadSnapshot.leftStick API reference}
     */
    leftStick: TextmodeGamepadStickSnapshot;
    /**
     * Right analog stick helper.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeStandardGamepadSnapshot#rightstick | input.gamepad.TextmodeStandardGamepadSnapshot.rightStick API reference}
     */
    rightStick: TextmodeGamepadStickSnapshot;
}
/**
 * Immutable frame snapshot for a connected gamepad.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadSnapshot | input.gamepad.TextmodeGamepadSnapshot API reference}
 */
export interface TextmodeGamepadSnapshot {
    /**
     * Browser-assigned gamepad slot index.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadSnapshot#index | input.gamepad.TextmodeGamepadSnapshot.index API reference}
     */
    index: number;
    /**
     * Browser-reported identifier string.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadSnapshot#id | input.gamepad.TextmodeGamepadSnapshot.id API reference}
     */
    id: string;
    /**
     * Whether the controller is currently connected.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadSnapshot#connected | input.gamepad.TextmodeGamepadSnapshot.connected API reference}
     */
    connected: boolean;
    /**
     * Recognized browser mapping type used by textmode.js.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadSnapshot#mapping | input.gamepad.TextmodeGamepadSnapshot.mapping API reference}
     */
    mapping: '' | 'standard';
    /**
     * Browser-provided timestamp for the current state sample.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadSnapshot#timestamp | input.gamepad.TextmodeGamepadSnapshot.timestamp API reference}
     */
    timestamp: number;
    /**
     * Raw button states in browser order.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadSnapshot#buttons | input.gamepad.TextmodeGamepadSnapshot.buttons API reference}
     */
    buttons: readonly TextmodeGamepadButtonSnapshot[];
    /**
     * Raw axis values in browser order.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadSnapshot#axes | input.gamepad.TextmodeGamepadSnapshot.axes API reference}
     */
    axes: readonly number[];
    /**
     * Optional semantic helpers for standard-mapped controllers.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/TextmodeGamepadSnapshot#standard | input.gamepad.TextmodeGamepadSnapshot.standard API reference}
     */
    standard?: TextmodeStandardGamepadSnapshot;
}
/**
 * Semantic button names exposed for standard-mapped controllers.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/type-aliases/TextmodeStandardButtonName | input.gamepad.TextmodeStandardButtonName API reference}
 */
export type TextmodeStandardButtonName = 'south' | 'east' | 'west' | 'north' | 'l1' | 'r1' | 'l2' | 'r2' | 'select' | 'start' | 'leftStickPress' | 'rightStickPress' | 'home' | 'dpadUp' | 'dpadDown' | 'dpadLeft' | 'dpadRight';
/**
 * Semantic axis names exposed for standard-mapped controllers.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/type-aliases/TextmodeStandardAxisName | input.gamepad.TextmodeStandardAxisName API reference}
 */
export type TextmodeStandardAxisName = 'leftStickX' | 'leftStickY' | 'rightStickX' | 'rightStickY';
/**
 * Connection lifecycle payload emitted by the gamepad manager.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadConnectionEventData | input.gamepad.GamepadConnectionEventData API reference}
 */
export interface GamepadConnectionEventData {
    /**
     * The gamepad snapshot associated with this lifecycle transition.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadConnectionEventData#gamepad | input.gamepad.GamepadConnectionEventData.gamepad API reference}
     */
    gamepad: TextmodeGamepadSnapshot;
}
/**
 * Button edge payload emitted when a button crosses configured thresholds.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadButtonEventData | input.gamepad.GamepadButtonEventData API reference}
 */
export interface GamepadButtonEventData {
    /**
     * The gamepad whose button changed state.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadButtonEventData#gamepad | input.gamepad.GamepadButtonEventData.gamepad API reference}
     */
    gamepad: TextmodeGamepadSnapshot;
    /**
     * Button index in the raw `buttons` array.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadButtonEventData#buttonindex | input.gamepad.GamepadButtonEventData.buttonIndex API reference}
     */
    buttonIndex: number;
    /**
     * Current button snapshot.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadButtonEventData#button | input.gamepad.GamepadButtonEventData.button API reference}
     */
    button: TextmodeGamepadButtonSnapshot;
    /**
     * Previous-frame button snapshot.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadButtonEventData#previousbutton | input.gamepad.GamepadButtonEventData.previousButton API reference}
     */
    previousButton: TextmodeGamepadButtonSnapshot;
    /**
     * Semantic button alias for standard-mapped controllers.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadButtonEventData#standardbuttonname | input.gamepad.GamepadButtonEventData.standardButtonName API reference}
     */
    standardButtonName?: TextmodeStandardButtonName;
}
/**
 * Axis change payload emitted when an axis crosses configured thresholds.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadAxisEventData | input.gamepad.GamepadAxisEventData API reference}
 */
export interface GamepadAxisEventData {
    /**
     * The gamepad whose axis changed state.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadAxisEventData#gamepad | input.gamepad.GamepadAxisEventData.gamepad API reference}
     */
    gamepad: TextmodeGamepadSnapshot;
    /**
     * Axis index in the raw `axes` array.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadAxisEventData#axisindex | input.gamepad.GamepadAxisEventData.axisIndex API reference}
     */
    axisIndex: number;
    /**
     * Current axis value.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadAxisEventData#value | input.gamepad.GamepadAxisEventData.value API reference}
     */
    value: number;
    /**
     * Previous-frame axis value.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadAxisEventData#previousvalue | input.gamepad.GamepadAxisEventData.previousValue API reference}
     */
    previousValue: number;
    /**
     * Difference between current and previous values.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadAxisEventData#delta | input.gamepad.GamepadAxisEventData.delta API reference}
     */
    delta: number;
    /**
     * Semantic axis alias for standard-mapped controllers.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadAxisEventData#standardaxisname | input.gamepad.GamepadAxisEventData.standardAxisName API reference}
     */
    standardAxisName?: TextmodeStandardAxisName;
}
/**
 * Gamepad connection event callback signature.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/type-aliases/GamepadConnectionEventHandler | input.gamepad.GamepadConnectionEventHandler API reference}
 */
export type GamepadConnectionEventHandler = (data: GamepadConnectionEventData) => void;
/**
 * Gamepad button event callback signature.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/type-aliases/GamepadButtonEventHandler | input.gamepad.GamepadButtonEventHandler API reference}
 */
export type GamepadButtonEventHandler = (data: GamepadButtonEventData) => void;
/**
 * Gamepad axis event callback signature.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/type-aliases/GamepadAxisEventHandler | input.gamepad.GamepadAxisEventHandler API reference}
 */
export type GamepadAxisEventHandler = (data: GamepadAxisEventData) => void;
/**
 * Gamepad events emitted by the gamepad input manager.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadEventMap | input.gamepad.GamepadEventMap API reference}
 */
export interface GamepadEventMap {
    /**
     * Fires when a gamepad appears in the current frame snapshot.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadEventMap#gamepadconnected | input.gamepad.GamepadEventMap.gamepadConnected API reference}
     */
    gamepadConnected: GamepadConnectionEventHandler;
    /**
     * Fires when a previously seen gamepad disappears from the current frame snapshot.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadEventMap#gamepaddisconnected | input.gamepad.GamepadEventMap.gamepadDisconnected API reference}
     */
    gamepadDisconnected: GamepadConnectionEventHandler;
    /**
     * Fires when a button's value crosses above the press threshold.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadEventMap#gamepadbuttonpressed | input.gamepad.GamepadEventMap.gamepadButtonPressed API reference}
     */
    gamepadButtonPressed: GamepadButtonEventHandler;
    /**
     * Fires when a button's value crosses below the release threshold.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadEventMap#gamepadbuttonreleased | input.gamepad.GamepadEventMap.gamepadButtonReleased API reference}
     */
    gamepadButtonReleased: GamepadButtonEventHandler;
    /**
     * Fires when an axis value changes beyond the configured epsilon or crosses the deadzone boundary.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/gamepad/interfaces/GamepadEventMap#gamepadaxischanged | input.gamepad.GamepadEventMap.gamepadAxisChanged API reference}
     */
    gamepadAxisChanged: GamepadAxisEventHandler;
}
