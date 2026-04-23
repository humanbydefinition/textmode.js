import type { RenderState } from '../../rendering/webgl/state/RenderState';
import { TextmodeCamera } from '../camera';
/**
 * Internal camera/projection state manager for TextmodeLayer.
 * Keeps layer-level camera behavior decoupled from rendering pipeline orchestration.
 */
export declare class LayerCameraController {
    private _activeCamera;
    private _cameraAuto;
    private _cameraEyeX;
    private _cameraEyeY;
    private _cameraEyeZ;
    private _cameraTargetX;
    private _cameraTargetY;
    private _cameraTargetZ;
    private _cameraUpX;
    private _cameraUpY;
    private _cameraUpZ;
    private _projectionMode;
    private _perspectiveFovDegrees?;
    private _projectionNear?;
    private _projectionFar?;
    constructor(state: RenderState);
    createCamera(viewportHeight: number, fallbackPerspectiveFovDegrees: number): TextmodeCamera;
    setCamera(camera: TextmodeCamera): void;
    resetCamera(): void;
    camera(eyeX: number, eyeY: number, eyeZ: number, targetX?: number, targetY?: number, targetZ?: number, upX?: number, upY?: number, upZ?: number): void;
    lookAt(targetX: number, targetY: number, targetZ: number, upX?: number, upY?: number, upZ?: number): void;
    perspective(fov?: number, near?: number, far?: number): void;
    ortho(near?: number, far?: number): void;
    getActiveCamera(): TextmodeCamera | null;
    applyToState(state: RenderState): void;
}
