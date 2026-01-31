import type { GLFramebuffer } from '../../rendering';
import type { Textmodifier } from '../Textmodifier';
import { TextmodeLayer } from './TextmodeLayer';
import type { TextmodeLayerOptions } from './types';
import type { ILayerManager } from './interfaces/ILayerManager';
import type { TextmodeOptions } from '../types';
import type { TextmodeGrid } from '../Grid';
import { type FilterName, type BuiltInFilterName, type BuiltInFilterParams, TextmodeFilterManager } from '../filters';
/**
 * Manages the stack of layers within a {@link Textmodifier} instance.
 *
 * This interface provides methods to create, manage, and organize multiple textmode layers.
 * Layers allow for complex compositing, independent rendering passes, and post-processing effects.
 *
 * The `base` layer is always present at the bottom of the stack. User-created layers are added
 * on top of the base layer.
 *
 * Access this manager via `textmodifier.layers`.
 */
export declare class LayerManager implements ILayerManager {
    private readonly _textmodifier;
    private readonly _renderer;
    private readonly _compositor2D;
    private readonly _filterManager;
    private readonly _layers;
    private readonly _baseLayer;
    private _isReady;
    private readonly _gridDimensionChangeCallbacks;
    private _globalFilterQueue;
    private _preFilterFramebuffer;
    private _postFilterFramebuffer;
    /**
     * Create a new LayerManager.
     * @param textmodifier The Textmodifier instance this manager belongs to.
     * @ignore
     */
    constructor(textmodifier: Textmodifier, opts: TextmodeOptions);
    /**
     * Initialize all pending layers, compositor, and global post-processing resources.
     * @ignore
     */
    $initialize(): Promise<void>;
    /**
     * Queue a global filter to be applied after all layers are composited.
     * Intended to be called by Textmodifier.filter().
     * @ignore
     */
    $queueGlobalFilter<T extends BuiltInFilterName>(name: T, params?: BuiltInFilterParams[T]): void;
    $queueGlobalFilter<TParams = unknown>(name: FilterName, params?: TParams): void;
    /**
     * Clear any queued global filters for the current frame.
     * @ignore
     */
    $clearGlobalFilterQueue(): void;
    add(options?: TextmodeLayerOptions): TextmodeLayer;
    remove(layer: TextmodeLayer): void;
    move(layer: TextmodeLayer, newIndex: number): void;
    swap(layerA: TextmodeLayer, layerB: TextmodeLayer): void;
    clear(): void;
    /**
     * Render all layers (base and user) and composite them to the provided target framebuffer.
     * This performs ONLY layer rendering + compositing (no global filters, no present).
     *
     * @param targetFramebuffer The framebuffer to render the final composited result to.
     * @ignore
     */
    $renderAndComposite(targetFramebuffer: GLFramebuffer): void;
    /**
     * Render, composite, apply global filters, present to screen, run post-draw hooks.
     * This replaces the removed "Pass 3/4 + post hooks" section from Textmodifier.$render().
     *
     * @ignore
     */
    $renderAndPresent(): void;
    /**
     * Composite base + user layers onto the target framebuffer.
     */
    private _compositeLayers;
    /**
     * Resize all layers, compositor, and global post-processing buffers.
     * @ignore
     */
    $resize(): void;
    /**
     * Dispose of the layer manager, all layers, compositor, and global post-processing resources.
     * @ignore
     */
    $dispose(): void;
    get all(): readonly TextmodeLayer[];
    get base(): TextmodeLayer;
    get filters(): TextmodeFilterManager;
    get resultFramebuffer(): GLFramebuffer;
    /**
     * Get the grid of the topmost visible layer.
     * Returns the topmost user layer's grid if any are visible, otherwise returns the base layer's grid.
     * This is useful for input managers that need to map coordinates to the layer the user sees on top.
     * @ignore
     */
    $getTopmostGrid(): TextmodeGrid | undefined;
    /**
     * Register a callback to be invoked whenever ANY layer's grid dimensions change.
     * This includes the base layer and all user layers.
     * @param callback The callback to invoke on dimension changes.
     * @ignore
     */
    $onAnyGridDimensionChange(callback: () => void): void;
    /**
     * Notify all registered callbacks that a grid's dimensions have changed.
     */
    private _notifyGridDimensionChange;
    /**
     * Initialize a single layer with required dependencies.
     */
    private _initializeLayer;
}
