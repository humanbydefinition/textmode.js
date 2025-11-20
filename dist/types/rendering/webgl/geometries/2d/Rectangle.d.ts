/**
 * Instanced rectangle geometry implementation
 */
import type { InstanceBatch } from '../../batching/InstanceBatch';
import { type RectangleParams } from '../../types/GeometryTypes';
import { BaseGeometry } from '../BaseGeometry';
import type { IRenderState } from '../../state/RenderState';
/**
 * Instanced rectangle geometry renderer.
 * Batches all rectangle draw calls for efficient GPU rendering.
 */
export declare class Rectangle extends BaseGeometry {
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch);
    /**
     * Add a rectangle instance to the batch
     * @param params Rectangle parameters
     * @param renderState Current render state
     * @returns Index of the added instance
     */
    $addInstance(params: RectangleParams, renderState: IRenderState): number;
}
