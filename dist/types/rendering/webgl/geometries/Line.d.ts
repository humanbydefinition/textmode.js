/**
 * Instanced line geometry implementation
 */
import type { InstanceBatch } from '../InstanceBatch';
import { type LineParams } from '../types/GeometryTypes';
import { BaseGeometry } from './BaseGeometry';
/**
 * Instanced line geometry renderer.
 * Batches all line draw calls for efficient GPU rendering.
 */
export declare class Line extends BaseGeometry {
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch);
    /**
     * Add a line instance to the batch
     * @param params Line parameters
     * @param renderState Current render state
     * @returns Index of the added instance
     */
    $addInstance(params: LineParams, renderState: any): number;
}
