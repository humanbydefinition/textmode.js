/**
 * Represents a snapshot of the current rendering state
 */
export interface IRenderState {
    _lineWeight: number;
    _rotationX: number;
    _rotationY: number;
    _rotationZ: number;
    _character: [number, number, number];
    _charColor: [number, number, number, number];
    _cellColor: [number, number, number, number];
    _flipX: boolean;
    _flipY: boolean;
    _invert: boolean;
    _charRotation: [number, number];
}
/**
 * Manages rendering state and provides push/pop functionality for state management
 */
export declare class RenderState {
    private _currentLineWeight;
    private _currentRotationX;
    private _currentRotationY;
    private _currentRotationZ;
    private _currentCharacter;
    private _currentCharColor;
    private _currentCellColor;
    private _flipHorizontally;
    private _flipVertically;
    private _invert;
    private _charRotation;
    private _canvasBackgroundColor;
    private _stateStack;
    /**
     * Save the current rendering state to the state stack
     */
    $push(): void;
    /**
     * Restore the most recently saved rendering state from the state stack
     */
    $pop(): void;
    /**
     * Write current state into an existing target object/struct to avoid allocations.
     * The target is expected to have the same shape as RenderStateSnapshot, with mutable arrays.
     */
    $writeSnapshotTo(target: {
        _lineWeight: number;
        _rotationX: number;
        _rotationY: number;
        _rotationZ: number;
        _character: number[];
        _charColor: number[];
        _cellColor: number[];
        _flipX: boolean;
        _flipY: boolean;
        _invert: boolean;
        _charRotation: number[];
    }): void;
    get lineWeight(): number;
    get canvasBackgroundColor(): [number, number, number, number];
    $setLineWeight(weight: number): void;
    $setRotationX(degrees: number): void;
    $setRotationY(degrees: number): void;
    $setRotationZ(degrees: number): void;
    $setCharacter(character: [number, number, number]): void;
    $setCharColor(r: number, g?: number, b?: number, a?: number): void;
    $setCellColor(r: number, g?: number, b?: number, a?: number): void;
    $setFlipHorizontally(flip: boolean): void;
    $setFlipVertically(flip: boolean): void;
    $setInvert(invert: boolean): void;
    $setCharRotation(rotation: number): void;
    $setCanvasBackground(r: number, g: number, b: number, a: number): void;
}
