import { InstanceBuffer } from './InstanceBuffer';
import { InstanceAttributeBinder } from './InstanceAttributeBinder';
/**
 * Coordinates CPU instance storage, packed writes, and GPU attribute binding.
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
     * Synchronize GPU buffer capacity with CPU buffer capacity.
     * Must be called after writing directly to the instance buffer.
     */
    _syncGPUBuffer(): void;
    /**
     * Instance attribute binder used when creating complete geometry VAOs.
     */
    get _attributeBinder(): InstanceAttributeBinder;
    /**
     * Clear all instances from the batch.
     */
    _clear(): void;
    /**
     * Append pre-packed instances into this batch.
     * Used by internal glyph runs to bypass per-glyph DrawCommand expansion.
     */
    _writePackedInstances(data: Float32Array, instanceCount: number): void;
    /**
     * Upload live instance data to the GPU buffer.
     */
    _uploadInstanceData(): void;
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
