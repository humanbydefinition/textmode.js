import { TextmodeColor } from '../color';
/**
 * Color input accepted by lighting APIs.
 *
 * @inline
 */
export type TextmodeLightColorInput = string | TextmodeColor | [number, number, number] | [number, number, number, number];
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Add an ambient light using a grayscale value.
         *
         * Ambient light shines evenly from all directions.
         * Multiple calls are additive, so colors accumulate.
         * Ambient lights are frame-scoped and reset each layer draw callback.
         * Lighting uses RGB only, so any provided alpha value is ignored.
         *
         * @param gray Grayscale value (0-255)
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/ambientLight/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/ambientLight | Textmodifier.ambientLight API reference}
         */
        ambientLight(gray: number): void;
        /**
         * Add an ambient light using a grayscale value and alpha.
         *
         * @param gray Grayscale value (0-255)
         * @param alpha Alpha value (0-255)
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/ambientLight | Textmodifier.ambientLight API reference}
         */
        ambientLight(gray: number, alpha: number): void;
        /**
         * Add an ambient light using RGB components.
         *
         * @param v1 Red component (0-255)
         * @param v2 Green component (0-255)
         * @param v3 Blue component (0-255)
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/ambientLight | Textmodifier.ambientLight API reference}
         */
        ambientLight(v1: number, v2: number, v3: number): void;
        /**
         * Add an ambient light using RGB components and alpha.
         *
         * @param v1 Red component (0-255)
         * @param v2 Green component (0-255)
         * @param v3 Blue component (0-255)
         * @param alpha Alpha value (0-255)
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/ambientLight | Textmodifier.ambientLight API reference}
         */
        ambientLight(v1: number, v2: number, v3: number, alpha: number): void;
        /**
         * Add an ambient light using a color value.
         *
         * @param color Color value (CSS string, TextmodeColor, or RGB(A) array)
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/ambientLight | Textmodifier.ambientLight API reference}
         */
        ambientLight(color: TextmodeLightColorInput): void;
        /**
         * Add a point light using RGB components and explicit XYZ position.
         *
         * Point lights are frame-scoped and reset each layer draw callback.
         * Up to five point lights are supported per frame. Additional calls are ignored.
         *
         * @param v1 Red component (0-255)
         * @param v2 Green component (0-255)
         * @param v3 Blue component (0-255)
         * @param x World-space X position
         * @param y World-space Y position
         * @param z World-space Z position
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/pointLight/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/pointLight | Textmodifier.pointLight API reference}
         */
        pointLight(v1: number, v2: number, v3: number, x: number, y: number, z: number): void;
        /**
         * Add a point light using RGB components and an object position.
         *
         * @param v1 Red component (0-255)
         * @param v2 Green component (0-255)
         * @param v3 Blue component (0-255)
         * @param position World-space position
         * @param position.x World-space X position
         * @param position.y World-space Y position
         * @param position.z World-space Z position
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/pointLight | Textmodifier.pointLight API reference}
         */
        pointLight(v1: number, v2: number, v3: number, position: {
            x: number;
            y: number;
            z: number;
        }): void;
        /**
         * Add a point light using a color value and explicit XYZ position.
         *
         * Lighting uses RGB only, so any provided alpha value is ignored.
         *
         * @param color Color value (CSS string, TextmodeColor, or RGB(A) array)
         * @param x World-space X position
         * @param y World-space Y position
         * @param z World-space Z position
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/pointLight | Textmodifier.pointLight API reference}
         */
        pointLight(color: TextmodeLightColorInput, x: number, y: number, z: number): void;
        /**
         * Add a point light using a color value and an object position.
         *
         * @param color Color value (CSS string, TextmodeColor, or RGB(A) array)
         * @param position World-space position
         * @param position.x World-space X position
         * @param position.y World-space Y position
         * @param position.z World-space Z position
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/pointLight | Textmodifier.pointLight API reference}
         */
        pointLight(color: TextmodeLightColorInput, position: {
            x: number;
            y: number;
            z: number;
        }): void;
        /**
         * Configure distance attenuation used by point lights.
         *
         * Uses the p5-style formula: `1 / (constant + d * linear + d * d * quadratic)`.
         * Negative inputs are clamped to `0`. If all inputs resolve to `0`, the falloff resets to `(1, 0, 0)`.
         *
         * @param constant Constant attenuation term
         * @param linear Linear attenuation term
         * @param quadratic Quadratic attenuation term
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/lightFalloff/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/lightFalloff | Textmodifier.lightFalloff API reference}
         */
        lightFalloff(constant: number, linear: number, quadratic: number): void;
        /**
         * Remove all active lights (ambient and point) and reset light falloff to `(1, 0, 0)`.
         *
         * Useful when you want later draw calls in the same frame to render unlit.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/noLights/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/noLights | Textmodifier.noLights API reference}
         */
        noLights(): void;
    }
}
