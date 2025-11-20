/**
 * Minimal VAO manager that caches unit-geometry attribute setup per (program, geometry type).
 * It binds only non-instanced attributes (a_position, a_texCoord). Instanced attributes are
 * still configured by InstanceBatch per draw to keep buffers flexible.
 */
import type { UnitGeometryData } from '../types/GeometryTypes';
export declare class GeometryAttributeCache {
    private _gl;
    private _cache;
    constructor(gl: WebGL2RenderingContext);
    /** Bind or create a VAO for the given program and geometry key. */
    $bind(program: WebGLProgram, geometryKey: string, unit: UnitGeometryData, geometryBuffer: WebGLBuffer): void;
    $unbind(): void;
    $dispose(): void;
}
