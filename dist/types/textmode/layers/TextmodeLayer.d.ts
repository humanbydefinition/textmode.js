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
 * manipulated in terms of visibility, {@link opacity}, {@link blendMode}, {@link offset}, rotation, {@link TextmodeGrid}, and {@link TextmodeFont}.
 *
 * You can draw on each layer by providing a draw callback function,
 * like you would with the base layer's {@link Textmodifier.draw} method.
 *
 * Plugins can extend TextmodeLayer with additional methods using the plugin API's
 * `extendLayer` function. For example, the `textmode-synth` plugin adds a `.synth()`
 * method for hydra-like procedural generation.
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
    private _filterQueue;
    private _pluginState;
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
    setPluginState<T>(pluginName: string, state: T): void;
    getPluginState<T>(pluginName: string): T | undefined;
    hasPluginState(pluginName: string): boolean;
    deletePluginState(pluginName: string): boolean;
    fontSize(size?: number): void;
    loadFont(fontSource: string | TextmodeFont): Promise<TextmodeFont>;
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
    $resize(): void;
    /**
     * Dispose of the layer's resources.
     * @ignore
     */
    $dispose(): void;
    get texture(): WebGLTexture | undefined;
    get grid(): TextmodeGrid | undefined;
    get font(): TextmodeFont;
    get width(): number;
    get height(): number;
    get drawFramebuffer(): GLFramebuffer | undefined;
    get asciiFramebuffer(): GLFramebuffer | undefined;
    private _syncGridToFont;
}
