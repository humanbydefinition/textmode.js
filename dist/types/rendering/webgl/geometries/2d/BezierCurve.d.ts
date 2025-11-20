/**
 * Instanced bezier curve geometry implementation
 */
import type { InstanceBatch } from '../../batching/InstanceBatch';
import { type BezierCurveParams } from '../../types/GeometryTypes';
import { BaseGeometry } from '../BaseGeometry';
import type { IRenderState } from '../../state/RenderState';
/**
 * TRUE INSTANCED bezier curve geometry renderer.
 *
 * APPROACH: Use a fixed multi-segment unit geometry shared by all curves.
 * Each instance provides Bezier control points via instance attributes, and the
 * vertex shader evaluates the curve mathematically to transform each segment.
 *
 * This maintains true instanced rendering: one draw call for all curves.
 */
export declare class BezierCurve extends BaseGeometry {
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch);
    /**
     * Add a bezier curve instance to the batch - TRUE INSTANCED APPROACH
     */
    $addInstance(params: BezierCurveParams, renderState: IRenderState): number;
}
