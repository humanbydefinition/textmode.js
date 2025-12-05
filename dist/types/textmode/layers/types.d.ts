import type { GLFramebuffer } from '../../rendering';
import type { TextmodeGrid } from '../Grid';
import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import type { TextmodeFont } from '../loadables/font';
import type { TextmodeFilterManager } from '../filters';
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
export type TextmodeLayerBlendMode = 'normal' | 'additive' | 'multiply' | 'screen' | 'subtract' | 'darken' | 'lighten' | 'overlay' | 'softLight' | 'hardLight' | 'colorDodge' | 'colorBurn' | 'difference' | 'exclusion';
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
     * The rotation of the layer in degrees around its center. Default is `0`.
     */
    rotation?: number;
}
/**
 * Dependencies required by a TextmodeLayer to function.
 * @internal
 */
export interface LayerDependencies {
    renderer: GLRenderer;
    grid: TextmodeGrid;
    font: TextmodeFont;
    createFramebuffer: (width: number, height: number, attachments?: number) => GLFramebuffer;
    /**
     * The shared filter manager for applying post-ASCII filters.
     */
    filterManager: TextmodeFilterManager;
    /**
     * Ping-pong buffers for layer filter chain processing (grid-sized).
     * Shared across all layers within the LayerManager.
     */
    layerPingPongBuffers: [GLFramebuffer, GLFramebuffer];
    /**
     * Optional external draw framebuffer. When provided, the layer will use this
     * instead of creating its own. Used for the base layer which shares the
     * main textmode draw framebuffer.
     */
    externalDrawFramebuffer?: GLFramebuffer;
    /**
     * Optional external ASCII framebuffer. When provided, the layer will use this
     * instead of creating its own. Used for the base layer.
     */
    externalAsciiFramebuffer?: GLFramebuffer;
}
