import type { TextmodeFont } from '../fonts';
import type { LayerBlendMode } from './blendMode';
/**
 * Use the {@link LayerBlendMode} enum and the `t.BLEND_*` constants
 * (e.g. `t.BLEND_ADDITIVE`). String blend modes are accepted for backwards
 * compatibility and emit a deprecation warning; they will be removed in a
 * future version.
 *
 * @deprecated
 *
 * @see {@link LayerBlendMode}
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/layering/variables/TEXTMODE_LAYER_BLEND_MODES | layering.TEXTMODE_LAYER_BLEND_MODES API reference}
 */
export declare const TEXTMODE_LAYER_BLEND_MODES: readonly ["normal", "additive", "multiply", "screen", "subtract", "darken", "lighten", "overlay", "softLight", "hardLight", "colorDodge", "colorBurn", "difference", "exclusion"];
/**
 * @deprecated Use {@link LayerBlendMode} instead.
 * String blend modes are accepted for backwards compatibility and emit
 * a deprecation warning; they will be removed in a future version.
 *
 * @see {@link LayerBlendMode}
 */
export type TextmodeLayerBlendMode = (typeof TEXTMODE_LAYER_BLEND_MODES)[number];
/**
 * Options for layers created with {@link TextmodeLayerManager.add}.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/layering/interfaces/TextmodeLayerOptions | layering.TextmodeLayerOptions API reference}
 */
export interface TextmodeLayerOptions {
    /**
     * Whether the layer is visible. Defaults to `true`.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/layering/interfaces/TextmodeLayerOptions#visible | layering.TextmodeLayerOptions.visible API reference}
     */
    visible?: boolean;
    /**
     * Layer opacity from `0` (transparent) to `1` (opaque). Defaults to `1`.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/layering/interfaces/TextmodeLayerOptions#opacity | layering.TextmodeLayerOptions.opacity API reference}
     */
    opacity?: number;
    /**
     * Blend mode used when compositing this layer. Defaults to `LayerBlendMode.NORMAL`.
     *
     * Pass a {@link LayerBlendMode} constant (e.g. `t.BLEND_ADDITIVE`) or a
     * legacy string (e.g. `'additive'` — deprecated, emits a warning).
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/layering/interfaces/TextmodeLayerOptions#blendmode | layering.TextmodeLayerOptions.blendMode API reference}
     */
    blendMode?: LayerBlendMode | TextmodeLayerBlendMode;
    /**
     * Horizontal layer offset in pixels. Defaults to `0`.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/layering/interfaces/TextmodeLayerOptions#offsetx | layering.TextmodeLayerOptions.offsetX API reference}
     */
    offsetX?: number;
    /**
     * Vertical layer offset in pixels. Defaults to `0`.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/layering/interfaces/TextmodeLayerOptions#offsety | layering.TextmodeLayerOptions.offsetY API reference}
     */
    offsetY?: number;
    /**
     * Z rotation in degrees around the layer center. Defaults to `0`.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/layering/interfaces/TextmodeLayerOptions#rotationz | layering.TextmodeLayerOptions.rotationZ API reference}
     */
    rotationZ?: number;
    /**
     * Font size for the layer's glyph source. Defaults to `16`.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/layering/interfaces/TextmodeLayerOptions#fontsize | layering.TextmodeLayerOptions.fontSize API reference}
     */
    fontSize?: number;
    /**
     * Source for the font to use in this layer.
     *
     * Can be a URL/path to a font file, or an existing TextmodeFont instance.
     * Existing TextmodeFont inputs are forked per layer to keep resources independent.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/layering/interfaces/TextmodeLayerOptions#fontsource | layering.TextmodeLayerOptions.fontSource API reference}
     */
    fontSource?: string | TextmodeFont;
}
