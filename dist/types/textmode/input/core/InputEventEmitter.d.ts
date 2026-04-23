/**
 * A lightweight, typed event emitter for input managers.
 *
 * Replaces single-callback fields with a multi-listener model that supports
 * `on()`, `off()`, and `once()` — enabling plugins and composed behaviours
 * to coexist on the same event without overwriting each other.
 *
 * @template TEventMap - Record mapping event names to their handler signatures.
 */
export declare class InputEventEmitter<TEventMap extends {
    [K in keyof TEventMap]: (...args: never[]) => void;
}> {
    private _listeners;
    /**
     * Register a listener for the given event.
     * @returns A dispose function that removes this specific listener.
     */
    _on<K extends keyof TEventMap>(event: K, fn: TEventMap[K]): () => void;
    /**
     * Remove a previously registered listener.
     * If the same function was added multiple times, only the first match is removed.
     */
    _off<K extends keyof TEventMap>(event: K, fn: TEventMap[K]): void;
    /**
     * Register a listener that fires at most once, then auto-removes itself.
     * @returns A dispose function that removes this specific listener.
     */
    _once<K extends keyof TEventMap>(event: K, fn: TEventMap[K]): () => void;
    /**
     * Emit an event, calling all registered listeners in registration order.
     * `once` listeners are removed after invocation.
     */
    _emit<K extends keyof TEventMap>(event: K, ...args: Parameters<TEventMap[K]>): void;
    /**
     * Check whether a given event has any listeners registered.
     */
    _hasListeners<K extends keyof TEventMap>(event: K): boolean;
    /**
     * Remove all listeners, optionally scoped to a single event.
     */
    _removeAll(event?: keyof TEventMap): void;
}
