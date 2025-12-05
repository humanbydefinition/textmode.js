import type { TextmodeLayer } from '../TextmodeLayer';
import type { TextmodeLayerOptions } from '../types';
export interface ILayerManager {
    /**
     * Get all user layers as a readonly array.
     */
    readonly all: readonly TextmodeLayer[];
    /**
     * The base layer that is always rendered at the bottom of the layer stack.
     * This layer represents the main drawing content before any user layers are composited.
     */
    readonly base: TextmodeLayer;
    /**
     * Add a new layer to the manager.
     * @param options Layer configuration options.
     * @returns The newly added layer.
     */
    add(options?: TextmodeLayerOptions): TextmodeLayer;
    /**
     * Remove a layer from the manager.
     * @param layer The layer to remove.
     */
    remove(layer: TextmodeLayer): void;
    /**
     * Move a layer to a new index in the layer stack.
     * @param layer The layer to move.
     * @param newIndex The new index for the layer.
     */
    move(layer: TextmodeLayer, newIndex: number): void;
    /**
     * Swap the order of two layers if they exist in the same collection.
     * @param layerA The first layer to swap.
     * @param layerB The second layer to swap.
     */
    swap(layerA: TextmodeLayer, layerB: TextmodeLayer): void;
    /**
     * Remove all user-created layers from the manager.
     * The base layer is not affected by this operation.
     * This is useful for integration into live-coding environments where code is re-evaluated
     * and layers need to be recreated from scratch.
     */
    clear(): void;
}
