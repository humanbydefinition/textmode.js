import type { InstanceBatch } from '../../batching/InstanceBatch';
import { type TriangleParams } from '../../types/GeometryTypes';
import { BaseGeometry } from '../BaseGeometry';
import type { IRenderState } from '../../state/RenderState';
/**
 * Instanced triangle geometry renderer.
 * Batches all triangle draw calls for efficient GPU rendering.
 */
export declare class Triangle extends BaseGeometry<TriangleParams> {
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch);
    _addInstance(params: TriangleParams, renderState: IRenderState): number;
}
