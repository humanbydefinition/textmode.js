import type { GLShader } from '../core/Shader';
/**
 * Owns the GPU instance buffer and cached attribute locations for instanced rendering.
 */
export declare class InstanceAttributeBinder {
    private _gl;
    private _glBuffer;
    _bufferCapacity: number;
    private _attributeLocationCache;
    private _version;
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
    _recreateBuffer(newCapacity: number): void;
    /**
     * Upload instance data to GPU buffer.
     *
     * Performance-critical: This uploads data to the GPU every frame.
     * Optimizations applied:
     * - Only uploads used portion of buffer (not full capacity)
     * - Uses bufferSubData for partial updates (faster than bufferData)
     * - Avoids allocating a subarray view for the live range
     *
     * Pattern follows modern graphics engines (three.js, babylon.js):
     * - Minimize data transfer size
     * - Avoid redundant buffer bindings
     * - Use streaming pattern for per-frame data
     *
     * @param data Float32Array backing store containing instance data
     * @param floatsToUpload Number of live floats to upload
     */
    _upload(data: Float32Array, floatsToUpload: number): void;
    /**
     * Current generation of the GPU instance buffer.
     */
    get _bufferVersion(): number;
    /**
     * Get cached attribute locations for a shader program.
     * Queries locations once per program and caches them for performance.
     *
     * @param program WebGL shader program
     * @returns Map of attribute name to location
     */
    private _getAttributeLocations;
    /**
     * Configure instance attributes on the currently bound VAO.
     *
     * Assumes the target VAO is already bound. Attribute pointers capture the
     * instance buffer into that VAO, so this must only run during VAO creation
     * or recreation.
     *
     * @param shader The shader program to bind attributes for
     */
    _configureForBoundVAO(shader: GLShader): void;
    /**
     * Dispose of WebGL resources.
     */
    _dispose(): void;
}
