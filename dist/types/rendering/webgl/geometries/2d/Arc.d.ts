/**
 * Instanced arc (pie segment) geometry implementation
 */
import type { InstanceBatch } from '../../batching/InstanceBatch';
import { type ArcParams } from '../../types/GeometryTypes';
import { BaseGeometry } from '../BaseGeometry';
import type { IRenderState } from '../../state/RenderState';
/**
 * Instanced arc geometry renderer.
 * Batches arc draw calls using a unit triangle fan scaled to width/height.
 * Angles are specified in DEGREES by the API, converted to radians here.
 */
export declare class Arc extends BaseGeometry {
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch);
    /** Add an arc instance (filled pie segment) */
    $addInstance(params: ArcParams, renderState: IRenderState): number;
}
