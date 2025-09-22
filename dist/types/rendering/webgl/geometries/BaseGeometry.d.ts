/**
 * Base class for instanced geometry implementations
 */
import type { InstanceBatch } from '../InstanceBatch';
import type { InstanceData } from '../InstanceData';
import type { IGeometry, GeometryType, UnitGeometryData } from '../types/GeometryTypes';
import type { IRenderState } from '../RenderState';
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
    /**
     * Create base instance data from render state.
     * This method handles the common instance data creation logic.
     * Subclasses can override this to add geometry-specific data.
     */
    protected _createBaseInstanceData(x: number, y: number, width: number, height: number, renderState: IRenderState): InstanceData;
    /**
     * Convert screen coordinates to NDC for compatibility with existing code
     */
    protected _toNDC(x: number, y: number): {
        nx: number;
        ny: number;
    };
    protected _setRotationCenter(instanceData: InstanceData, centerX: number, centerY: number): void;
    protected _calculateRotationParams(x: number, y: number, width: number, height: number, rotationXDegrees: number, rotationYDegrees: number, rotationZDegrees: number): {
        centerX: number;
        centerY: number;
        radiansX: number;
        radiansY: number;
        radiansZ: number;
        aspectRatio: number;
    };
}
