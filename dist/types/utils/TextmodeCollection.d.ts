/**
 * A generic, managed collection for objects that require lifecycle management.
 *
 * This class provides CRUD operations (Create/Read/Update/Delete) with support for:
 * - Adding and removing items
 * - Reordering items (move, swap)
 * - Deferred initialization via pending items
 * - Automatic disposal of removed items
 * - Event callbacks for lifecycle events
 *
 * @typeParam T - The type of items stored in the collection
 *
 * @example
 * ```ts
 * // Create a collection with a disposal callback
 * const layers = new TextmodeCollection<TextmodeLayer>({
 *   onDispose: (layer) => layer.$dispose(),
 *   onAdd: (layer) => pluginManager.notifyLayerCreated(layer),
 *   onRemove: (layer) => pluginManager.notifyLayerDisposed(layer),
 * });
 *
 * // Add items
 * const layer = new TextmodeLayer();
 * layers.add(layer);
 *
 * // Iterate
 * for (const layer of layers) {
 *   layer.draw();
 * }
 *
 * // Remove all
 * layers.clear();
 * ```
 */
export declare class TextmodeCollection<T> implements Iterable<T> {
    private _items;
    private _pendingItems;
    private _isReady;
    private readonly _options;
    /**
     * Create a new TextmodeCollection.
     *
     * @param options Configuration options for the collection
     */
    constructor(options?: TextmodeCollectionOptions<T>);
    /**
     * Mark the collection as ready and move all pending items to the active list.
     *
     * Call this after async initialization is complete. Any items added before
     * this call will be moved from the pending queue to the active collection.
     *
     * @param initializeItem Optional async function to initialize each pending item
     * @returns Promise that resolves when all pending items are initialized
     */
    initialize(initializeItem?: (item: T) => Promise<void>): Promise<void>;
    /**
     * Check if the collection has been initialized.
     */
    get isReady(): boolean;
    /**
     * Add an item to the collection.
     *
     * If the collection is not yet ready, the item is added to a pending queue.
     * Once `initialize()` is called, pending items are moved to the active collection.
     *
     * @param item The item to add
     * @returns The added item (for chaining)
     */
    add(item: T): T;
    /**
     * Add multiple items to the collection.
     *
     * @param items The items to add
     * @returns The added items
     */
    addMany(items: T[]): T[];
    /**
     * Remove an item from the collection and dispose it.
     *
     * @param item The item to remove
     * @returns true if the item was found and removed, false otherwise
     */
    remove(item: T): boolean;
    /**
     * Remove an item at a specific index.
     *
     * @param index The index of the item to remove
     * @returns The removed item, or undefined if index is out of bounds
     */
    removeAt(index: number): T | undefined;
    /**
     * Move an item to a new index in the collection.
     *
     * @param item The item to move
     * @param newIndex The target index
     * @returns true if the item was found and moved, false otherwise
     */
    move(item: T, newIndex: number): boolean;
    /**
     * Swap the positions of two items in the collection.
     *
     * @param itemA The first item
     * @param itemB The second item
     * @returns true if both items were found and swapped, false otherwise
     */
    swap(itemA: T, itemB: T): boolean;
    /**
     * Remove and dispose all items from the collection.
     *
     * This clears both active and pending items.
     */
    clear(): void;
    /**
     * Dispose the collection and all its items.
     *
     * After calling this, the collection should not be used.
     */
    dispose(): void;
    /**
     * Get all active items as a readonly array.
     */
    get all(): readonly T[];
    /**
     * Get all pending items as a readonly array.
     */
    get pending(): readonly T[];
    /**
     * Get the number of active items.
     */
    get length(): number;
    /**
     * Get the total number of items (active + pending).
     */
    get totalLength(): number;
    /**
     * Check if the collection is empty (no active items).
     */
    get isEmpty(): boolean;
    /**
     * Get an item at a specific index.
     *
     * @param index The index of the item
     * @returns The item, or undefined if index is out of bounds
     */
    get(index: number): T | undefined;
    /**
     * Get the first item in the collection.
     */
    get first(): T | undefined;
    /**
     * Get the last item in the collection.
     */
    get last(): T | undefined;
    /**
     * Get the index of an item.
     *
     * @param item The item to find
     * @returns The index, or -1 if not found
     */
    indexOf(item: T): number;
    /**
     * Check if an item exists in the collection.
     *
     * @param item The item to check
     * @returns true if the item exists (in active or pending)
     */
    has(item: T): boolean;
    /**
     * Iterate over all active items.
     */
    [Symbol.iterator](): Iterator<T>;
    /**
     * Execute a callback for each active item.
     *
     * @param callback Function to execute for each item
     */
    forEach(callback: (item: T, index: number) => void): void;
    /**
     * Map active items to a new array.
     *
     * @param callback Function to transform each item
     * @returns New array with transformed items
     */
    map<U>(callback: (item: T, index: number) => U): U[];
    /**
     * Filter active items.
     *
     * @param predicate Function to test each item
     * @returns New array with items that pass the test
     */
    filter(predicate: (item: T, index: number) => boolean): T[];
    /**
     * Find an item matching a predicate.
     *
     * @param predicate Function to test each item
     * @returns The first matching item, or undefined
     */
    find(predicate: (item: T, index: number) => boolean): T | undefined;
    /**
     * Find the index of an item matching a predicate.
     *
     * @param predicate Function to test each item
     * @returns The index of the first matching item, or -1
     */
    findIndex(predicate: (item: T, index: number) => boolean): number;
    /**
     * Check if any item matches a predicate.
     *
     * @param predicate Function to test each item
     * @returns true if any item matches
     */
    some(predicate: (item: T, index: number) => boolean): boolean;
    /**
     * Check if all items match a predicate.
     *
     * @param predicate Function to test each item
     * @returns true if all items match
     */
    every(predicate: (item: T, index: number) => boolean): boolean;
    /**
     * Reduce active items to a single value.
     *
     * @param callback Reducer function
     * @param initialValue Initial accumulator value
     * @returns The final accumulated value
     */
    reduce<U>(callback: (accumulator: U, item: T, index: number) => U, initialValue: U): U;
    /**
     * Dispose a single item using the configured disposal callback.
     */
    private _disposeItem;
}
/**
 * Configuration options for TextmodeCollection.
 *
 * @typeParam T - The type of items stored in the collection
 */
export interface TextmodeCollectionOptions<T> {
    /**
     * Called when an item is added to the active collection.
     * Not called for pending items until they become active.
     */
    onAdd?: (item: T) => void;
    /**
     * Called when an item is about to be removed from the collection.
     * This is called before `onDispose`.
     */
    onRemove?: (item: T) => void;
    /**
     * Called to dispose an item when it's removed from the collection.
     * This is where you should clean up resources.
     */
    onDispose?: (item: T) => void;
    /**
     * Called when an item is moved to a new index.
     */
    onMove?: (item: T, oldIndex: number, newIndex: number) => void;
    /**
     * Called when two items are swapped.
     */
    onSwap?: (itemA: T, itemB: T, indexA: number, indexB: number) => void;
}
