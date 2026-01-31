import type { TextmodeLayer } from '../TextmodeLayer';
import type { TextmodeLayerOptions } from '../types';
import type { TextmodeGrid } from '../../Grid';
import type { GLFramebuffer } from '../../../rendering/webgl/core/Framebuffer';
export interface ILayerManager {
    /**
     * Get all user layers as a readonly array.
     *
     * @example
     * ```js
     * const t = textmode.create();
     * t.layers.add();
     * t.layers.add();
     *
     * console.log(t.layers.all.length); // 2
     *
     * // Iterate over all user layers
     * t.layers.all.forEach(layer => {
     *   layer.opacity(0.5);
     * });
     * ```
     */
    readonly all: readonly TextmodeLayer[];
    /**
     * The base layer that is always rendered at the bottom of the layer stack.
     * This layer represents the main drawing content before any user layers are composited.
     *
     * The base layer cannot be removed or moved.
     */
    readonly base: TextmodeLayer;
    /**
     * The framebuffer containing the final composited result after all layers and filters have been applied.
     */
    readonly resultFramebuffer: GLFramebuffer;
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
     * ```javascript
     * const t = textmode.create();
     *
     * // Add a new layer on top of the base layer
     * const uiLayer = t.layers.add({
     *     blendMode: 'normal',
     *     opacity: 1.0,
     *     fontSize: 16
     * });
     *
     * // Draw to the new layer
     * uiLayer.draw(() => {
     *     t.clear(); // Clear THIS layer's background (transparent)
     *
     *     t.charColor(255, 0, 0); // Red text
     *     t.cellColor(0, 0, 0, 0); // Transparent cell background
     *     t.char('!');
     *     t.rect(5, 5);
     * });
     *
     * // Base layer content
     * t.draw(() => {
     *     t.background(0, 0, 50); // Dark blue background
     *
     *     t.charColor(0, 0, 255); // Blue text
     *     t.cellColor(0, 0, 0, 0); // Transparent cell background
     *     t.char('?');
     *     t.rect(5, 5);
     * });
     * ```
     */
    add(options?: TextmodeLayerOptions): TextmodeLayer;
    /**
     * Remove a layer from the manager.
     * @param layer The layer to remove.
     *
     * @example
     * ```js
     * const t = textmode.create();
     *
     * const tempLayer = t.layers.add();
     *
     * // Remove the layer after 100 frames
     * t.draw(() => {
     *   if (t.frameCount > 100) {
     *     t.layers.remove(tempLayer);
     *   }
     * });
     * ```
     */
    remove(layer: TextmodeLayer): void;
    /**
     * Move a layer to a new index in the layer stack.
     * @param layer The layer to move.
     * @param newIndex The new index for the layer.
     *
     * @example
     * ```js
     * const t = textmode.create();
     *
     * const bgLayer = t.layers.add(); // Index 0
     * const fgLayer = t.layers.add(); // Index 1
     *
     * // Swap z-order by moving fgLayer to bottom (index 0)
     * // This pushes bgLayer to index 1
     * t.layers.move(fgLayer, 0);
     * ```
     */
    move(layer: TextmodeLayer, newIndex: number): void;
    /**
     * Swap the order of two layers if they exist in the same collection.
     * @param layerA The first layer to swap.
     * @param layerB The second layer to swap.
     *
     * @example
     * ```js
     * const t = textmode.create();
     *
     * const layer1 = t.layers.add();
     * const layer2 = t.layers.add();
     *
     * // Swap the layers' positions in the stack
     * t.layers.swap(layer1, layer2);
     * ```
     */
    swap(layerA: TextmodeLayer, layerB: TextmodeLayer): void;
    /**
     * Remove all user-created layers from the manager.
     * The base layer is not affected by this operation.
     * This is useful for integration into live-coding environments where code is re-evaluated
     * and layers need to be recreated from scratch.
     *
     * @example
     * ```js
     * const t = textmode.create();
     *
     * t.setup(() => {
     *   // Ensure clean slate when re-running setup
     *   t.layers.clear();
     *
     *   // Re-create layers
     *   t.layers.add({ blendMode: 'additive' });
     *   t.layers.add({ blendMode: 'multiply' });
     * });
     * ```
     */
    clear(): void;
    /**
     * Get the grid of the topmost visible layer.
     * Returns the topmost user layer's grid if any are visible, otherwise returns the base layer's grid.
     * This is useful for input managers that need to map coordinates to the layer the user sees on top.
     */
    $getTopmostGrid(): TextmodeGrid | undefined;
}
