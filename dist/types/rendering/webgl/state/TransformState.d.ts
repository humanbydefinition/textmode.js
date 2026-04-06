import type { IRenderState } from './RenderState';
/**
 * Manages transformation state: translation, rotation, scale, and model matrix.
 *
 * Owns the model matrix and provides all transformation operations.
 * Extracted from RenderState to satisfy the Single Responsibility Principle.
 */
export declare class TransformState {
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
    _tempModelOp: Float32Array;
    _tempModelCombined: Float32Array;
    /**
     * Copy transform fields to a state snapshot.
     * Inlined array copies for CPU cache efficiency.
     */
    _copyToSnapshot(target: IRenderState): void;
    /**
     * Restore transform fields from a state snapshot.
     * Inlined array copies for CPU cache efficiency.
     */
    _copyFromSnapshot(source: IRenderState): void;
    _translate(x?: number, y?: number, z?: number): void;
    _scale(x: number, y?: number, z?: number): void;
    /**
     * Apply a rotation around the X-axis to the current transformation matrix.
     * @param degrees Rotation angle in degrees
     */
    _setRotationX(degrees: number): void;
    /**
     * Apply a rotation around the Y-axis to the current transformation matrix.
     * @param degrees Rotation angle in degrees
     */
    _setRotationY(degrees: number): void;
    /**
     * Apply a rotation around the Z-axis to the current transformation matrix.
     * @param degrees Rotation angle in degrees
     */
    _setRotationZ(degrees: number): void;
    _setAxisRotation(degrees: number, x: number, y: number, z: number): void;
    _resetMatrix(): void;
    _applyMatrix(matrix: Float32Array): void;
    private _applyModelOperation;
    private _syncTransformFromModel;
    private _wrapRadians;
    private _isSupportedMatrix;
}
