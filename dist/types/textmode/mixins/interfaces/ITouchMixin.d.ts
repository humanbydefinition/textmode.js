import type { TouchEventHandler, TouchLongPressHandler, TouchPinchHandler, TouchPosition, TouchRotateHandler, TouchSwipeHandler, TouchTapHandler } from '../../managers/TouchManager';
/**
 * Capabilities exposed by the TouchMixin for handling touch interaction and gestures.
 */
export interface ITouchMixin {
    /**
     * Set a callback function that will be called when a touch point begins.
     *
     * The callback receives {@link TouchEventData} containing the touch that triggered the event,
     * all active touches, and the original DOM event. Use this to react when the user places one or
     * more fingers on the canvas.
     *
     * @param callback The function to call when a touch starts.
     *
     * @example
     * ```js
     * t.touchStarted((data) => {
     *   console.log(`Touch ${data.touch.id} began at ${data.touch.x}, ${data.touch.y}`);
     * });
     * ```
     */
    touchStarted(callback: TouchEventHandler): void;
    /**
     * Set a callback function that will be called when a touch point moves across the canvas.
     *
     * The provided callback is invoked continuously while the browser reports move events. Use the
     * `previousTouch` and `deltaTime` fields to derive velocity or gesture behaviour.
     *
     * @param callback The function to call when a touch moves.
     *
     * @example
     * ```js
     * t.touchMoved((data) => {
     *   const { touch, previousTouch } = data;
     *   if (previousTouch) {
     *     console.log(`Touch moved by ${touch.x - previousTouch.x}, ${touch.y - previousTouch.y}`);
     *   }
     * });
     * ```
     */
    touchMoved(callback: TouchEventHandler): void;
    /**
     * Set a callback function that will be called when a touch ends normally.
     *
     * This fires after the finger leaves the canvas surface and the browser raises a `touchend`
     * event. Use it to finalise state such as drawing strokes or completing gestures.
     *
     * @param callback The function to call when a touch ends.
     *
     * @example
     * ```js
     * t.touchEnded((data) => {
     *   console.log(`Touch ${data.touch.id} finished at ${data.touch.x}, ${data.touch.y}`);
     * });
     * ```
     */
    touchEnded(callback: TouchEventHandler): void;
    /**
     * Set a callback function that will be called when a touch is cancelled by the browser.
     *
     * Cancellation can occur when the browser takes ownership for scrolling or if the gesture
     * leaves the window. Treat this as an aborted touch and clean up any in-progress state.
     *
     * @param callback The function to call when a touch is cancelled.
     *
     * @example
     * ```js
     * t.touchCancelled((data) => {
     *   console.warn(`Touch ${data.touch.id} cancelled by the browser`);
     * });
     * ```
     */
    touchCancelled(callback: TouchEventHandler): void;
    /**
     * Register a callback for tap gestures.
     *
     * A tap is fired when the user quickly touches and releases the canvas without travelling far.
     * Use {@link TouchTapEventData.taps} to determine whether the gesture is a single or multi tap.
     *
     * @param callback The function to call when a tap gesture is detected.
     *
     * @example
     * ```js
     * t.tap((data) => {
     *   console.log(`Tapped at ${data.touch.x}, ${data.touch.y}`);
     * });
     * ```
     */
    tap(callback: TouchTapHandler): void;
    /**
     * Register a callback for double tap gestures.
     *
     * Double taps reuse the same {@link TouchTapEventData} as taps with `taps` set to `2`. This
     * helper lets you supply a dedicated handler when you want to treat double taps differently.
     *
     * @param callback The function to call when a double tap is detected.
     *
     * @example
     * ```js
     * t.doubleTap((data) => {
     *   console.log('Double tap detected', data.touch);
     * });
     * ```
     */
    doubleTap(callback: TouchTapHandler): void;
    /**
     * Register a callback for long press gestures.
     *
     * A long press is emitted when the user keeps a finger on the canvas without moving beyond the
     * configured tolerance. The event includes the press duration in milliseconds.
     *
     * @param callback The function to call when a long press gesture is detected.
     *
     * @example
     * ```js
     * t.longPress((data) => {
     *   console.log(`Long press for ${Math.round(data.duration)}ms`);
     * });
     * ```
     */
    longPress(callback: TouchLongPressHandler): void;
    /**
     * Register a callback for swipe gestures.
     *
     * Swipes provide the dominant direction (`up`, `down`, `left`, `right`), travelled distance, and
     * velocity in CSS pixels per millisecond. Useful for panning, flicks, or quick shortcuts.
     *
     * @param callback The function to call when a swipe gesture is detected.
     *
     * @example
     * ```js
     * t.swipe((data) => {
     *   console.log(`Swipe ${data.direction} with distance ${data.distance}`);
     * });
     * ```
     */
    swipe(callback: TouchSwipeHandler): void;
    /**
     * Register a callback for pinch gestures, receiving scale deltas.
     *
     * Pinch gestures involve two touch points. The callback receives the current scale relative to
     * the initial distance and the change since the previous update, enabling zoom interactions.
     *
     * @param callback The function to call when a pinch gesture is detected.
     *
     * @example
     * ```js
     * t.pinch((data) => {
     *   console.log(`Pinch scale: ${data.scale.toFixed(2)}`);
     * });
     * ```
     */
    pinch(callback: TouchPinchHandler): void;
    /**
     * Register a callback for rotate gestures, receiving rotation deltas in degrees.
     *
     * Rotation callbacks provide the cumulative rotation and delta rotation since the last update,
     * along with the gesture centre in grid coordinates. Ideal for dial-like interactions.
     *
     * @param callback The function to call when a rotation gesture is detected.
     *
     * @example
     * ```js
     * t.rotateGesture((data) => {
     *   console.log(`Rotated ${data.deltaRotation.toFixed(1)}°`);
     * });
     * ```
     */
    rotateGesture(callback: TouchRotateHandler): void;
    /**
     * Get the currently active touches in grid coordinates.
     *
     * Returns a copy of each touch, including grid position, client coordinates, and pressure when
     * available. Use this inside a draw loop to react to active multi-touch scenarios.
     *
     * @example
     * ```js
     * t.draw(() => {
     *   for (const touch of t.touches) {
     *     t.point();
     *   }
     * });
     * ```
     */
    get touches(): TouchPosition[];
}
