/**
 * Mutable camera object used for p5-style camera workflows.
 *
 * Instances can be created with {@link Textmodifier.createCamera} and activated with
 * {@link Textmodifier.setCamera}. Mutating the object does not affect rendering until
 * it is applied again with `setCamera`.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera | TextmodeCamera API reference}
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
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera/methods/setPosition | TextmodeCamera.setPosition API reference}
     */
    setPosition(x: number, y: number, z: number): this;
    /**
     * Set camera look-at target.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/lookAt/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera/methods/lookAt | TextmodeCamera.lookAt API reference}
     */
    lookAt(x: number, y: number, z: number): this;
    /**
     * Set camera up vector.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/setUp/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera/methods/setUp | TextmodeCamera.setUp API reference}
     */
    setUp(x: number, y: number, z: number): this;
    /**
     * Move eye and target together in world space.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/move/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera/methods/move | TextmodeCamera.move API reference}
     */
    move(dx: number, dy: number, dz: number): this;
    /**
     * Create a copy of this camera.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/copy/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera/methods/copy | TextmodeCamera.copy API reference}
     */
    copy(): TextmodeCamera;
    /**
     * Current X position of the camera eye.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/eyeX/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera/accessors/eyeX | TextmodeCamera.eyeX API reference}
     */
    get eyeX(): number;
    /**
     * Current Y position of the camera eye.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/eyeY/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera/accessors/eyeY | TextmodeCamera.eyeY API reference}
     */
    get eyeY(): number;
    /**
     * Current Z position of the camera eye.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/eyeZ/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera/accessors/eyeZ | TextmodeCamera.eyeZ API reference}
     */
    get eyeZ(): number;
    /**
     * Current X position of the camera target.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/targetX/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera/accessors/targetX | TextmodeCamera.targetX API reference}
     */
    get targetX(): number;
    /**
     * Current Y position of the camera target.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/targetY/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera/accessors/targetY | TextmodeCamera.targetY API reference}
     */
    get targetY(): number;
    /**
     * Current Z position of the camera target.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/targetZ/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera/accessors/targetZ | TextmodeCamera.targetZ API reference}
     */
    get targetZ(): number;
    /**
     * Current X component of the camera up vector.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/upX/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera/accessors/upX | TextmodeCamera.upX API reference}
     */
    get upX(): number;
    /**
     * Current Y component of the camera up vector.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/upY/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera/accessors/upY | TextmodeCamera.upY API reference}
     */
    get upY(): number;
    /**
     * Current Z component of the camera up vector.
     *
     * @example
     * {@includeCode ../../../examples/TextmodeCamera/upZ/sketch.js}
     *
     * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeCamera/accessors/upZ | TextmodeCamera.upZ API reference}
     */
    get upZ(): number;
}
