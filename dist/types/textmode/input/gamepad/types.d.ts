/**
 * Immutable snapshot of a single gamepad button for the current frame.
 */
export interface TextmodeGamepadButtonSnapshot {
    /** Whether the browser currently reports this button as pressed. */
    pressed: boolean;
    /** Whether the button is being touched, when the browser exposes that data. */
    touched?: boolean;
    /** Analog value in the range the browser reports, typically `0..1`. */
    value: number;
}
/**
 * Normalized two-axis stick state for standard-mapped controllers.
 */
export interface TextmodeGamepadStickSnapshot {
    /** Horizontal stick displacement. */
    x: number;
    /** Vertical stick displacement. */
    y: number;
    /** Euclidean magnitude derived from `x` and `y`. */
    magnitude: number;
}
/**
 * Semantic helpers derived from the browser's standard gamepad mapping.
 */
export interface TextmodeStandardGamepadSnapshot {
    /** Face button cluster. */
    faceButtons: {
        south: TextmodeGamepadButtonSnapshot;
        east: TextmodeGamepadButtonSnapshot;
        west: TextmodeGamepadButtonSnapshot;
        north: TextmodeGamepadButtonSnapshot;
    };
    /** Shoulder and trigger buttons. */
    shoulders: {
        l1: TextmodeGamepadButtonSnapshot;
        r1: TextmodeGamepadButtonSnapshot;
        l2: TextmodeGamepadButtonSnapshot;
        r2: TextmodeGamepadButtonSnapshot;
    };
    /** Center and stick-press buttons. */
    center: {
        select: TextmodeGamepadButtonSnapshot;
        start: TextmodeGamepadButtonSnapshot;
        leftStickPress: TextmodeGamepadButtonSnapshot;
        rightStickPress: TextmodeGamepadButtonSnapshot;
        home?: TextmodeGamepadButtonSnapshot;
    };
    /** Directional pad buttons. */
    dpad: {
        up: TextmodeGamepadButtonSnapshot;
        down: TextmodeGamepadButtonSnapshot;
        left: TextmodeGamepadButtonSnapshot;
        right: TextmodeGamepadButtonSnapshot;
    };
    /** Left analog stick helper. */
    leftStick: TextmodeGamepadStickSnapshot;
    /** Right analog stick helper. */
    rightStick: TextmodeGamepadStickSnapshot;
}
/**
 * Immutable frame snapshot for a connected gamepad.
 */
export interface TextmodeGamepadSnapshot {
    /** Browser-assigned gamepad slot index. */
    index: number;
    /** Browser-reported identifier string. */
    id: string;
    /** Whether the controller is currently connected. */
    connected: boolean;
    /** Recognized browser mapping type used by textmode.js. */
    mapping: '' | 'standard';
    /** Browser-provided timestamp for the current state sample. */
    timestamp: number;
    /** Raw button states in browser order. */
    buttons: readonly TextmodeGamepadButtonSnapshot[];
    /** Raw axis values in browser order. */
    axes: readonly number[];
    /** Optional semantic helpers for standard-mapped controllers. */
    standard?: TextmodeStandardGamepadSnapshot;
}
/**
 * Semantic button names exposed for standard-mapped controllers.
 */
export type TextmodeStandardButtonName = 'south' | 'east' | 'west' | 'north' | 'l1' | 'r1' | 'l2' | 'r2' | 'select' | 'start' | 'leftStickPress' | 'rightStickPress' | 'home' | 'dpadUp' | 'dpadDown' | 'dpadLeft' | 'dpadRight';
/**
 * Semantic axis names exposed for standard-mapped controllers.
 */
export type TextmodeStandardAxisName = 'leftStickX' | 'leftStickY' | 'rightStickX' | 'rightStickY';
/**
 * Connection lifecycle payload emitted by the gamepad manager.
 */
export interface GamepadConnectionEventData {
    /** The gamepad snapshot associated with this lifecycle transition. */
    gamepad: TextmodeGamepadSnapshot;
}
/**
 * Button edge payload emitted when a button crosses configured thresholds.
 */
export interface GamepadButtonEventData {
    /** The gamepad whose button changed state. */
    gamepad: TextmodeGamepadSnapshot;
    /** Button index in the raw `buttons` array. */
    buttonIndex: number;
    /** Current button snapshot. */
    button: TextmodeGamepadButtonSnapshot;
    /** Previous-frame button snapshot. */
    previousButton: TextmodeGamepadButtonSnapshot;
    /** Semantic button alias for standard-mapped controllers. */
    standardButtonName?: TextmodeStandardButtonName;
}
/**
 * Axis change payload emitted when an axis crosses configured thresholds.
 */
export interface GamepadAxisEventData {
    /** The gamepad whose axis changed state. */
    gamepad: TextmodeGamepadSnapshot;
    /** Axis index in the raw `axes` array. */
    axisIndex: number;
    /** Current axis value. */
    value: number;
    /** Previous-frame axis value. */
    previousValue: number;
    /** Difference between current and previous values. */
    delta: number;
    /** Semantic axis alias for standard-mapped controllers. */
    standardAxisName?: TextmodeStandardAxisName;
}
/** Gamepad connection event handler. */
export type GamepadConnectionEventHandler = (data: GamepadConnectionEventData) => void;
/** Gamepad button event handler. */
export type GamepadButtonEventHandler = (data: GamepadButtonEventData) => void;
/** Gamepad axis event handler. */
export type GamepadAxisEventHandler = (data: GamepadAxisEventData) => void;
/**
 * Event map for all gamepad events emitted by the {@link GamepadInput}.
 */
export interface GamepadEventMap {
    /** Fires when a gamepad appears in the current frame snapshot. */
    gamepadConnected: GamepadConnectionEventHandler;
    /** Fires when a previously seen gamepad disappears from the current frame snapshot. */
    gamepadDisconnected: GamepadConnectionEventHandler;
    /** Fires when a button's value crosses above the press threshold. */
    gamepadButtonPressed: GamepadButtonEventHandler;
    /** Fires when a button's value crosses below the release threshold. */
    gamepadButtonReleased: GamepadButtonEventHandler;
    /** Fires when an axis value changes beyond the configured epsilon or crosses the deadzone boundary. */
    gamepadAxisChanged: GamepadAxisEventHandler;
}
