import { TextmodeColor } from '../color';
interface PointLightPosition {
    x: number;
    y: number;
    z: number;
}
type LightColorInput = string | TextmodeColor | [number, number, number] | [number, number, number, number];
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
         */
        ambientLight(gray: number): void;
        /**
         * Add an ambient light using a grayscale value and alpha.
         *
         * @param gray Grayscale value (0-255)
         * @param alpha Alpha value (0-255)
         */
        ambientLight(gray: number, alpha: number): void;
        /**
         * Add an ambient light using RGB components.
         *
         * @param v1 Red component (0-255)
         * @param v2 Green component (0-255)
         * @param v3 Blue component (0-255)
         */
        ambientLight(v1: number, v2: number, v3: number): void;
        /**
         * Add an ambient light using RGB components and alpha.
         *
         * @param v1 Red component (0-255)
         * @param v2 Green component (0-255)
         * @param v3 Blue component (0-255)
         * @param alpha Alpha value (0-255)
         */
        ambientLight(v1: number, v2: number, v3: number, alpha: number): void;
        /**
         * Add an ambient light using a color value.
         *
         * @param color Color value (CSS string, TextmodeColor, or RGB(A) array)
         */
        ambientLight(color: LightColorInput): void;
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
         */
        pointLight(v1: number, v2: number, v3: number, x: number, y: number, z: number): void;
        /**
         * Add a point light using RGB components and an object position.
         *
         * @param v1 Red component (0-255)
         * @param v2 Green component (0-255)
         * @param v3 Blue component (0-255)
         * @param position World-space position
         */
        pointLight(v1: number, v2: number, v3: number, position: PointLightPosition): void;
        /**
         * Add a point light using a color value and explicit XYZ position.
         *
         * Lighting uses RGB only, so any provided alpha value is ignored.
         *
         * @param color Color value (CSS string, TextmodeColor, or RGB(A) array)
         * @param x World-space X position
         * @param y World-space Y position
         * @param z World-space Z position
         */
        pointLight(color: LightColorInput, x: number, y: number, z: number): void;
        /**
         * Add a point light using a color value and an object position.
         *
         * @param color Color value (CSS string, TextmodeColor, or RGB(A) array)
         * @param position World-space position
         */
        pointLight(color: LightColorInput, position: PointLightPosition): void;
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
         */
        lightFalloff(constant: number, linear: number, quadratic: number): void;
        /**
         * Remove all active lights (ambient and point) and reset light falloff to `(1, 0, 0)`.
         *
         * Useful when you want later draw calls in the same frame to render unlit.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/noLights/sketch.js}
         */
        noLights(): void;
    }
}
export {};
