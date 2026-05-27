import type { DrawCommand } from '../types/DrawCommand';
/**
 * Executes draw commands in order while batching consecutive commands that share
 * material, geometry type, projection, camera, and lighting state.
 */
export declare class MaterialBatchPipeline {
    private _gl;
    private _geometries;
    private _geometryAttributeCache;
    private _currentShader;
    private _shaderViewportState;
    private _lastFlushedMaterial;
    private _matrixCacheKey;
    private readonly _viewMatrix;
    private readonly _projectionMatrix;
    private readonly _autoEye;
    private readonly _cameraTarget;
    private readonly _cameraUp;
    constructor(gl: WebGL2RenderingContext);
    /**
     * Execute all queued draw commands in strict order.
     * Batches consecutive commands with same material+type for efficiency.
     *
     * @param commands - Draw commands in user-specified order
     */
    _execute(commands: Iterable<DrawCommand>): void;
    /**
     * Flush and render the current batch of instances.
     *
     * @param geometry - The geometry instance containing accumulated instances
     * @param material - The material to use for rendering
     * @param type - The geometry type
     * @param renderState - Render state snapshot for camera/projection uniforms
     */
    private _flushBatch;
    private _buildViewProjectionMatrices;
    /**
     * Dispose of pipeline resources (including all geometries).
     */
    _dispose(): void;
}
