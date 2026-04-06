import type { GLFramebuffer } from '../../rendering';
import type { TextmodeLayer } from './TextmodeLayer';
/**
 * Parameters for the composite operation.
 */
export interface CompositeParams {
    /** The base layer placement (texture + size + offset). */
    base: CompositeLayerPlacement;
    /** The array of user layer placements to composite on top of the base. */
    layers: readonly CompositeLayerPlacement[];
    /** The target framebuffer to render the final result into. */
    targetFramebuffer: GLFramebuffer;
    /** The background color as RGBA values (0-1 range). */
    backgroundColor: [number, number, number, number];
    /** Canvas width in pixels. */
    canvasWidth: number;
    /** Canvas height in pixels. */
    canvasHeight: number;
}
/**
 * Represents the placement and sizing of a single layer within the composite operation.
 * Used to position layers relative to the base canvas during compositing.
 */
export interface CompositeLayerPlacement {
    /** The {@link TextmodeLayer} instance being composited. */
    layer: TextmodeLayer;
    /** The WebGL texture containing the layer's rendered content. */
    texture: WebGLTexture;
    /** The width of the layer's texture in pixels. */
    width: number;
    /** The height of the layer's texture in pixels. */
    height: number;
    /** The horizontal offset from the canvas origin in pixels. */
    offsetX: number;
    /** The vertical offset from the canvas origin in pixels. */
    offsetY: number;
}
