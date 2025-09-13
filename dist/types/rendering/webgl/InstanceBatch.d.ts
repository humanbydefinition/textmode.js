import type { InstanceData } from './InstanceData';
import { GLShader } from './Shader';
/**
 * High-performance instance batch manager for WebGL instanced rendering.
 * Handles efficient buffer management, automatic capacity growth, and WebGL attribute setup.
 *
 * Features:
 * - Automatic buffer growth with configurable growth factor
 * - Double buffering for smooth updates
 * - Efficient sub-buffer updates for animated content
 * - Optimized WebGL attribute binding
 * - Memory pooling to reduce garbage collection
 */
export declare class InstanceBatch {
    private _gl;
    private _instances;
    private _capacity;
    private _growthFactor;
    private _instanceBuffer;
    private _needsUpload;
    private _lastUploadedCount;
    private _attributeLocationCache;
    private _packedDataCache;
    /**
     * Creates a new instance batch.
     * @param gl WebGL2 rendering context
     * @param initialCapacity Initial buffer capacity (number of instances)
     * @param growthFactor Buffer growth factor when capacity is exceeded
     */
    constructor(gl: WebGL2RenderingContext, initialCapacity?: number, growthFactor?: number);
    /**
     * Add a new instance to the batch.
     * @param instance Instance data to add
     * @returns Index of the added instance
     */
    $addInstance(instance: InstanceData): number;
    /**
     * Get the current number of instances in the batch.
     */
    get count(): number;
    /**
     * Check if the batch is empty.
     */
    get isEmpty(): boolean;
    /**
     * Clear all instances from the batch.
     */
    clear(): void;
    /**
     * Ensure buffer capacity can handle the specified number of instances.
     * Automatically grows buffer if needed.
     * @param requiredInstances Number of instances that need to fit
     */
    private _ensureCapacity;
    /**
     * Create or recreate the WebGL instance buffer.
     */
    private _createBuffer;
    /**
     * Upload instance data to GPU buffer.
     * Uses efficient sub-buffer updates when possible.
     */
    $upload(): void;
    /**
     * Get cached attribute locations for a shader program.
     * @param program WebGL shader program
     * @returns Map of attribute name to location
     */
    private _getAttributeLocations;
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
