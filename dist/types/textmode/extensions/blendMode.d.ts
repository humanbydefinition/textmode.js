import { LayerBlendMode } from '../layers/blendMode';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Draw the layer with standard source-over alpha compositing.
         *
         * Use this when a layer should appear exactly as drawn, with opacity
         * controlling how much of the layer covers the layers below it.
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#blend_normal | Textmodifier.BLEND_NORMAL API reference}
         * @example
         * {@includeCode ../../../examples/Textmodifier/BLEND_NORMAL/sketch.js}
         */
        readonly BLEND_NORMAL: LayerBlendMode.NORMAL;
        /**
         * Add the layer's color channels to the layers below it.
         *
         * Use this for glowing marks, light trails, sparks, and other effects
         * that should get brighter as animated layers overlap.
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#blend_additive | Textmodifier.BLEND_ADDITIVE API reference}
         * @example
         * {@includeCode ../../../examples/Textmodifier/BLEND_ADDITIVE/sketch.js}
         */
        readonly BLEND_ADDITIVE: LayerBlendMode.ADDITIVE;
        /**
         * Multiply the layer's colors with the layers below it.
         *
         * Use this to darken overlapping areas, tint a base image, or create
         * shadow-like patterns that preserve underlying contrast.
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#blend_multiply | Textmodifier.BLEND_MULTIPLY API reference}
         * @example
         * {@includeCode ../../../examples/Textmodifier/BLEND_MULTIPLY/sketch.js}
         */
        readonly BLEND_MULTIPLY: LayerBlendMode.MULTIPLY;
        /**
         * Screen the layer against the layers below it.
         *
         * Use this for soft light washes and bright overlays that lift darker
         * areas while preserving highlight detail.
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#blend_screen | Textmodifier.BLEND_SCREEN API reference}
         * @example
         * {@includeCode ../../../examples/Textmodifier/BLEND_SCREEN/sketch.js}
         */
        readonly BLEND_SCREEN: LayerBlendMode.SCREEN;
        /**
         * Subtract the layer's colors from the layers below it.
         *
         * Use this for cutout-like animation, eroded trails, and dark pulses
         * that remove brightness from the composite.
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#blend_subtract | Textmodifier.BLEND_SUBTRACT API reference}
         * @example
         * {@includeCode ../../../examples/Textmodifier/BLEND_SUBTRACT/sketch.js}
         */
        readonly BLEND_SUBTRACT: LayerBlendMode.SUBTRACT;
        /**
         * Keep the darker channel from either the layer or the layers below it.
         *
         * Use this when animated marks should only carve darker detail into the
         * existing composition.
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#blend_darken | Textmodifier.BLEND_DARKEN API reference}
         * @example
         * {@includeCode ../../../examples/Textmodifier/BLEND_DARKEN/sketch.js}
         */
        readonly BLEND_DARKEN: LayerBlendMode.DARKEN;
        /**
         * Keep the lighter channel from either the layer or the layers below it.
         *
         * Use this when animated marks should only add brighter detail to the
         * existing composition.
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#blend_lighten | Textmodifier.BLEND_LIGHTEN API reference}
         * @example
         * {@includeCode ../../../examples/Textmodifier/BLEND_LIGHTEN/sketch.js}
         */
        readonly BLEND_LIGHTEN: LayerBlendMode.LIGHTEN;
        /**
         * Combine multiply and screen based on the brightness below the layer.
         *
         * Use this for high-contrast overlays that deepen shadows and brighten
         * highlights in one pass.
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#blend_overlay | Textmodifier.BLEND_OVERLAY API reference}
         * @example
         * {@includeCode ../../../examples/Textmodifier/BLEND_OVERLAY/sketch.js}
         */
        readonly BLEND_OVERLAY: LayerBlendMode.OVERLAY;
        /**
         * Apply a softer contrast blend based on the layer's brightness.
         *
         * Use this for gentle illumination, atmospheric color movement, and
         * animated texture that should stay subtle.
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#blend_soft_light | Textmodifier.BLEND_SOFT_LIGHT API reference}
         * @example
         * {@includeCode ../../../examples/Textmodifier/BLEND_SOFT_LIGHT/sketch.js}
         */
        readonly BLEND_SOFT_LIGHT: LayerBlendMode.SOFT_LIGHT;
        /**
         * Apply an intense contrast blend driven by the layer's brightness.
         *
         * Use this for crisp lighting passes, punchy animated masks, and graphic
         * marks that should strongly reshape contrast.
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#blend_hard_light | Textmodifier.BLEND_HARD_LIGHT API reference}
         * @example
         * {@includeCode ../../../examples/Textmodifier/BLEND_HARD_LIGHT/sketch.js}
         */
        readonly BLEND_HARD_LIGHT: LayerBlendMode.HARD_LIGHT;
        /**
         * Brighten the layers below by dividing around the layer color.
         *
         * Use this for sharp flares, blooming accents, and small highlights that
         * should push quickly toward white.
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#blend_color_dodge | Textmodifier.BLEND_COLOR_DODGE API reference}
         * @example
         * {@includeCode ../../../examples/Textmodifier/BLEND_COLOR_DODGE/sketch.js}
         */
        readonly BLEND_COLOR_DODGE: LayerBlendMode.COLOR_DODGE;
        /**
         * Darken the layers below by inverting the color dodge relationship.
         *
         * Use this for dense shadow burns, high-pressure edges, and animated
         * shapes that should compress color toward black.
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#blend_color_burn | Textmodifier.BLEND_COLOR_BURN API reference}
         * @example
         * {@includeCode ../../../examples/Textmodifier/BLEND_COLOR_BURN/sketch.js}
         */
        readonly BLEND_COLOR_BURN: LayerBlendMode.COLOR_BURN;
        /**
         * Use the absolute channel difference between the layer and the layers below.
         *
         * Use this for inversion effects, interference patterns, and animated
         * overlaps that reveal contrast where colors diverge.
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#blend_difference | Textmodifier.BLEND_DIFFERENCE API reference}
         * @example
         * {@includeCode ../../../examples/Textmodifier/BLEND_DIFFERENCE/sketch.js}
         */
        readonly BLEND_DIFFERENCE: LayerBlendMode.DIFFERENCE;
        /**
         * Use a lower-contrast difference blend between the layer and the layers below.
         *
         * Use this for softer inversion, muted interference, and animated
         * overlays that should shift color without the full edge of difference.
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier#blend_exclusion | Textmodifier.BLEND_EXCLUSION API reference}
         * @example
         * {@includeCode ../../../examples/Textmodifier/BLEND_EXCLUSION/sketch.js}
         */
        readonly BLEND_EXCLUSION: LayerBlendMode.EXCLUSION;
    }
}
