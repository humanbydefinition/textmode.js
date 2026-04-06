import type { IRenderState } from './RenderState';
/**
 * Manages camera and projection state: perspective/ortho, eye, target, up, near/far.
 *
 * Extracted from RenderState to satisfy the Single Responsibility Principle.
 */
export declare class CameraState {
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
    /**
     * Copy camera/projection fields to a state snapshot.
     */
    _copyToSnapshot(target: IRenderState): void;
    /**
     * Restore camera/projection fields from a state snapshot.
     */
    _copyFromSnapshot(source: IRenderState): void;
    _setUseOrtho(useOrtho: boolean): void;
    _setPerspective(fovDegrees?: number, near?: number, far?: number): void;
    _setOrtho(near?: number, far?: number): void;
    _setCamera(eyeX: number, eyeY: number, eyeZ: number, targetX?: number, targetY?: number, targetZ?: number, upX?: number, upY?: number, upZ?: number): void;
    _lookAt(targetX: number, targetY: number, targetZ: number, upX?: number, upY?: number, upZ?: number): void;
    _resetCamera(): void;
    /**
     * Reset to perspective projection if currently ortho.
     * Called at end of resetTransform to restore perspective.
     */
    _resetOrthoIfNeeded(): void;
    private _setProjectionPlanes;
}
