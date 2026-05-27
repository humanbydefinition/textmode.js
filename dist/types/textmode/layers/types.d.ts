import type { TextmodeFont } from '../fonts';
/**
 * Blend modes available for {@link TextmodeLayer} compositing in 2D mode.
 *
 * - `'normal'`: Standard alpha compositing. Opaque layer pixels fully replace the base; translucent pixels fade in.
 * - `'additive'`: Layer color is added on top of the base. Great for glow/energy effects but will clip as values approach white.
 * - `'multiply'`: `result = layer * base`. Darkens wherever both layers have color; any channel multiplied by 0 becomes 0.
 * - `'screen'`: Inverse of multiply. `result = 1 - (1 - layer) * (1 - base)`. Preserves highlights while lightening midtones.
 * - `'subtract'`: `result = base - layer`. Useful for cutting out or darkening effects.
 * - `'darken'`: Takes the minimum of layer and base per channel. Only darkens; never lightens.
 * - `'lighten'`: Takes the maximum of layer and base per channel. Only lightens; never darkens.
 * - `'overlay'`: Combines multiply and screen. Darkens darks and lightens lights, increasing contrast.
 * - `'softLight'`: Softer version of overlay. Subtle contrast enhancement.
 * - `'hardLight'`: Like overlay but more intense. Uses blend color to determine multiply/screen.
 * - `'colorDodge'`: Brightens the base by the blend color. Creates intense highlights.
 * - `'colorBurn'`: Darkens the base by the blend color. Creates deep shadows.
 * - `'difference'`: `result = |base - blend|`. Creates inverted/solarized effects.
 * - `'exclusion'`: Softer version of difference. `result = base + blend - 2 * base * blend`.
 */
export declare const TEXTMODE_LAYER_BLEND_MODES: readonly ["normal", "additive", "multiply", "screen", "subtract", "darken", "lighten", "overlay", "softLight", "hardLight", "colorDodge", "colorBurn", "difference", "exclusion"];
export type TextmodeLayerBlendMode = (typeof TEXTMODE_LAYER_BLEND_MODES)[number];
/**
 * Options for layers created with {@link TextmodeLayerManager.add}.
 */
export interface TextmodeLayerOptions {
    /**
     * Whether the layer is visible. Defaults to `true`.
     */
    visible?: boolean;
    /**
     * Layer opacity from `0` (transparent) to `1` (opaque). Defaults to `1`.
     */
    opacity?: number;
    /**
     * Blend mode used when compositing this layer. Defaults to `'normal'`.
     */
    blendMode?: TextmodeLayerBlendMode;
    /**
     * Horizontal layer offset in pixels. Defaults to `0`.
     */
    offsetX?: number;
    /**
     * Vertical layer offset in pixels. Defaults to `0`.
     */
    offsetY?: number;
    /**
     * Z rotation in degrees around the layer center. Defaults to `0`.
     */
    rotationZ?: number;
    /**
     * Font size for the layer's glyph source. Defaults to `16`.
     */
    fontSize?: number;
    /**
     * Source for the font to use in this layer.
     *
     * Can be a URL/path to a font file, or an existing TextmodeFont instance.
     * Existing TextmodeFont inputs are forked per layer to keep resources independent.
     */
    fontSource?: string | TextmodeFont;
}
