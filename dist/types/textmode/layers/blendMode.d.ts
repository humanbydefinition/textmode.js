/**
 * Numeric blend mode constants for layer compositing.
 *
 * These values are the source of truth for the wire protocol between
 * the TypeScript layer compositor and the `composite.frag` GLSL shader.
 * Each value must match the corresponding `const int BLEND_*` constant
 * in `composite.frag`.
 *
 * Use the `t.BLEND_*` prototype constants for ergonomic access:
 * ```ts
 * layer.blendMode(t.BLEND_ADDITIVE);
 * ```
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/layering/enumerations/LayerBlendMode | layering.LayerBlendMode API reference}
 */
export declare enum LayerBlendMode {
    /**
     * Draw the layer with standard source-over alpha compositing.
     *
     * Use this when a layer should appear exactly as drawn, with opacity
     * controlling how much of the layer covers the layers below it.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/BLEND_NORMAL/sketch.js}
     */
    NORMAL = 0,
    /**
     * Add the layer's color channels to the layers below it.
     *
     * Use this for glowing marks, light trails, sparks, and other effects
     * that should get brighter as animated layers overlap.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/BLEND_ADDITIVE/sketch.js}
     */
    ADDITIVE = 1,
    /**
     * Multiply the layer's colors with the layers below it.
     *
     * Use this to darken overlapping areas, tint a base image, or create
     * shadow-like patterns that preserve underlying contrast.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/BLEND_MULTIPLY/sketch.js}
     */
    MULTIPLY = 2,
    /**
     * Screen the layer against the layers below it.
     *
     * Use this for soft light washes and bright overlays that lift darker
     * areas while preserving highlight detail.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/BLEND_SCREEN/sketch.js}
     */
    SCREEN = 3,
    /**
     * Subtract the layer's colors from the layers below it.
     *
     * Use this for cutout-like animation, eroded trails, and dark pulses
     * that remove brightness from the composite.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/BLEND_SUBTRACT/sketch.js}
     */
    SUBTRACT = 4,
    /**
     * Keep the darker channel from either the layer or the layers below it.
     *
     * Use this when animated marks should only carve darker detail into the
     * existing composition.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/BLEND_DARKEN/sketch.js}
     */
    DARKEN = 5,
    /**
     * Keep the lighter channel from either the layer or the layers below it.
     *
     * Use this when animated marks should only add brighter detail to the
     * existing composition.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/BLEND_LIGHTEN/sketch.js}
     */
    LIGHTEN = 6,
    /**
     * Combine multiply and screen based on the brightness below the layer.
     *
     * Use this for high-contrast overlays that deepen shadows and brighten
     * highlights in one pass.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/BLEND_OVERLAY/sketch.js}
     */
    OVERLAY = 7,
    /**
     * Apply a softer contrast blend based on the layer's brightness.
     *
     * Use this for gentle illumination, atmospheric color movement, and
     * animated texture that should stay subtle.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/BLEND_SOFT_LIGHT/sketch.js}
     */
    SOFT_LIGHT = 8,
    /**
     * Apply an intense contrast blend driven by the layer's brightness.
     *
     * Use this for crisp lighting passes, punchy animated masks, and graphic
     * marks that should strongly reshape contrast.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/BLEND_HARD_LIGHT/sketch.js}
     */
    HARD_LIGHT = 9,
    /**
     * Brighten the layers below by dividing around the layer color.
     *
     * Use this for sharp flares, blooming accents, and small highlights that
     * should push quickly toward white.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/BLEND_COLOR_DODGE/sketch.js}
     */
    COLOR_DODGE = 10,
    /**
     * Darken the layers below by inverting the color dodge relationship.
     *
     * Use this for dense shadow burns, high-pressure edges, and animated
     * shapes that should compress color toward black.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/BLEND_COLOR_BURN/sketch.js}
     */
    COLOR_BURN = 11,
    /**
     * Use the absolute channel difference between the layer and the layers below.
     *
     * Use this for inversion effects, interference patterns, and animated
     * overlaps that reveal contrast where colors diverge.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/BLEND_DIFFERENCE/sketch.js}
     */
    DIFFERENCE = 12,
    /**
     * Use a lower-contrast difference blend between the layer and the layers below.
     *
     * Use this for softer inversion, muted interference, and animated
     * overlays that should shift color without the full edge of difference.
     *
     * @example
     * {@includeCode ../../../examples/Textmodifier/BLEND_EXCLUSION/sketch.js}
     */
    EXCLUSION = 13
}
/**
 * Map from legacy string name to numeric {@link LayerBlendMode}.
 * Built from the deprecated {@link TEXTMODE_LAYER_BLEND_MODES} array
 * by position (index `0` → `LayerBlendMode.NORMAL`, etc.).
 */
export declare const BLEND_MODE_NAME_TO_ID: ReadonlyMap<string, LayerBlendMode>;
/**
 * Reverse map from numeric {@link LayerBlendMode} to legacy string name.
 */
export declare const BLEND_MODE_ID_TO_NAME: ReadonlyMap<LayerBlendMode, string>;
/**
 * O(1) membership set for valid numeric blend mode values.
 * Replaces the deprecated O(n) `Array.includes` scan over string names.
 */
export declare const BLEND_MODE_NUMERIC_VALUES: ReadonlySet<number>;
/**
 * Coerce a blend mode input to the canonical numeric form.
 *
 * - `number` → validated against {@link BLEND_MODE_NUMERIC_VALUES}; `deprecated: false`.
 * - `string` → mapped via {@link BLEND_MODE_NAME_TO_ID}; `deprecated: true`.
 * - otherwise → validation failure routed through {@link errorHandler}.
 *
 * In `THROW` mode, invalid inputs throw a {@link TextmodeError}.
 * In other modes, the function returns `LayerBlendMode.NORMAL` as a fallback.
 *
 * @param mode   The blend mode input (number or legacy string).
 * @param context Optional context object passed to the error handler on failure.
 * @returns `{ value, deprecated }` where `value` is always a valid `LayerBlendMode`.
 */
export declare function coerceBlendMode(mode: unknown, context?: Record<string, unknown>): {
    value: LayerBlendMode;
    deprecated: boolean;
};
