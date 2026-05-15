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
     * Overridable method to set a custom draw callback for rendering the internal layer.
     * If not set, the layer will use the default template.
     * @param callback Custom draw callback that receives the rendering context.
     */
    draw(callback?: (context: TContext) => void): void;
    /**
     * Initializes the internal layer and its resources.
     * @returns A promise that resolves once initialization is complete.
     *
     */
    _initialize(): Promise<void>;
    /**
     * Disposes of the internal layer and its resources.
     */
    _dispose(): void;
    protected _renderLayerFrame(defaultDrawCallback: (context: TContext) => void, context: TContext): void;
    /**
     * Renders the library branding tag at the bottom left of the internal overlay.
     * Uses obfuscation techniques to make removal more difficult.
     */
    protected _renderBrandingTag(context: InternalLayerControllerContext): void;
    protected abstract _createLayer(): TextmodeLayer;
}
export {};
