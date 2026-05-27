import type { InstanceBatch } from '../../batching/InstanceBatch';
import { type EllipseParams } from '../../types/GeometryTypes';
import { BaseGeometry } from '../BaseGeometry';
import type { IRenderState } from '../../state/RenderState';
/**
 * Instanced ellipse geometry renderer.
 * Batches all ellipse draw calls for efficient GPU rendering.
 */
export declare class Ellipse extends BaseGeometry<EllipseParams> {
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch);
    _addInstance(params: EllipseParams, renderState: IRenderState): number;
}
