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
 */
export declare class MaterialBatchPipeline {
    private _gl;
    private _geometries;
    private _geometryAttributeCache;
    constructor(gl: WebGL2RenderingContext);
    /**
     * Execute all queued draw commands in strict order.
     * Batches consecutive commands with same material+type for efficiency.
     *
     * @param commands - Draw commands in user-specified order
     */
    $execute(commands: Iterable<DrawCommand>): void;
    /**
     * Group consecutive commands with the same material + geometry type.
     * Preserves draw order by never reordering commands.
     *
     * Algorithm:
     * 1. Start with first command as current batch
     * 2. For each subsequent command:
     *    - If material OR type differs: flush current batch, start new one
     *    - Otherwise: add to current batch
     * 3. Flush final batch
     *
     * @param commands - Input draw commands in order
     * @returns Array of batches to render sequentially
     */
    private _batchConsecutive;
    /**
     * Render a single batch of commands with the same material and geometry type.
     * Uses instanced rendering for maximum efficiency.
     *
     * @param batch - Batch to render
     */
    private _renderBatch;
    /**
     * Dispose of pipeline resources (including all geometries).
     */
    $dispose(): void;
}
