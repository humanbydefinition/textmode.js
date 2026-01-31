import type { GLRenderer, GLFramebuffer } from '../../rendering';
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
/**
 * Handles the compositing of multiple layers using shader-based blending.
 *
 * This class is responsible for:
 * - Managing ping-pong framebuffers for layer compositing
 * - Applying blend modes via the composite shader
 * - Rendering the final composited result to a target framebuffer
 *
 * @ignore
 *
 * @remarks
 * The compositor uses a ping-pong buffer technique to avoid WebGL feedback loops
 * when reading from and writing to textures during blend operations.
 */
export declare class Layer2DCompositor {
    private readonly _renderer;
    private readonly _blendShader;
    private _pingPongBuffers;
    private _currentPingPongIndex;
    /**
     * Create a new LayerCompositor.
     * @param renderer The WebGL renderer instance.
     * @param canvasWidth The canvas width in pixels.
     * @param canvasHeight The canvas height in pixels.
     */
    constructor(renderer: GLRenderer, canvasWidth: number, canvasHeight: number);
    /**
     * Composite all layers onto the target framebuffer.
     * @param params The composite parameters.
     */
    $composite(params: CompositeParams): void;
    /**
     * Blend a single layer onto the current composite.
     */
    private _blendLayer;
    /**
     * Copy the final composite result to the target framebuffer.
     */
    private _copyToTarget;
    /**
     * Resize the compositor's framebuffers.
     * @param canvasWidth The canvas width in pixels.
     * @param canvasHeight The canvas height in pixels.
     * @ignore
     */
    $resize(canvasWidth: number, canvasHeight: number): void;
    /**
     * Dispose of all compositor resources.
     * @ignore
     */
    $dispose(): void;
}
