import type { InstanceData } from './InstanceData';
import { GLShader } from '../core/Shader';
import { type InstanceWriteData } from './InstanceWriter';
export type { InstanceWriteData };
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
    private readonly _buffer;
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
    $addInstance(instance: InstanceData): number;
    /**
     * Write instance data directly to the buffer (zero-allocation fast path).
     * @param data Instance write data
     * @returns Index of the written instance
     */
    $writeInstance(data: InstanceWriteData): number;
    /**
     * Get the current number of instances in the batch.
     */
    get $count(): number;
    /**
     * Check if the batch is empty.
     */
    get $isEmpty(): boolean;
    /**
     * Clear all instances from the batch.
     */
    $clear(): void;
    /**
     * Bind instance buffer and configure vertex attributes for instanced rendering.
     * @param shader The shader program to bind attributes for
     */
    $bindAttributes(shader: GLShader): void;
    /**
     * Unbind instance attributes to clean up WebGL state.
     * @param shader The shader program to unbind attributes for
     */
    $unbindAttributes(shader: GLShader): void;
    /**
     * Execute instanced draw call for all instances in the batch.
     * @param primitiveType WebGL primitive type (e.g., gl.TRIANGLES)
     * @param vertexCount Number of vertices in the base geometry
     */
    $draw(primitiveType: number, vertexCount: number): void;
    /**
     * Dispose of WebGL resources.
     * Call this when the batch is no longer needed.
     */
    $dispose(): void;
}
