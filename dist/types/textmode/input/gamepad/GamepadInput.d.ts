import { InputEventEmitter } from '../core/InputEventEmitter';
import type { GamepadEventMap, TextmodeGamepadSnapshot, TextmodeStandardAxisName, TextmodeStandardButtonName } from './types';
interface GamepadInputConfig {
    axisDeadzone: number;
    axisChangeEpsilon: number;
    buttonPressThreshold: number;
    buttonReleaseThreshold: number;
}
/**
 * Manages browser Gamepad API polling and lifecycle events for a Textmodifier instance.
 *
 * The Gamepad API is frame-polled by design. This manager stores library-owned snapshots
 * derived from `navigator.getGamepads()` and emits connection lifecycle events from the
 * observed state transitions between frames.
 */
export declare class GamepadInput {
    private readonly _config;
    private _gamepads;
    private _gamepadsByIndex;
    private _previousByIndex;
    private readonly _listeners;
    private _areListenersSetup;
    private _nativeConnectedHints;
    private _nativeDisconnectedHints;
    /** Multi-listener event emitter. */
    readonly _emitter: InputEventEmitter<GamepadEventMap>;
    /**
     * Create a new GamepadInput.
     * @param config Optional internal threshold overrides used by future phases and tests.
     */
    constructor(config?: Partial<GamepadInputConfig>);
    /**
     * Install browser gamepad lifecycle listeners on `window`.
     */
    _setupListeners(): void;
    /**
     * Remove browser listeners and clear all tracked state.
     */
    _cleanupListeners(): void;
    /**
     * Poll `navigator.getGamepads()`, refresh library-owned snapshots, and emit
     * connect / disconnect lifecycle events and derived button / axis events
     * for any observed changes.
     */
    _syncFrameState(): void;
    /**
     * Get the current compact list of connected gamepad snapshots.
     */
    _getGamepads(): readonly TextmodeGamepadSnapshot[];
    /**
     * Resolve a connected gamepad snapshot by browser slot index.
     * @param index The browser-assigned gamepad slot index.
     * @returns The snapshot for that slot, or `undefined` if it is absent.
     */
    _getGamepad(index: number): TextmodeGamepadSnapshot | undefined;
    /**
     * Resolve a semantic standard-layout button name from a raw button index.
     * Returns `undefined` when the mapping is not standard or the index has no semantic alias.
     *
     * @param buttonIndex The raw `buttons` array index.
     * @param mapping The browser mapping type for the active gamepad.
     */
    _getStandardButtonName(buttonIndex: number, mapping: TextmodeGamepadSnapshot['mapping']): TextmodeStandardButtonName | undefined;
    /**
     * Resolve a semantic standard-layout axis name from a raw axis index.
     * Returns `undefined` when the mapping is not standard or the index has no semantic alias.
     *
     * @param axisIndex The raw `axes` array index.
     * @param mapping The browser mapping type for the active gamepad.
     */
    _getStandardAxisName(axisIndex: number, mapping: TextmodeGamepadSnapshot['mapping']): TextmodeStandardAxisName | undefined;
    private _emitButtonEvents;
    private _emitAxisEvents;
    private _pollGamepads;
}
export {};
