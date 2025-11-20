import type { GeometryParams, GeometryType } from './GeometryTypes';
import type { IRenderState } from '../state/RenderState';
import type { GLShader } from '../core/Shader';
import type { Material } from '../materials/Material';
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
    state: IRenderState;
    material: Material;
}
