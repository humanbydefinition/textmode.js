/**
 * Manages raw Float32Array buffer with automatic capacity growth.
 *
 * Responsibilities:
 * - Memory allocation and reallocation
 * - Capacity management with configurable growth factor
 * - Write pointer tracking
 * - Buffer access for GPU upload
 *
 * This class has NO knowledge of WebGL or GPU state.
 * It's purely a CPU-side memory manager.
 */
export declare class InstanceBuffer {
    private _buffer;
    private _capacity;
    private _growthFactor;
    private _writeIndex;
    private _instanceCount;
    /**
     * Create a new instance buffer.
     * @param initialCapacity Initial capacity in number of instances
     * @param growthFactor Multiplier for capacity growth (default: 1.5)
     */
    constructor(initialCapacity?: number, growthFactor?: number);
    /**
     * Ensure buffer has capacity for the specified number of instances.
     * Automatically grows buffer if needed, preserving existing data.
     *
     * @param requiredInstances Number of instances that need to fit
     */
    $ensureCapacity(requiredInstances: number): void;
    /**
     * Get write pointer for direct buffer writing.
     * Returns the current buffer and offset for zero-allocation writes.
     *
     * @returns Object containing buffer reference and current write offset
     */
    $getWritePointer(): {
        buffer: Float32Array;
        offset: number;
    };
    /**
     * Commit a write operation, advancing the write pointer.
     * Call this after writing floats to the buffer obtained from getWritePointer().
     *
     * @param floatsWritten Number of floats written (should be FLOATS_PER_INSTANCE)
     */
    $commitWrite(floatsWritten: number): void;
    /**
     * Reset buffer to empty state.
     * Does not deallocate memory, just resets write pointer.
     */
    $reset(): void;
    /**
     * Get a subarray of the buffer containing used data.
     *
     * @param start Starting float index (default: 0)
     * @param end Ending float index (default: current write position)
     * @returns Float32Array view of the specified range
     */
    $subarray(start?: number, end?: number): Float32Array;
    /**
     * Get the number of instances currently in the buffer.
     */
    get $instanceCount(): number;
    /**
     * Get the current buffer capacity in instances.
     */
    get $capacity(): number;
    /**
     * Get the current write index in floats.
     */
    get $writeIndex(): number;
    /**
     * Check if buffer is empty.
     */
    get $isEmpty(): boolean;
}
