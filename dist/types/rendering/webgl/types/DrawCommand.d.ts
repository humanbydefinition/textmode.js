import type { GeometryParams, GeometryType } from './GeometryTypes';
import type { RenderState } from '../RenderState';
import type { GLShader } from '../Shader';
export type CustomRectParams = {
    x: number;
    y: number;
    width: number;
    height: number;
    shader: GLShader;
    uniforms: Record<string, any>;
};
export type DrawParams = GeometryParams | CustomRectParams;
export interface DrawCommand {
    id: number;
    type: GeometryType;
    params: DrawParams;
    state: RenderState;
}
