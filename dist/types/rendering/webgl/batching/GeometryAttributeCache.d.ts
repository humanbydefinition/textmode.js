/**
 * Minimal VAO manager that caches unit-geometry attribute setup per (program, geometry type).
 * It binds only non-instanced attributes (a_position, a_texCoord). Instanced attributes are
 * still configured by InstanceBatch per draw to keep buffers flexible.
 */
import { GLShader } from '../core/Shader';
import type { UnitGeometryData } from '../types/GeometryTypes';
export declare class GeometryAttributeCache {
    private _gl;
    private _cache;
    private _currentVAO;
    constructor(gl: WebGL2RenderingContext);
    /** Bind or create a VAO for the given program and geometry key. */
    _bind(shader: GLShader, geometryKey: string, unit: UnitGeometryData, geometryBuffer: WebGLBuffer, indexBuffer?: WebGLBuffer | null): void;
    private _onShaderDisposed;
    _unbind(): void;
    _dispose(): void;
}
