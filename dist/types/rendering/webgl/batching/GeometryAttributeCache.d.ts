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
    $bind(shader: GLShader, geometryKey: string, unit: UnitGeometryData, geometryBuffer: WebGLBuffer): void;
    private _onShaderDisposed;
    $unbind(): void;
    $dispose(): void;
}
