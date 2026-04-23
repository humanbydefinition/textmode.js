import type { InputEventMap } from '../input/core/InputEventRegistry';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Register an event listener. Multiple listeners can coexist on the same event —
         * unlike the legacy single-callback methods (e.g. `mousePressed()`), calling `on()`
         * never replaces existing listeners.
         *
         * @template K - Event name from the {@link InputEventMap}.
         * @param event  The event to listen for (e.g. `'mousePressed'`, `'keyReleased'`, `'gamepadConnected'`, `'pinch'`).
         * @param handler The callback to invoke when the event fires.
         * @returns A dispose function that removes this specific listener.
         *
         * @example
         * ```ts
         * // Add a click listener
         * const dispose = t.on('mouseClicked', (data) => {
         *   console.log('Clicked at', data.position.x, data.position.y);
         * });
         *
         * // Later, remove it
         * dispose();
         * ```
         */
        on<K extends keyof InputEventMap>(event: K, handler: InputEventMap[K]): () => void;
        /**
         * Remove a previously registered event listener.
         *
         * The handler reference must be the same function instance that was passed to `on()` or `once()`.
         *
         * @template K - Event name from the {@link InputEventMap}.
         * @param event  The event the handler was attached to.
         * @param handler The exact function reference to remove.
         *
         * @example
         * ```ts
         * function onPress(data) { console.log(data.position); }
         * t.on('mousePressed', onPress);
         *
         * // Later
         * t.off('mousePressed', onPress);
         * ```
         */
        off<K extends keyof InputEventMap>(event: K, handler: InputEventMap[K]): void;
        /**
         * Register a one-shot event listener that automatically removes itself after the first invocation.
         *
         * @template K - Event name from the {@link InputEventMap}.
         * @param event  The event to listen for.
         * @param handler The callback to invoke once.
         * @returns A dispose function that removes the listener before it fires (if needed).
         *
         * @example
         * ```ts
         * t.once('keyPressed', (data) => {
         *   console.log('First key press was:', data.key);
         * });
         * ```
         */
        once<K extends keyof InputEventMap>(event: K, handler: InputEventMap[K]): () => void;
    }
}
