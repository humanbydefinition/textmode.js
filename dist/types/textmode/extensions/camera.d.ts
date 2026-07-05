import { TextmodeCamera } from '../camera';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Enable perspective projection and optionally set projection parameters.
         *
         * The default perspective is tuned to match textmode.js legacy depth behavior.
         *
         * @param fov Vertical field-of-view in degrees.
         * @param near Near clipping plane distance; must be greater than 0.
         * @param far Far clipping plane distance; must be greater than `near`.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/perspective/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/perspective | Textmodifier.perspective API reference}
         */
        perspective(fov?: number, near?: number, far?: number): void;
        /**
         * Create and activate a camera initialized from the current render camera state.
         *
         * Useful for workflows where camera properties are mutated over time and
         * reapplied via {@link setCamera}.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/createCamera/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/createCamera | Textmodifier.createCamera API reference}
         */
        createCamera(): TextmodeCamera;
        /**
         * Activate a previously created camera object.
         *
         * @param camera Camera instance to activate.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/setCamera/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/setCamera | Textmodifier.setCamera API reference}
         */
        setCamera(camera: TextmodeCamera): void;
        /**
         * Reset to the default auto camera behavior.
         *
         * This clears any active explicit camera and returns view calculation to renderer-managed defaults.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/resetCamera/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/resetCamera | Textmodifier.resetCamera API reference}
         */
        resetCamera(): void;
        /**
         * Set an explicit camera transform for subsequent draw calls.
         *
         * @param eyeX Camera eye X position.
         * @param eyeY Camera eye Y position.
         * @param eyeZ Camera eye Z position.
         * @param targetX Look-at target X position.
         * @param targetY Look-at target Y position.
         * @param targetZ Look-at target Z position.
         * @param upX Camera up vector X component.
         * @param upY Camera up vector Y component.
         * @param upZ Camera up vector Z component.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/camera/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/camera | Textmodifier.camera API reference}
         */
        camera(eyeX: number, eyeY: number, eyeZ: number, targetX?: number, targetY?: number, targetZ?: number, upX?: number, upY?: number, upZ?: number): void;
        /**
         * Update the look-at target and optional up vector for the active camera.
         *
         * @param targetX Look-at target X position.
         * @param targetY Look-at target Y position.
         * @param targetZ Look-at target Z position.
         * @param upX Optional up vector X component.
         * @param upY Optional up vector Y component.
         * @param upZ Optional up vector Z component.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/lookAt/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/lookAt | Textmodifier.lookAt API reference}
         */
        lookAt(targetX: number, targetY: number, targetZ: number, upX?: number, upY?: number, upZ?: number): void;
        /**
         * Enable orthographic projection for subsequent shape drawing.
         *
         * By default, textmode uses a perspective projection. Calling this method switches to an
         * orthographic projection, where objects maintain their size regardless of depth (Z position).
         *
         * The projection mode is reset to perspective at the beginning of each frame.
         *
         * @param near Near clipping plane distance.
         * @param far Far clipping plane distance.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/ortho/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/ortho | Textmodifier.ortho API reference}
         */
        ortho(near?: number, far?: number): void;
    }
}
