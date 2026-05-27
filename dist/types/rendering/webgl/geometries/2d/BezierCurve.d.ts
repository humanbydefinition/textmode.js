import type { InstanceBatch } from '../../batching/InstanceBatch';
import { type BezierCurveParams } from '../../types/GeometryTypes';
import { BaseGeometry } from '../BaseGeometry';
import type { IRenderState } from '../../state/RenderState';
/**
 * Instanced Bezier curve geometry backed by shader-evaluated control points.
 */
export declare class BezierCurve extends BaseGeometry<BezierCurveParams> {
    constructor(gl: WebGL2RenderingContext, batch: InstanceBatch);
    _addInstance(params: BezierCurveParams, renderState: IRenderState): number;
}
