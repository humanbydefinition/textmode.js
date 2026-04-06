import { type InstanceData } from './InstanceData';
import { GLShader } from '../core/Shader';
import { InstanceBuffer } from './InstanceBuffer';
/**
 * High-performance instance batch manager for WebGL instanced rendering.
 *
 * This is a facade that orchestrates three specialized components:
 * - InstanceBuffer: CPU-side memory management
 * - InstanceWriter: Zero-allocation instance data writing
 * - InstanceAttributeBinder: WebGL state and attribute binding
 *
 * Features:
 * - Direct Float32Array writing (zero allocations per instance)
 * - Automatic buffer growth with configurable growth factor
 * - Efficient sub-buffer updates for animated content
 * - Optimized WebGL attribute binding
 * - Struct-of-arrays layout for maximum GPU efficiency
 *
 * Architecture:
 * This class maintains the same public API as before but delegates work
 * to specialized components. This improves maintainability and testability
 * while preserving performance.
 */
export declare class InstanceBatch {
    private _gl;
    readonly _buffer: InstanceBuffer;
    private readonly _writer;
    private readonly _binder;
    /**
     * Creates a new instance batch.
     * @param gl WebGL2 rendering context
     * @param initialCapacity Initial buffer capacity (number of instances)
     * @param growthFactor Buffer growth factor when capacity is exceeded
     */
    constructor(gl: WebGL2RenderingContext, initialCapacity?: number, growthFactor?: number);
    /**
     * Add a new instance to the batch (legacy object-based path).
     * @param instance Instance data to add
     * @returns Index of the added instance
     */
    _addInstance(instance: InstanceData): number;
    /**
     * Synchronize GPU buffer capacity with CPU buffer capacity.
     * Must be called after writing directly to the instance buffer.
     */
    _syncGPUBuffer(): void;
    /**
     * Clear all instances from the batch.
     */
    _clear(): void;
    /**
     * Bind instance buffer and configure vertex attributes for instanced rendering.
     * @param shader The shader program to bind attributes for
     */
    _bindAttributes(shader: GLShader): void;
    /**
     * Execute instanced draw call for all instances in the batch.
     * @param primitiveType WebGL primitive type (e.g., gl.TRIANGLES)
     * @param vertexCount Number of vertices in the base geometry
     */
    _draw(primitiveType: number, vertexCount: number): void;
    /**
     * Execute indexed instanced draw call for all instances in the batch.
     * @param primitiveType WebGL primitive type (e.g., gl.TRIANGLES)
     * @param indexCount Number of indices to render
     * @param indexType Index data type (gl.UNSIGNED_SHORT or gl.UNSIGNED_INT)
     * @param indexOffset Byte offset into the currently bound element buffer
     */
    _drawIndexed(primitiveType: number, indexCount: number, indexType: number, indexOffset?: number): void;
    /**
     * Dispose of WebGL resources.
     * Call this when the batch is no longer needed.
     */
    _dispose(): void;
}
