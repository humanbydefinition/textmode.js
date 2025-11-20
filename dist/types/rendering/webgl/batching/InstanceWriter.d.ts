import type { InstanceBuffer } from './InstanceBuffer';
/**
 * Data structure for direct instance writing (zero-allocation hot path).
 * All fields are primitives to avoid object creation during rendering.
 */
export interface InstanceWriteData {
    x: number;
    y: number;
    width: number;
    height: number;
    char0: number;
    char1: number;
    char2: number;
    r1: number;
    g1: number;
    b1: number;
    a1: number;
    r2: number;
    g2: number;
    b2: number;
    a2: number;
    invert: number;
    flipX: number;
    flipY: number;
    charRot: number;
    translationX: number;
    translationY: number;
    translationZ: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    curveParams0: [number, number, number, number];
    curveParams1: [number, number, number, number];
    depth: number;
    baseZ: number;
    geometryType: number;
}
/**
 * High-performance instance writer for zero-allocation rendering.
 *
 * Responsibilities:
 * - Direct Float32Array writing without intermediate allocations
 * - Instance data packing according to GPU layout
 * - Write coordination with InstanceBuffer
 *
 * This class knows about the instance data layout but has NO knowledge
 * of WebGL, GPU buffers, or attribute binding.
 */
export declare class InstanceWriter {
    private _buffer;
    /**
     * Create a new instance writer.
     * @param buffer The buffer to write instances into
     */
    constructor(buffer: InstanceBuffer);
    /**
     * Write instance data directly to the buffer (zero-allocation fast path).
     *
     * This is the hot path for rendering - optimized for minimal overhead.
     * Writes directly to Float32Array without any intermediate allocations.
     *
     * @param data Instance write data
     * @returns Index of the written instance
     */
    $writeInstance(data: InstanceWriteData): number;
    /**
     * Get the current number of instances written.
     */
    get $instanceCount(): number;
}
