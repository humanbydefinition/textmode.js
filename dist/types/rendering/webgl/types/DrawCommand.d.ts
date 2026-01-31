import { GeometryType } from './GeometryTypes';
import type { GeometryParams, RectangleParams, LineParams, EllipseParams, ArcParams, TriangleParams, BezierCurveParams } from './GeometryTypes';
import type { IRenderState } from '../state/RenderState';
import type { Material } from '../materials/Material';
export type DrawParams = GeometryParams;
export interface BaseDrawCommand {
    id: number;
    state: IRenderState;
    material: Material;
}
export type DrawCommand = (BaseDrawCommand & {
    type: GeometryType.RECTANGLE;
    params: RectangleParams;
}) | (BaseDrawCommand & {
    type: GeometryType.LINE;
    params: LineParams;
}) | (BaseDrawCommand & {
    type: GeometryType.ELLIPSE;
    params: EllipseParams;
}) | (BaseDrawCommand & {
    type: GeometryType.ARC;
    params: ArcParams;
}) | (BaseDrawCommand & {
    type: GeometryType.TRIANGLE;
    params: TriangleParams;
}) | (BaseDrawCommand & {
    type: GeometryType.BEZIER_CURVE;
    params: BezierCurveParams;
});
