import { GLShader } from '../core/Shader';
/**
 * Manages WebGL attribute binding and GPU buffer synchronization.
 *
 * Responsibilities:
 * - WebGL buffer creation and management
 * - GPU data upload (full buffer or sub-buffer updates)
 * - Attribute location caching per shader program
 * - Vertex attribute binding/unbinding
 *
 * This class is the ONLY one that knows about WebGL state.
 * It has NO knowledge of instance data layout details (delegates to InstanceAttributeLayout).
 */
export declare class InstanceAttributeBinder {
    private _gl;
    private _glBuffer;
    private _bufferCapacity;
    private _attributeLocationCache;
    /**
     * Create a new attribute binder.
     * @param gl WebGL2 rendering context
     * @param initialCapacity Initial GPU buffer capacity in instances
     */
    constructor(gl: WebGL2RenderingContext, initialCapacity?: number);
    /**
     * Create or recreate the WebGL buffer with specified capacity.
     * @param capacity Buffer capacity in number of instances
     */
    private _createBuffer;
    /**
     * Recreate GPU buffer with new capacity.
     * Called when CPU buffer grows beyond current GPU buffer capacity.
     *
     * @param newCapacity New capacity in number of instances
     */
    $recreateBuffer(newCapacity: number): void;
    /**
     * Get the current GPU buffer capacity in instances.
     */
    get $capacity(): number;
    /**
     * Upload instance data to GPU buffer.
     *
     * Performance-critical: This uploads data to the GPU every frame.
     * Optimizations applied:
     * - Only uploads used portion of buffer (not full capacity)
     * - Uses bufferSubData for partial updates (faster than bufferData)
     * - Binds buffer once and keeps it bound for attribute setup
     *
     * Pattern follows modern graphics engines (three.js, babylon.js):
     * - Minimize data transfer size
     * - Avoid redundant buffer bindings
     * - Use streaming pattern for per-frame data
     *
     * @param data Float32Array containing instance data to upload
     * @param instanceCount Number of instances in the data
     */
    $upload(data: Float32Array, instanceCount: number): void;
    /**
     * Get cached attribute locations for a shader program.
     * Queries locations once per program and caches them for performance.
     *
     * @param program WebGL shader program
     * @returns Map of attribute name to location
     */
    private _getAttributeLocations;
    /**
     * Bind instance buffer and configure vertex attributes for instanced rendering.
     *
     * IMPORTANT: Assumes instance buffer is already bound to gl.ARRAY_BUFFER from upload().
     * If upload() was not called immediately before this, the buffer will not be bound correctly.
     * The buffer remains bound after this call for use by the draw command.
     *
     * @param shader The shader program to bind attributes for
     */
    $bindAttributes(shader: GLShader): void;
    /**
     * Unbind instance attributes to clean up WebGL state.
     *
     * @param shader The shader program to unbind attributes for
     */
    $unbindAttributes(shader: GLShader): void;
    /**
     * Dispose of WebGL resources.
     */
    $dispose(): void;
}
