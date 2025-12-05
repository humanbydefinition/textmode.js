import type { GLFramebuffer, GLShader } from '../../rendering';
import type { TextmodeGrid } from '../Grid';
import type { Textmodifier } from '../Textmodifier';
import type { TextmodeLayerBlendMode, TextmodeLayerOptions, LayerDependencies } from './types';
import type { FilterName, BuiltInFilterName, BuiltInFilterParams, QueuedFilter } from '../filters';
import type { ITextmodeLayer } from './interfaces/ITextmodeLayer';
/**
 * A single layer within a multi-layered textmode rendering context.
 *
 * Layers are composited together using various blend modes
 * to create complex visual effects. Each layer can be independently
 * manipulated in terms of visibility, opacity, blend mode, and position.
 *
 * You can draw on each layer by providing a draw callback function,
 * like you would with the base layer's {@link Textmodifier.draw} method.
 */
export declare class TextmodeLayer implements ITextmodeLayer {
    /** @ignore */
    $visible: boolean;
    /** @ignore */
    $opacity: number;
    /** @ignore */
    $blendMode: TextmodeLayerBlendMode;
    /** @ignore */
    $offsetX: number;
    /** @ignore */
    $offsetY: number;
    /** @ignore */
    $rotation: number;
    private _deps?;
    private _drawFramebuffer?;
    private _asciiFramebuffer?;
    private _rawAsciiFramebuffer?;
    private _drawCallback;
    private _hasRenderableContent;
    private _ownsFramebuffers;
    private _filterQueue;
    /**
     * Create a new TextmodeLayer with the given options.
     * @param options Layer configuration options.
     * @ignore
     */
    constructor(options?: TextmodeLayerOptions);
    /**
     * Return true when this layer has a user-provided draw callback.
     * @ignore
     */
    $hasDraw(): boolean;
    /**
     * Get and clear the filter queue. Used by LayerManager for base layer filter processing.
     * @returns The current filter queue, which is then cleared.
     * @ignore
     */
    $consumeFilterQueue(): QueuedFilter[];
    /**
     * Run the layer's draw callback in the calling context. This does NOT
     * manage framebuffer binding; the caller must ensure the correct
     * framebuffer is bound before invoking this.
     * @ignore
     */
    $runDraw(textmodifier: Textmodifier): void;
    draw(callback: () => void): void;
    show(): void;
    hide(): void;
    opacity(opacity?: number): number | void;
    blendMode(mode: TextmodeLayerBlendMode): TextmodeLayerBlendMode | void;
    offset(x?: number, y?: number): {
        x: number;
        y: number;
    } | void;
    rotateZ(z?: number): number | void;
    filter<T extends BuiltInFilterName>(name: T, params?: BuiltInFilterParams[T]): void;
    filter(name: FilterName, params?: unknown): void;
    /**
     * Attach necessary dependencies for this layer to function.
     * @param deps Dependencies required by the layer.
     * @ignore
     */
    $attachDependencies(deps: LayerDependencies): void;
    /**
     * Render the layer's content into its ASCII framebuffer.
     * @param textmodifier The Textmodifier instance.
     * @param conversionShader The shader used for conversion.
     * @ignore
     */
    $render(textmodifier: Textmodifier, conversionShader: GLShader): void;
    /**
     * Resize the layer's framebuffers to match the given grid dimensions.
     * @param grid The TextmodeGrid instance.
     * @ignore
     */
    $resize(grid: TextmodeGrid): void;
    /**
     * Dispose of the layer's resources.
     * @ignore
     */
    $dispose(): void;
    get texture(): WebGLTexture | undefined;
    get width(): number;
    get height(): number;
    /**
     * Return true when this layer has renderable content.
     * @ignore
     */
    get $hasRenderableContent(): boolean;
    get drawFramebuffer(): GLFramebuffer | undefined;
    private _initializeFramebuffers;
}
