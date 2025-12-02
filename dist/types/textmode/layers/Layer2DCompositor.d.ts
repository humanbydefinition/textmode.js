import type { GLRenderer, GLFramebuffer } from '../../rendering';
import type { TextmodeGrid } from '../Grid';
import type { TextmodeLayer } from './TextmodeLayer';
/**
 * Parameters for the composite operation.
 */
export interface CompositeParams {
    /** The base texture to composite onto. */
    baseTexture: WebGLTexture;
    /** The target framebuffer to render the final result into. */
    targetFramebuffer: GLFramebuffer;
    /** The background color as RGBA values (0-1 range). */
    backgroundColor: [number, number, number, number];
    /** The base layer configuration (visibility, opacity, offset). */
    baseLayer: TextmodeLayer;
    /** The array of user layers to composite on top of the base. */
    layers: readonly TextmodeLayer[];
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
     */
    constructor(renderer: GLRenderer);
    /**
     * Initialize the compositor's framebuffers.
     * @param grid The grid defining the render dimensions.
     * @ignore
     */
    $initialize(grid: TextmodeGrid): void;
    /**
     * Composite all layers onto the target framebuffer.
     * @param params The composite parameters.
     * @param grid The grid defining render dimensions.
     */
    $composite(params: CompositeParams, grid: TextmodeGrid): void;
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
     * @param grid The grid defining the new dimensions.
     * @ignore
     */
    $resize(grid: TextmodeGrid): void;
    /**
     * Dispose of all compositor resources.
     * @ignore
     */
    $dispose(): void;
}
