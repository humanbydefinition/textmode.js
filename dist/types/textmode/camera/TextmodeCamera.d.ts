/**
 * Mutable camera object used for p5-style camera workflows.
 *
 * Instances can be created with {@link Textmodifier.createCamera} and activated with
 * {@link Textmodifier.setCamera}. Mutating the object does not affect rendering until
 * it is applied again with `setCamera`.
 */
export declare class TextmodeCamera {
    private _eyeX;
    private _eyeY;
    private _eyeZ;
    private _targetX;
    private _targetY;
    private _targetZ;
    private _upX;
    private _upY;
    private _upZ;
    /**
     * Set camera eye position.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/setPosition/sketch.js}
     */
    setPosition(x: number, y: number, z: number): this;
    /**
     * Set camera look-at target.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/lookAt/sketch.js}
     */
    lookAt(x: number, y: number, z: number): this;
    /**
     * Set camera up vector.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/setUp/sketch.js}
     */
    setUp(x: number, y: number, z: number): this;
    /**
     * Move eye and target together in world space.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/move/sketch.js}
     */
    move(dx: number, dy: number, dz: number): this;
    /**
     * Create a copy of this camera.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/copy/sketch.js}
     */
    copy(): TextmodeCamera;
    /**
     * Current X position of the camera eye.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/eyeX/sketch.js}
     */
    get eyeX(): number;
    /**
     * Current Y position of the camera eye.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/eyeY/sketch.js}
     */
    get eyeY(): number;
    /**
     * Current Z position of the camera eye.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/eyeZ/sketch.js}
     */
    get eyeZ(): number;
    /**
     * Current X position of the camera target.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/targetX/sketch.js}
     */
    get targetX(): number;
    /**
     * Current Y position of the camera target.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/targetY/sketch.js}
     */
    get targetY(): number;
    /**
     * Current Z position of the camera target.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/targetZ/sketch.js}
     */
    get targetZ(): number;
    /**
     * Current X component of the camera up vector.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/upX/sketch.js}
     */
    get upX(): number;
    /**
     * Current Y component of the camera up vector.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/upY/sketch.js}
     */
    get upY(): number;
    /**
     * Current Z component of the camera up vector.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/upZ/sketch.js}
     */
    get upZ(): number;
}
