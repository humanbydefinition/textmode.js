import type { GLFramebuffer } from '../../rendering';
import type { Textmodifier } from '../Textmodifier';
import { TextmodeLayer } from './TextmodeLayer';
import type { TextmodeLayerOptions } from './types';
import type { ILayerManager } from './interfaces/ILayerManager';
/**
 * Manages all user-defined layers within a Textmodifier instance.
 *
 * This manager is responsible for:
 * - Managing the collection of user layers (add, remove, move, swap)
 * - Coordinating layer rendering and compositing
 *
 * The instance of this class can be accessed via {@link Textmodifier.layers}.
 *
 * The {@link base} layer is not part of the public layer stack, but is instead managed internally.
 */
export declare class LayerManager implements ILayerManager {
    private readonly _textmodifier;
    private readonly _renderer;
    private readonly _conversionShader;
    private readonly _compositor2D;
    private readonly _pendingLayers;
    private readonly _layers;
    private readonly _baseLayer;
    private _baseFramebuffer;
    private _baseRawFramebuffer;
    private _layerPingPongBuffers;
    private _isReady;
    /**
     * Create a new LayerManager.
     * @param textmodifier The Textmodifier instance this manager belongs to.
     * @ignore
     */
    constructor(textmodifier: Textmodifier);
    add(options?: TextmodeLayerOptions): TextmodeLayer;
    remove(layer: TextmodeLayer): void;
    move(layer: TextmodeLayer, newIndex: number): void;
    swap(layerA: TextmodeLayer, layerB: TextmodeLayer): void;
    clear(): void;
    /**
     * Initialize all pending layers and the compositor.
     * @ignore
     */
    $initialize(): void;
    /**
     * Render all layers (base and user) and composite them to the target framebuffer.
     * @param targetFramebuffer The framebuffer to render the final composited result to.
     * @param backgroundColor The background color as RGBA values (0-1 range).
     * @ignore
     */
    $renderAndComposite(targetFramebuffer: GLFramebuffer, backgroundColor: [number, number, number, number]): void;
    /**
     * Render all user layers to their respective framebuffers.
     */
    private _renderUserLayers;
    /**
     * Composite all layers onto the target framebuffer.
     */
    private _compositeLayers;
    /**
     * Resize all layers and the compositor to match the current grid dimensions.
     * @ignore
     */
    $resize(): void;
    /**
     * Dispose of the layer manager, all layers, and the compositor.
     * @ignore
     */
    $dispose(): void;
    get all(): readonly TextmodeLayer[];
    get base(): TextmodeLayer;
    /**
     * Initialize a single layer with required dependencies.
     */
    private _initializeLayer;
    /**
     * Initialize the base layer with external (shared) framebuffers.
     * The base layer shares the main textmode draw framebuffer and uses
     * the manager's base framebuffer for ASCII output.
     */
    private _initializeBaseLayer;
    /**
     * Remove a layer from a collection and dispose it.
     */
    private _removeFromCollection;
    /**
     * Move a layer to a new index within a collection.
     */
    private _moveInCollection;
    /**
     * Swap two layers within a collection.
     */
    private _swapInCollection;
}
