import type { GLRenderer, GLFramebuffer } from '../../rendering';
import { type TextmodeLayerBlendMode } from './types';
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
 * Minimal render state needed by the compositor for each composited texture.
 */
export interface CompositeLayerState {
    /** Whether the texture should be included in the composite. */
    _visible: boolean;
    /** Texture opacity applied during compositing. */
    _opacity: number;
    /** Rotation in degrees around the texture center. */
    _rotation: number;
    /** Blend mode used when compositing over the current result. */
    _blendMode: TextmodeLayerBlendMode;
}
/**
 * Represents the placement and sizing of a single layer within the composite operation.
 * Used to position layers relative to the base canvas during compositing.
 */
export interface CompositeLayerPlacement {
    /** Render state for the texture being composited. */
    layer: CompositeLayerState;
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
 * Shader compositor for layer framebuffers.
 * Uses ping-pong buffers so blend passes never read from and write to the same texture.
 */
export declare class Layer2DCompositor {
    private readonly _renderer;
    private readonly _blendShader;
    private _pingPongBuffers;
    private _currentPingPongIndex;
    /**
     * Create a new 2D layer compositor.
     * @param renderer The WebGL renderer instance.
     * @param canvasWidth The canvas width in pixels.
     * @param canvasHeight The canvas height in pixels.
     */
    constructor(renderer: GLRenderer, canvasWidth: number, canvasHeight: number);
    /**
     * Composite all layers onto the target framebuffer.
     * @param params The composite parameters.
     */
    _composite(params: CompositeParams): void;
    /**
     * Blend a single layer onto the current composite.
     */
    private _blendLayer;
    /**
     * Copy the final composite result to the target framebuffer.
     */
    private _copyToTarget;
}
