import { type TouchEventHandler, type TouchLongPressHandler, type TouchPinchHandler, type TouchPosition, type TouchRotateHandler, type TouchSwipeHandler, type TouchTapHandler } from '../input/touch';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Register the single-callback handler for touch start events.
         *
         * The callback receives {@link input.touch.TouchEventData} containing the touch that triggered the event,
         * all active touches, and the original DOM event. Use this to react when the user places one or
         * more fingers on the canvas.
         *
         * @param callback Handler to run when a touch starts.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/touchStarted/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/touchStarted | Textmodifier.touchStarted API reference}
         */
        touchStarted(callback: TouchEventHandler): void;
        /**
         * Register the single-callback handler for touch movement.
         *
         * The provided callback is invoked continuously while the browser reports move events. Use the
         * `previousTouch` and `deltaTime` fields to derive velocity or gesture behaviour.
         *
         * @param callback Handler to run when a touch moves.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/touchMoved/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/touchMoved | Textmodifier.touchMoved API reference}
         */
        touchMoved(callback: TouchEventHandler): void;
        /**
         * Register the single-callback handler for touch end events.
         *
         * This fires after the finger leaves the canvas surface and the browser raises a `touchend`
         * event. Use it to finalise state such as drawing strokes or completing gestures.
         *
         * @param callback Handler to run when a touch ends.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/touchEnded/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/touchEnded | Textmodifier.touchEnded API reference}
         */
        touchEnded(callback: TouchEventHandler): void;
        /**
         * Register the single-callback handler for browser-cancelled touches.
         *
         * Cancellation can occur when the browser takes ownership for scrolling or if the gesture
         * leaves the window. Treat this as an aborted touch and clean up any in-progress state.
         *
         * @param callback Handler to run when a touch is cancelled.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/touchCancelled/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/touchCancelled | Textmodifier.touchCancelled API reference}
         */
        touchCancelled(callback: TouchEventHandler): void;
        /**
         * Register a callback for tap gestures.
         *
         * A tap is fired when the user quickly touches and releases the canvas without travelling far.
         * Use {@link input.touch.TouchTapEventData.taps} to determine whether the gesture is a single or multi tap.
         *
         * @param callback Handler to run when a tap gesture is detected.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/tap/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/tap | Textmodifier.tap API reference}
         */
        tap(callback: TouchTapHandler): void;
        /**
         * Register a callback for double tap gestures.
         *
         * Double taps reuse the same {@link input.touch.TouchTapEventData} as taps with `taps` set to `2`. This
         * helper lets you supply a dedicated handler when you want to treat double taps differently.
         *
         * @param callback Handler to run when a double tap is detected.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/doubleTap/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/doubleTap | Textmodifier.doubleTap API reference}
         */
        doubleTap(callback: TouchTapHandler): void;
        /**
         * Register a callback for long press gestures.
         *
         * A long press is emitted when the user keeps a finger on the canvas without moving beyond the
         * configured tolerance. The event includes the press duration in milliseconds.
         *
         * @param callback Handler to run when a long press gesture is detected.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/longPress/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/longPress | Textmodifier.longPress API reference}
         */
        longPress(callback: TouchLongPressHandler): void;
        /**
         * Register a callback for swipe gestures.
         *
         * Swipes provide a normalised direction vector, travelled distance, and velocity in CSS pixels
         * per millisecond. Useful for panning, flicks, or quick shortcuts.
         *
         * @param callback Handler to run when a swipe gesture is detected.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/swipe/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/swipe | Textmodifier.swipe API reference}
         */
        swipe(callback: TouchSwipeHandler): void;
        /**
         * Register a callback for pinch gestures, receiving scale deltas.
         *
         * Pinch gestures involve two touch points. The callback receives the current scale relative to
         * the initial distance and the change since the previous update, enabling zoom interactions.
         *
         * @param callback Handler to run when a pinch gesture is detected.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/pinch/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/pinch | Textmodifier.pinch API reference}
         */
        pinch(callback: TouchPinchHandler): void;
        /**
         * Register a callback for rotate gestures, receiving rotation deltas in degrees.
         *
         * Rotation callbacks provide the cumulative rotation and delta rotation since the last update,
         * along with the gesture centre in grid coordinates. Ideal for dial-like interactions.
         *
         * @param callback Handler to run when a rotation gesture is detected.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/rotateGesture/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/rotateGesture | Textmodifier.rotateGesture API reference}
         */
        rotateGesture(callback: TouchRotateHandler): void;
        /**
         * Currently active touches in grid coordinates.
         *
         * Returns a copy of each touch, including grid position, client coordinates, and pressure when
         * available. Use this inside a draw loop to react to active multi-touch scenarios.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/touches/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/properties/touches | Textmodifier.touches API reference}
         */
        readonly touches: TouchPosition[];
    }
}
