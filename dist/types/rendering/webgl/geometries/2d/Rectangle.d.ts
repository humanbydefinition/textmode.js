import type { InstanceBatch } from '../../batching/InstanceBatch';
import { type RectangleParams } from '../../types/GeometryTypes';
import { BaseGeometry } from '../BaseGeometry';
import type { IRenderState } from '../../state/RenderState';
/**
 * Instanced rectangle geometry renderer.
 * Batches all rectangle draw calls for efficient GPU rendering.
 */
export declare class Rectangle extends BaseGeometry<RectangleParams> {
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch);
    _addInstance(params: RectangleParams, renderState: IRenderState): number;
}
