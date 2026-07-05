import { GeometryType } from './GeometryTypes';
import type { GeometryParams, RectangleParams, LineParams, EllipseParams, ArcParams, BezierCurveParams, Mesh3DParams, Mesh3DGeometryType } from './GeometryTypes';
import type { IRenderState } from '../state/RenderState';
import type { Material } from '../materials/Material';
export declare const GLYPH_RUN_COMMAND = "glyph_run";
export declare const CUSTOM_SHAPE_COMMAND = "custom_shape";
export interface GlyphRunParams {
    data: Float32Array;
    instanceCount: number;
}
export interface CustomShapeParams {
    vertices: Float32Array;
    vertexCount: number;
}
export type DrawParams = GeometryParams | GlyphRunParams | CustomShapeParams;
export interface BaseDrawCommand {
    id: number;
    state: IRenderState;
    material: Material;
}
export type GeometryDrawCommand = (BaseDrawCommand & {
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
    type: GeometryType.BEZIER_CURVE;
    params: BezierCurveParams;
}) | (BaseDrawCommand & {
    type: Mesh3DGeometryType;
    params: Mesh3DParams;
});
export type GlyphRunCommand = BaseDrawCommand & {
    type: typeof GLYPH_RUN_COMMAND;
    params: GlyphRunParams;
};
export type CustomShapeCommand = BaseDrawCommand & {
    type: typeof CUSTOM_SHAPE_COMMAND;
    params: CustomShapeParams;
};
export type DrawCommand = GeometryDrawCommand | GlyphRunCommand | CustomShapeCommand;
