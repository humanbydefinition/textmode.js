import type { TextmodeGrid } from '../../grid/TextmodeGrid';
import type { Textmodifier } from '../../Textmodifier';
import type { TextmodeLayer } from '../TextmodeLayer';
interface InternalLayerControllerContext {
    textmodifier: Textmodifier;
    grid: TextmodeGrid;
}
/**
 * Shared controller behavior for internal overlay layers (loading/error).
 */
export declare abstract class InternalLayerController<TContext extends InternalLayerControllerContext> {
    protected readonly _textmodifier: Textmodifier;
    private _drawCallback?;
    constructor(textmodifier: Textmodifier);
    /**
     * Set a custom renderer for the internal layer.
     * @param callback Custom draw callback that receives the rendering context.
     */
    draw(callback?: (context: TContext) => void): void;
    /**
     * Initialize the internal layer.
     * @returns A promise that resolves once initialization is complete.
     *
     */
    _initialize(): Promise<void>;
    /**
     * Dispose of the internal layer.
     */
    _dispose(): void;
    protected _renderLayerFrame(defaultDrawCallback: (context: TContext) => void, context: TContext): void;
    /**
     * Render the library tag at the bottom left of internal overlays.
     */
    protected _renderBrandingTag(context: InternalLayerControllerContext): void;
    protected abstract _createLayer(): TextmodeLayer;
}
export {};
