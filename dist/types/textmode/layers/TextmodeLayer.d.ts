import type { GLFramebuffer, GLRenderer, GLShader } from '../../rendering';
import { TextmodeGrid } from '../Grid';
import { TextmodeFont } from '../loadables/font';
import { Textmodifier } from '../Textmodifier';
import type { TextmodeLayerBlendMode, TextmodeLayerOptions, LayerDependencies } from './types';
import type { FilterName, BuiltInFilterName, BuiltInFilterParams } from '../filters';
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
    /** @ignore */
    $fontSize: number | undefined;
    /** @ignore */
    $fontSource: string | TextmodeFont | URL | undefined;
    private _deps?;
    private _grid?;
    private _font;
    private _drawFramebuffer;
    private _asciiFramebuffer;
    private _rawAsciiFramebuffer?;
    private _pingPongBuffers?;
    private _drawCallback;
    private _hasRenderableContent;
    private _filterQueue;
    /**
     * Create a new TextmodeLayer with the given options.
     * @param options Layer configuration options.
     * @ignore
     */
    constructor(renderer: GLRenderer, options?: TextmodeLayerOptions);
    /**
     * Attach necessary dependencies for this layer to function.
     * @param deps Dependencies required by the layer.
     * @ignore
     */
    $attachDependencies(deps: LayerDependencies): Promise<void>;
    /**
     * Return true when this layer has a user-provided draw callback.
     * @ignore
     */
    $hasDraw(): boolean;
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
    /** Get or set the font size for this layer's font. */
    fontSize(size?: number): number | void;
    /**
     * Load a font into this layer from a URL/path or reuse an existing {@link TextmodeFont} instance.
     * Creates a new font instance for this layer and loads the font data when a string source is provided.
     *
     * @param fontSource The URL or path to the font file.
     * @returns The loaded TextmodeFont instance.
     *
     * @example
     * ```javascript
     * const layer = t.layers.add();
     *
     * t.setup(async () => {
     *   // Load a custom font for this layer
     *   await layer.loadFont('./fonts/custom.ttf');
     * });
     * ```
     */
    loadFont(fontSource: string | TextmodeFont): Promise<TextmodeFont>;
    /**
     * Render the layer's content into its ASCII framebuffer.
     * @param textmodifier The Textmodifier instance.
     * @param conversionShader The shader used for conversion.
     * @ignore
     */
    $render(textmodifier: Textmodifier, conversionShader: GLShader, options?: {
        fallbackDraw?: () => void;
    }): void;
    /**
     * Resize the layer's framebuffers to match the given grid dimensions.
     * @param grid The TextmodeGrid instance.
     * @ignore
     */
    $resize(): void;
    /**
     * Dispose of the layer's resources.
     * @ignore
     */
    $dispose(): void;
    /**
     * Get the texture containing the rendered textmode output for this layer.
     */
    get texture(): WebGLTexture | undefined;
    /**
     * Get the grid associated with this layer.
     */
    get grid(): TextmodeGrid | undefined;
    get font(): TextmodeFont;
    get width(): number;
    get height(): number;
    /**
     * Return true when this layer has renderable content.
     * @ignore
     */
    get $hasRenderableContent(): boolean;
    /**
     * Get the framebuffer used for drawing operations on this layer.
     */
    get drawFramebuffer(): GLFramebuffer | undefined;
    /**
     * Get the framebuffer containing the rendered textmode output for this layer.
     */
    get asciiFramebuffer(): GLFramebuffer | undefined;
    private _syncGridToFont;
}
