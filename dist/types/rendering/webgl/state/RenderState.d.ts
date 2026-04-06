/**
 * Represents a snapshot of the current rendering state
 */
import type { RGB, RGBA } from '../../../utils/color';
import { TransformState } from './TransformState';
import { CameraState } from './CameraState';
import { LightingState } from './LightingState';
import { CharacterState } from './CharacterState';
export { TM_MAX_POINT_LIGHTS } from './LightingState';
export interface IRenderState {
    _lineWeight: number;
    _translationX: number;
    _translationY: number;
    _translationZ: number;
    _rotationX: number;
    _rotationY: number;
    _rotationZ: number;
    _scaleX: number;
    _scaleY: number;
    _scaleZ: number;
    _modelMatrix: Float32Array;
    _character: RGB;
    _characterString: string;
    _charColor: RGBA;
    _cellColor: RGBA;
    _flipX: boolean;
    _flipY: boolean;
    _invert: boolean;
    _charRotation: number;
    _useOrtho: boolean;
    _projectionVersion: number;
    _cameraVersion: number;
    _perspectiveFov: number;
    _projectionNear: number;
    _projectionFar: number;
    _cameraAuto: boolean;
    _cameraEyeX: number;
    _cameraEyeY: number;
    _cameraEyeZ: number;
    _cameraTargetX: number;
    _cameraTargetY: number;
    _cameraTargetZ: number;
    _cameraUpX: number;
    _cameraUpY: number;
    _cameraUpZ: number;
    _pointLightCount: number;
    _pointLightPositions: Float32Array;
    _pointLightColors: Float32Array;
    _ambientLightColor: Float32Array;
    _lightFalloff: Float32Array;
    _lightingVersion: number;
}
/**
 * Manages rendering state and provides push/pop functionality for state management.
 *
 * Delegates to focused subsystem classes for each state domain:
 * - {@link TransformState} - translation, rotation, scale, model matrix
 * - {@link CameraState} - perspective/ortho, eye, target, up, near/far
 * - {@link LightingState} - point lights, falloff, version tracking
 * - {@link CharacterState} - character, colors, flip, invert, line weight
 *
 * Performance optimizations:
 * - Object pooling for push/pop operations reduces GC pressure
 * - Subsystems use inlined array copies for CPU cache efficiency
 * - Direct property assignment maintains V8 hidden classes
 */
export declare class RenderState {
    readonly _transform: TransformState;
    readonly _camera: CameraState;
    readonly _lighting: LightingState;
    readonly _character: CharacterState;
    private _stateStack;
    private _statePool;
    /**
     * Copy current rendering state to a target object without allocations.
     * Mutates the target's properties and arrays in-place for zero-allocation performance.
     *
     * @param target - Pre-allocated state object to copy values into
     */
    _copyTo(target: IRenderState): void;
    /**
     * Restore current state from a snapshot.
     * Delegates to each subsystem so copy logic lives alongside the fields it operates on.
     */
    private _copyStateToCurrents;
    /**
     * Save the current rendering state to the state stack.
     * Uses object pooling to eliminate per-frame allocations and reduce GC pressure.
     */
    _push(): void;
    /**
     * Restore the most recently saved rendering state from the state stack.
     * Returns the state object to the pool for reuse.
     */
    _pop(): void;
    /**
     * Reset transformation matrix to identity and clear translation counters.
     * Should be called at the start of each frame to prevent accumulation.
     */
    _resetTransform(): void;
}
