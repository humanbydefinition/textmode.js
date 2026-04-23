import type { GLFramebuffer } from '../../rendering';
import { TextmodeLayer } from './TextmodeLayer';
import type { TextmodeLayerOptions } from './types';
import type { FilterName } from '../filters/types';
import { TextmodeFilterManager } from '../filters';
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
export declare class TextmodeLayerManager {
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
    private _lastPresentedFramebuffer;
    private readonly _loadingController;
    private readonly _errorController;
    _queueGlobalFilter<TParams = unknown>(name: FilterName, params?: TParams): void;
    /**
     * Create and add a new layer to the top of the layer stack.
     *
     * New layers are initialized with their own grid and font settings.
     * Layers can be offset, rotated, and blended with layers below them.
     *
     * @param options Optional configuration for the new layer (visibility, opacity, blendMode, etc.)
     * @returns The newly created TextmodeLayer instance.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/add/sketch.js}
     */
    add(options?: TextmodeLayerOptions): TextmodeLayer;
    /**
     * Remove a layer from the manager.
     * @param layer The layer to remove.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/remove/sketch.js}
     */
    remove(layer: TextmodeLayer): void;
    /**
     * Move a layer to a new index in the layer stack.
     * @param layer The layer to move.
     * @param newIndex The new index for the layer.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/move/sketch.js}
     */
    move(layer: TextmodeLayer, newIndex: number): void;
    /**
     * Swap the order of two layers if they exist in the same collection.
     * @param layerA The first layer to swap.
     * @param layerB The second layer to swap.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/swap/sketch.js}
     */
    swap(layerA: TextmodeLayer, layerB: TextmodeLayer): void;
    /**
     * Remove all user-created layers from the manager.
     * The base layer is not affected by this operation.
     * This is useful for integration into live-coding environments where code is re-evaluated
     * and layers need to be recreated from scratch.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/clear/sketch.js}
     */
    clear(): void;
    private _blendBackgroundColor;
    _renderAndPresentWithOverlay(overlayLayer: TextmodeLayer, blendBackgroundWithOverlay?: boolean): void;
    private _renderAndPresentPostComposite;
    /**
     * Composite base + user layers onto the target framebuffer.
     */
    private _compositeLayers;
    /**
     * Get all user layers as a readonly array.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/all/sketch.js}
     */
    get all(): readonly TextmodeLayer[];
    /**
     * The base layer that is always rendered at the bottom of the layer stack.
     * This layer represents the main drawing content before any user layers are composited.
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
     * Access the filter manager used by this layer stack.
     *
     * Use this to register custom filters that can be applied to the base layer
     * and any user-created layer via {@link TextmodeLayer.filter}.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/filters/sketch.js}
     */
    get filters(): TextmodeFilterManager;
    /**
     * The framebuffer containing the most recent composited result, or the framebuffer that will receive
     * the current frame's composited result if accessed mid-frame before presentation completes.
     *
     * @example
     * {@includeCode ../../../examples/LayerManager/resultFramebuffer/sketch.js}
     */
    get resultFramebuffer(): GLFramebuffer;
    /**
     * Notify all registered callbacks that a grid's dimensions have changed.
     */
    private _notifyGridDimensionChange;
    /**
     * Initialize a single layer with required dependencies.
     */
    private _initializeLayer;
}
