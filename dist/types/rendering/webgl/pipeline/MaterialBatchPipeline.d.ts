import type { DrawCommand } from '../types/DrawCommand';
/**
 * Material-based rendering pipeline with strict draw order preservation.
 *
 * Responsibilities:
 * - Manages all geometry instances (one per type)
 * - Batches consecutive commands with the same material + geometry type
 * - Executes instanced draw calls
 *
 * Key principles:
 * - Batches consecutive commands with the same material + geometry type
 * - NEVER reorders commands (preserves user draw order)
 * - Single rendering path for all geometry (no special-casing custom shaders)
 *
 * Architecture:
 * 1. Scan commands in insertion order
 * 2. Group consecutive runs of same material+type into batches
 * 3. Render each batch with a single instanced draw call
 *
 * Performance:
 * - Best case: All commands use same material → 1 draw call
 * - Worst case: Alternating materials → same as unbatched
 * - Real-world: 50-70% reduction in draw calls
 * - Optimized to avoid per-frame allocations
 */
export declare class MaterialBatchPipeline {
    private _gl;
    private _geometries;
    private _geometryAttributeCache;
    private _currentShader;
    private _shaderViewportState;
    private _lastFlushedMaterial;
    constructor(gl: WebGL2RenderingContext);
    /**
     * Execute all queued draw commands in strict order.
     * Batches consecutive commands with same material+type for efficiency.
     *
     * @param commands - Draw commands in user-specified order
     */
    $execute(commands: Iterable<DrawCommand>): void;
    /**
     * Flush and render the current batch of instances.
     *
     * @param geometry - The geometry instance containing accumulated instances
     * @param material - The material to use for rendering
     * @param type - The geometry type
     * @param useOrtho - Whether to use orthographic projection
     */
    private _flushBatch;
    /**
     * Dispose of pipeline resources (including all geometries).
     */
    $dispose(): void;
}
