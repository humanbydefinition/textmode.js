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
         */
        createCamera(): TextmodeCamera;
        /**
         * Activate a previously created camera object.
         *
         * @param camera Camera instance to activate.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/setCamera/sketch.js}
         */
        setCamera(camera: TextmodeCamera): void;
        /**
         * Reset to the default auto camera behavior.
         *
         * This clears any active explicit camera and returns view calculation to renderer-managed defaults.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/resetCamera/sketch.js}
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
         */
        ortho(near?: number, far?: number): void;
    }
}
