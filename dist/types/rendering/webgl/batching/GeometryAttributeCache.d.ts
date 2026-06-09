/**
 * VAO manager that caches complete geometry + instance attribute setup per
 * (program, geometry type, instance buffer generation).
 */
import type { GLShader } from '../core/Shader';
import type { UnitGeometryData } from '../types/GeometryTypes';
import type { InstanceAttributeBinder } from './InstanceAttributeBinder';
interface GeometryAttributeBindParams {
    shader: GLShader;
    geometryKey: string;
    unit: UnitGeometryData;
    geometryBuffer: WebGLBuffer;
    instanceAttributes: InstanceAttributeBinder;
    indexBuffer?: WebGLBuffer | null;
}
export declare class GeometryAttributeCache {
    private _gl;
    private _cache;
    private _currentVAO;
    constructor(gl: WebGL2RenderingContext);
    /** Bind or create a VAO for the given program and geometry key. */
    _bind(params: GeometryAttributeBindParams): void;
    private _onShaderDisposed;
    _unbind(): void;
    _dispose(): void;
}
export {};
