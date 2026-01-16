import type { GLFramebuffer } from '../../rendering';
import type { Textmodifier } from '../Textmodifier';
import { TextmodeLayer } from './TextmodeLayer';
import type { TextmodeLayerOptions } from './types';
import type { ILayerManager } from './interfaces/ILayerManager';
import type { TextmodeOptions } from '../types';
import type { TextmodeGrid } from '../Grid';
import { type FilterName, type BuiltInFilterName, type BuiltInFilterParams, TextmodeFilterManager } from '../filters';
/**
 * Manages all user-defined layers within a Textmodifier in addition to the base layer.
 *
 * Responsibilities:
 * - Managing the collection of user layers (add, remove, move, swap)
 * - Coordinating layer rendering and compositing
 * - Owning the global post-processing pipeline (global filters + present to screen)
 *
 * The instance of this class can be accessed via {@link Textmodifier.layers}.
 *
 * The {@link base} layer is not part of the public layer stack, but is instead managed internally.
 */
export declare class LayerManager implements ILayerManager {
    private readonly _textmodifier;
    private readonly _renderer;
    private readonly _compositor2D;
    private readonly _filterManager;
    private readonly _textmodeConversionShader;
    private readonly _presentShader;
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
    $queueGlobalFilter(name: FilterName, params?: unknown): void;
    /**
     * Clear any queued global filters for the current frame.
     * @ignore
     */
    $clearGlobalFilterQueue(): void;
    add(options?: TextmodeLayerOptions): TextmodeLayer;
    remove(layer: TextmodeLayer): void;
    move(layer: TextmodeLayer, newIndex: number): void;
    swap(layerA: TextmodeLayer, layerB: TextmodeLayer): void;
    /**
     * Remove and dispose all user layers (keeps base layer intact).
     */
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
     * @param fallbackBaseDraw Fallback draw callback for the base layer if it has no own draw callback.
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
