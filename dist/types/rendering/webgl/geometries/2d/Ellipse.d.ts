/**
 * Instanced ellipse geometry implementation
 */
import type { InstanceBatch } from '../../batching/InstanceBatch';
import { type EllipseParams } from '../../types/GeometryTypes';
import { BaseGeometry } from '../BaseGeometry';
import type { IRenderState } from '../../state/RenderState';
/**
 * Instanced ellipse geometry renderer.
 * Batches all ellipse draw calls for efficient GPU rendering.
 */
export declare class Ellipse extends BaseGeometry {
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch);
    /**
     * Add an ellipse instance to the batch
     * @param params Ellipse parameters
     * @param renderState Current render state
     * @returns Index of the added instance
     */
    $addInstance(params: EllipseParams, renderState: IRenderState): number;
}
