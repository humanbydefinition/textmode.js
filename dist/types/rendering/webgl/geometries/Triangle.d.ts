/**
 * Instanced triangle geometry implementation
 */
import type { InstanceBatch } from '../InstanceBatch';
import { type TriangleParams } from '../types/GeometryTypes';
import { BaseGeometry } from './BaseGeometry';
/**
 * Instanced triangle geometry renderer.
 * Batches all triangle draw calls for efficient GPU rendering.
 */
export declare class Triangle extends BaseGeometry {
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch);
    /**
     * Add a triangle instance to the batch
     * @param params Triangle parameters
     * @param renderState Current render state
     * @returns Index of the added instance
     */
    $addInstance(params: TriangleParams, renderState: any): number;
}
