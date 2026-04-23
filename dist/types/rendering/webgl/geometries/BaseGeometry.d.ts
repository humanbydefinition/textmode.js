import type { InstanceBatch } from '../batching/InstanceBatch';
import { type InstanceWriteData } from '../batching/InstanceWriter';
import type { IGeometry, GeometryType, UnitGeometryData, GeometryParams } from '../types/GeometryTypes';
import type { IRenderState } from '../state/RenderState';
/**
 * Abstract base class for all instanced geometries.
 * Provides common functionality for instance data creation and batch management.
 */
export declare abstract class BaseGeometry<P = GeometryParams> implements IGeometry<P> {
    protected readonly _gl: WebGL2RenderingContext;
    protected readonly _batch: InstanceBatch;
    protected readonly _type: GeometryType;
    protected readonly _unitGeometry: UnitGeometryData;
    private _unitBuffer;
    private _unitIndexBuffer;
    protected _tempCurveParams0: [number, number, number, number];
    protected _tempCurveParams1: [number, number, number, number];
    protected _tempWriteData: InstanceWriteData;
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch, type: GeometryType, unitGeometry: UnitGeometryData);
    get type(): GeometryType;
    get unitGeometry(): UnitGeometryData;
    get unitBuffer(): WebGLBuffer;
    get unitIndexBuffer(): WebGLBuffer | null;
    get batch(): InstanceBatch;
    _clearInstances(): void;
    _hasInstances(): boolean;
    _dispose(): void;
    abstract _addInstance(params: P, renderState: IRenderState): number;
    /**
     * Write instance data directly to batch buffer (zero-allocation helper).
     * Handles all common instance data setup to eliminate code duplication.
     *
     * @param x - X position
     * @param y - Y position
     * @param width - Width
     * @param height - Height
     * @param renderState - Current render state
     * @param geometryData - Optional geometry-specific data (arc angles, bezier points, depth)
     * @param geometryData.arcStart - Optional arc start angle in radians
     * @param geometryData.arcStop - Optional arc stop angle in radians
     * @param geometryData.cp1x - Optional first Bezier control point X coordinate
     * @param geometryData.cp1y - Optional first Bezier control point Y coordinate
     * @param geometryData.cp2x - Optional second Bezier control point X coordinate
     * @param geometryData.cp2y - Optional second Bezier control point Y coordinate
     * @param geometryData.bezStartX - Optional Bezier start X coordinate
     * @param geometryData.bezStartY - Optional Bezier start Y coordinate
     * @param geometryData.bezEndX - Optional Bezier end X coordinate
     * @param geometryData.bezEndY - Optional Bezier end Y coordinate
     * @param geometryData.depth - Optional geometry depth
     * @param geometryData.baseZ - Optional base Z coordinate
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
