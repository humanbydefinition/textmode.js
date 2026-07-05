import { type MouseEventHandler } from '../input/mouse';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Register the single-callback handler for mouse clicks.
         *
         * @param callback Handler to run with mouse event data when the mouse is clicked.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/mouseClicked/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/mouseClicked | Textmodifier.mouseClicked API reference}
         */
        mouseClicked(callback: MouseEventHandler): void;
        /**
         * Register the single-callback handler for double-clicks.
         *
         * @param callback Handler to run with mouse event data when the mouse is double-clicked.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/doubleClicked/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/doubleClicked | Textmodifier.doubleClicked API reference}
         */
        doubleClicked(callback: MouseEventHandler): void;
        /**
         * Register the single-callback handler for mouse press events.
         *
         * @param callback Handler to run with mouse event data when the mouse is pressed.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/mousePressed/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/mousePressed | Textmodifier.mousePressed API reference}
         */
        mousePressed(callback: MouseEventHandler): void;
        /**
         * Register the single-callback handler for mouse release events.
         *
         * @param callback Handler to run with mouse event data when the mouse is released.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/mouseReleased/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/mouseReleased | Textmodifier.mouseReleased API reference}
         */
        mouseReleased(callback: MouseEventHandler): void;
        /**
         * Register the single-callback handler for mouse movement.
         *
         * @param callback Handler to run with mouse event data when the mouse moves.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/mouseMoved/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/mouseMoved | Textmodifier.mouseMoved API reference}
         */
        mouseMoved(callback: MouseEventHandler): void;
        /**
         * Register the single-callback handler for mouse dragging.
         *
         * @param callback Handler to run with mouse event data when the mouse is dragged.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/mouseDragged/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/mouseDragged | Textmodifier.mouseDragged API reference}
         */
        mouseDragged(callback: MouseEventHandler): void;
        /**
         * Register the single-callback handler for mouse wheel scrolling.
         *
         * @param callback Handler to run with mouse event data when the mouse wheel is scrolled.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/mouseScrolled/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/mouseScrolled | Textmodifier.mouseScrolled API reference}
         */
        mouseScrolled(callback: MouseEventHandler): void;
        /**
         * Current mouse position in center-based grid coordinates.
         *
         * Returns the mouse position in cell coordinates where `(0, 0)` is the center cell.
         * This matches the drawing coordinate system, so coordinates can be used directly with `translate()`.
         *
         * If the mouse is outside the grid or the instance is not ready,
         * it returns `{ x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY }`.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/mouse/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/properties/mouse | Textmodifier.mouse API reference}
         */
        readonly mouse: {
            x: number;
            y: number;
        };
        /**
         * Whether a mouse button is currently held down.
         *
         * This value stays `true` after a press begins on the canvas and returns to `false` when the
         * button is released, including releases that occur outside the canvas after the interaction
         * starts. Use it inside `draw()` for polling-style interactions.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/mouseIsPressed/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/properties/mouseIsPressed | Textmodifier.mouseIsPressed API reference}
         */
        readonly mouseIsPressed: boolean;
        /**
         * Mouse position from the previous rendered frame.
         *
         * Unlike `previousPosition` in mouse event callbacks, this value is updated exactly once per
         * rendered frame. Use it inside `draw()` to measure frame-to-frame mouse motion or draw trails.
         *
         * If no previous frame position is available yet, it returns
         * `{ x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY }`.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/pmouse/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/properties/pmouse | Textmodifier.pmouse API reference}
         */
        readonly pmouse: {
            x: number;
            y: number;
        };
        /**
         * Horizontal mouse movement accumulated since the previous rendered frame.
         *
         * This is especially useful while pointer lock is active, where absolute mouse coordinates
         * stop being meaningful and relative movement becomes the primary input signal.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/requestPointerLock/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/properties/movedX | Textmodifier.movedX API reference}
         */
        readonly movedX: number;
        /**
         * Vertical mouse movement accumulated since the previous rendered frame.
         *
         * This is especially useful while pointer lock is active, where absolute mouse coordinates
         * stop being meaningful and relative movement becomes the primary input signal.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/requestPointerLock/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/properties/movedY | Textmodifier.movedY API reference}
         */
        readonly movedY: number;
        /**
         * Set the mouse cursor for the textmode canvas.
         *
         * Provide any valid CSS cursor value (e.g. 'default', 'pointer', 'crosshair', 'move', 'text', 'grab',
         * 'grabbing', 'none', 'zoom-in', 'zoom-out', 'ns-resize', 'ew-resize', 'nwse-resize', 'nesw-resize',
         * etc.), or a CSS `url(...)` cursor. Call with no argument or an empty string to reset to default.
         *
         * See MDN for all options: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/cursor/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/cursor | Textmodifier.cursor API reference}
         */
        cursor(cursor?: string): void;
        /**
         * Request browser pointer lock for the textmode canvas.
         *
         * When pointer lock is active, mouse movement is reported as relative deltas via
         * {@link Textmodifier.movedX} and {@link Textmodifier.movedY}, allowing infinite-look and
         * first-person style controls.
         *
         * @returns `true` if the browser exposes pointer lock and the request was initiated,
         * otherwise `false`.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/requestPointerLock/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/requestPointerLock | Textmodifier.requestPointerLock API reference}
         */
        requestPointerLock(): boolean;
        /**
         * Exit pointer lock if the textmode canvas currently owns it.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/requestPointerLock/sketch.js}
         *
         * @see {@link https://code.textmode.art/api/textmode.js/classes/Textmodifier/methods/exitPointerLock | Textmodifier.exitPointerLock API reference}
         */
        exitPointerLock(): void;
    }
}
