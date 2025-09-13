/**
 * Instanced ellipse geometry implementation
 */
import type { InstanceBatch } from '../InstanceBatch';
import { type EllipseParams } from '../types/GeometryTypes';
import { BaseGeometry } from './BaseGeometry';
/**
 * Instanced ellipse geometry renderer.
 * Batches all ellipse draw calls for efficient GPU rendering.
 */
export declare class Ellipse extends BaseGeometry {
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch);
    /**
     * Add an ellipse instance to the batch
     * @param params Ellipse parameters (x,y as top-left corner, width/height as dimensions)
     * @param renderState Current render state
     * @returns Index of the added instance
     */
    $addInstance(params: EllipseParams, renderState: any): number;
}
