import type { GLFramebuffer } from '../../rendering';
import { TextmodeLayer } from './TextmodeLayer';
import type { TextmodeLayerOptions } from './types';
import type { FilterName } from '../filters/types';
import { TextmodeFilterManager } from '../filters';
/**
 * Manages the stack of layers within a {@link Textmodifier} instance.
 *
 * The `base` layer is always present at the bottom of the stack. User-created layers are added
 * above it and can render with independent grids, fonts, filters, offsets, opacity, and blend modes.
 *
 * Access this manager via `textmodifier.layers`.
 */
export declare class TextmodeLayerManager {
    private readonly _textmodifier;
    private readonly _renderer;
    private readonly _compositor2D;
    private readonly _filterManager;
    private _layers;
    private _pendingLayers;
    private readonly _baseLayer;
    private _isReady;
    private readonly _gridDimensionChangeCallbacks;
    private _globalFilterQueue;
    private _finalFilterQueue;
    private _isRunningFinalDraw;
    private _finalDrawCallback;
    private _preFilterFramebuffer;
    private _postFilterFramebuffer;
    private _lastPresentedFramebuffer;
    private readonly _loadingController;
    private readonly _errorController;
    private readonly _internalCompositeBaseState;
    _queueGlobalFilter<TParams = unknown>(name: FilterName, params?: TParams): void;
    /**
     * Create a layer at the top of the stack.
     *
     * New layers are initialized with their own grid and font settings.
     * Layers can be offset, rotated, and blended with layers below them.
     *
     * @param options Optional layer configuration.
     * @returns The created layer.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/add/sketch.js}
     */
    add(options?: TextmodeLayerOptions): TextmodeLayer;
    /**
     * Remove and dispose a user-created layer.
     * @param layer Layer to remove.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/remove/sketch.js}
     */
    remove(layer: TextmodeLayer): void;
    /**
     * Move a user-created layer to a new index in the stack.
     * @param layer Layer to move.
     * @param newIndex Target index.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/move/sketch.js}
     */
    move(layer: TextmodeLayer, newIndex: number): void;
    /**
     * Swap two user-created layers.
     * @param layerA First layer to swap.
     * @param layerB Second layer to swap.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/swap/sketch.js}
     */
    swap(layerA: TextmodeLayer, layerB: TextmodeLayer): void;
    /**
     * Remove and dispose all user-created layers.
     *
     * The base layer is not affected by this operation.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/clear/sketch.js}
     */
    clear(): void;
    private _blendBackgroundColor;
    _renderAndPresentWithOverlay(overlayLayer: TextmodeLayer, blendBackgroundWithOverlay?: boolean): void;
    private _renderAndPresentPostComposite;
    private _presentTexture;
    private _withInternalRenderScope;
    private _getInternalOverlayTargetFramebuffer;
    private _createLayerPlacement;
    /**
     * Composite base + user layers onto the target framebuffer.
     */
    private _compositeLayers;
    /**
     * All user-created layers in stack order.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/all/sketch.js}
     */
    get all(): readonly TextmodeLayer[];
    /**
     * Base layer rendered at the bottom of the stack.
     *
     * Use this when you want direct access to the main layer as a {@link TextmodeLayer},
     * including layer-specific methods like {@link TextmodeLayer.draw}, {@link TextmodeLayer.filter},
     * and {@link TextmodeLayer.offset}.
     *
     * The base layer cannot be removed or moved.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/base/sketch.js}
     */
    get base(): TextmodeLayer;
    /**
     * Filter manager used by this layer stack.
     *
     * Use this to register custom filters that can be applied to the base layer
     * and any user-created layer via {@link TextmodeLayer.filter}.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/filters/sketch.js}
     */
    get filters(): TextmodeFilterManager;
    /**
     * Framebuffer containing the most recent composited result.
     *
     * When accessed mid-frame before presentation completes, this returns the framebuffer
     * that will receive the current frame's composited result.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/resultFramebuffer/sketch.js}
     */
    get resultFramebuffer(): GLFramebuffer;
    /**
     * Notify all registered callbacks that a grid's dimensions have changed.
     */
    private _notifyGridDimensionChange;
    private _initializePendingLayers;
    private _removeLayerFrom;
    private _moveLayerIn;
    private _swapLayersIn;
    private _disposeLayers;
    private _disposeUserLayer;
    /**
     * Initialize a single layer with required dependencies.
     */
    private _initializeLayer;
}
