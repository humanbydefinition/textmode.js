import type { TextmodeFont } from '../loadables';
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
 * Options for configuring a new TextmodeLayer via {@link TextmodeLayerManager.add}.
 */
export interface TextmodeLayerOptions {
    /**
     * Whether the layer is visible. Default is `true`.
     */
    visible?: boolean;
    /**
     * The opacity of the layer, between 0 (fully transparent) and 1 (fully opaque). Default is `1`.
     */
    opacity?: number;
    /**
     * The blend mode used when rendering this layer. Default is `'normal'`.
     */
    blendMode?: TextmodeLayerBlendMode;
    /**
     * The horizontal offset of the layer in pixels. Default is `0`.
     */
    offsetX?: number;
    /**
     * The vertical offset of the layer in pixels. Default is `0`.
     */
    offsetY?: number;
    /**
     * The z-rotation of the layer in degrees around its center. Default is `0`.
     */
    rotationZ?: number;
    /**
     * The font size for the layer's text. Default is `16`.
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
