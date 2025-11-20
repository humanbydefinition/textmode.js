/**
 * Represents a snapshot of the current rendering state
 */
export interface IRenderState {
    _lineWeight: number;
    _translationX: number;
    _translationY: number;
    _translationZ: number;
    _rotationX: number;
    _rotationY: number;
    _rotationZ: number;
    _character: [number, number, number];
    _charColor: [number, number, number, number];
    _cellColor: [number, number, number, number];
    _flipX: boolean;
    _flipY: boolean;
    _invert: boolean;
    _charRotation: number;
    _useOrtho: boolean;
}
/**
 * Manages rendering state and provides push/pop functionality for state management.
 *
 * Performance optimizations:
 * - Inlined array copies eliminate function call overhead
 * - Object pooling for push/pop operations reduces GC pressure
 * - Direct property assignment maintains V8 hidden classes
 */
export declare class RenderState {
    private _currentLineWeight;
    private _currentTranslationX;
    private _currentTranslationY;
    private _currentTranslationZ;
    private _rotationX;
    private _rotationY;
    private _rotationZ;
    private _currentCharacter;
    private _currentCharColor;
    private _currentCellColor;
    private _flipHorizontally;
    private _flipVertically;
    private _invert;
    private _charRotation;
    private _canvasBackgroundColor;
    private _useOrtho;
    private _stateStack;
    private _statePool;
    /**
     * Create a new state object with pre-allocated arrays.
     * Used by the object pool to minimize garbage collection.
     * @internal Shared with DrawQueue for command slot initialization
     */
    static $createStateObject(): IRenderState;
    /**
     * Copy current state to target object without allocations.
     *
     * Performance-critical path: This is called every push() operation.
     * Optimizations:
     * - Direct property assignment (no loops, no function calls)
     * - Inlined array element copies (avoids copyArray() overhead)
     * - Sequential memory access pattern for CPU cache efficiency
     *
     * @param target - Target state object to receive values
     * @private
     */
    private _copyCurrentToState;
    /**
     * Copy state object to current state without allocations.
     *
     * Performance-critical path: This is called every pop() operation.
     * Optimizations:
     * - Direct property assignment (no loops, no function calls)
     * - Inlined array element copies (avoids copyArray() overhead)
     * - Sequential memory access pattern for CPU cache efficiency
     *
     * @param source - Source state object to copy from
     * @private
     */
    private _copyStateToCurrents;
    /**
     * Save the current rendering state to the state stack.
     * Uses object pooling to eliminate per-frame allocations and reduce GC pressure.
     */
    $push(): void;
    /**
     * Restore the most recently saved rendering state from the state stack.
     * Returns the state object to the pool for reuse.
     */
    $pop(): void;
    /**
     * Copy current rendering state to a target object without allocations.
     * Mutates the target's properties and arrays in-place for zero-allocation performance.
     *
     * @param target - Pre-allocated state object to copy values into
     */
    $copyTo(target: IRenderState): void;
    $setLineWeight(weight: number): void;
    /**
     * Reset transformation matrix to identity and clear translation counters.
     * Should be called at the start of each frame to prevent accumulation.
     */
    $resetTransform(): void;
    /**
     * Apply a rotation around the X-axis to the current transformation matrix.
     * Follows p5.js convention where order matters.
     * @param degrees Rotation angle in degrees
     */
    $setRotationX(degrees: number): void;
    /**
     * Apply a rotation around the Y-axis to the current transformation matrix.
     * Follows p5.js convention where order matters.
     * @param degrees Rotation angle in degrees
     */
    $setRotationY(degrees: number): void;
    /**
     * Apply a rotation around the Z-axis to the current transformation matrix.
     * Follows p5.js convention where order matters.
     * @param degrees Rotation angle in degrees
     */
    $setRotationZ(degrees: number): void;
    $translate(x?: number, y?: number, z?: number): void;
    $setTranslationX(pixels: number): void;
    $setTranslationY(pixels: number): void;
    $setTranslationZ(pixels: number): void;
    $setCharacter(character: [number, number, number]): void;
    $setCharColor(r: number, g?: number, b?: number, a?: number): void;
    $setCellColor(r: number, g?: number, b?: number, a?: number): void;
    $setFlipHorizontally(flip: boolean): void;
    $setFlipVertically(flip: boolean): void;
    $setInvert(invert: boolean): void;
    $setCharRotation(rotation: number): void;
    $setCanvasBackground(r: number, g: number, b: number, a: number): void;
    $setUseOrtho(useOrtho: boolean): void;
    get canvasBackgroundColor(): [number, number, number, number];
    get useOrtho(): boolean;
    /**
     * Get the current transformation matrix.
     * Returns the underlying Float32Array for efficient GPU upload.
     */
    get rotationX(): number;
    get rotationY(): number;
    get rotationZ(): number;
}
