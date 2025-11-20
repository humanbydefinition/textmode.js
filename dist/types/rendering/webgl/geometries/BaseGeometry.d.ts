import type { InstanceBatch } from '../batching/InstanceBatch';
import type { InstanceData } from '../batching/InstanceData';
import type { IGeometry, GeometryType, UnitGeometryData } from '../types/GeometryTypes';
import type { IRenderState } from '../state/RenderState';
/**
 * Abstract base class for all instanced geometries.
 * Provides common functionality for instance data creation and batch management.
 */
export declare abstract class BaseGeometry implements IGeometry {
    protected readonly _gl: WebGL2RenderingContext;
    protected readonly _batch: InstanceBatch;
    protected readonly _type: GeometryType;
    protected readonly _unitGeometry: UnitGeometryData;
    private _unitBuffer;
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch, type: GeometryType, unitGeometry: UnitGeometryData);
    get type(): GeometryType;
    get unitGeometry(): UnitGeometryData;
    get unitBuffer(): WebGLBuffer;
    get batch(): InstanceBatch;
    $clearInstances(): void;
    $hasInstances(): boolean;
    $dispose(): void;
    abstract $addInstance(params: any, renderState: any): number;
    protected _addInstance(instanceData: InstanceData, _rotationCenterX: number, _rotationCenterY: number): number;
    /**
     * Write instance data directly to batch buffer (zero-allocation helper).
     * Handles all common instance data setup to eliminate code duplication.
     *
     * @param x - X position
     * @param y - Y position
     * @param width - Width
     * @param height - Height
     * @param centerX - Rotation center X (in pixels)
     * @param centerY - Rotation center Y (in pixels)
     * @param renderState - Current render state
     * @param geometryData - Optional geometry-specific data (arc angles, bezier points, depth)
     * @returns Index of the written instance
     */
    protected _writeInstance(x: number, y: number, width: number, height: number, renderState: IRenderState, geometryData?: {
        arcStart?: number;
        arcStop?: number;
        cp1x?: number;
        cp1y?: number;
        cp2x?: number;
        cp2y?: number;
        bezStartX?: number;
        bezStartY?: number;
        bezEndX?: number;
        bezEndY?: number;
        depth?: number;
        baseZ?: number;
    }): number;
}
