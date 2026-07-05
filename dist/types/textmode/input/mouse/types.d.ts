/**
 * Mouse coordinates in grid space using center-based coordinates.
 *
 * The coordinate system matches the main drawing/rendering space:
 * - `(0, 0)` is the center cell of the grid
 * - Negative X values are to the left of center
 * - Positive X values are to the right of center
 * - Negative Y values are above center
 * - Positive Y values are below center
 *
 * When the mouse is outside the grid bounds, both `x` and `y` are set to
 * `Number.NEGATIVE_INFINITY` to indicate an invalid/outside position.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/type-aliases/MousePosition | input.mouse.MousePosition API reference}
 */
export type MousePosition = {
    /**
     * Horizontal grid coordinate.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/type-aliases/MousePosition#x | input.mouse.MousePosition.x API reference}
     */
    x: number;
    /**
     * Vertical grid coordinate.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/type-aliases/MousePosition#y | input.mouse.MousePosition.y API reference}
     */
    y: number;
};
/**
 * Mouse event payload passed to input callbacks.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/interfaces/MouseEventData | input.mouse.MouseEventData API reference}
 */
export interface MouseEventData {
    /**
     * Current mouse position in grid coordinates.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/interfaces/MouseEventData#position | input.mouse.MouseEventData.position API reference}
     */
    position: MousePosition;
    /**
     * Previous mouse position in grid coordinates.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/interfaces/MouseEventData#previousposition | input.mouse.MouseEventData.previousPosition API reference}
     */
    previousPosition: MousePosition;
    /**
     * Mouse button that triggered the event *(for click events)*.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/interfaces/MouseEventData#button | input.mouse.MouseEventData.button API reference}
     */
    button?: number;
    /**
     * Scroll delta for wheel events.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/interfaces/MouseEventData#delta | input.mouse.MouseEventData.delta API reference}
     */
    delta?: {
        /** Scroll delta in X direction. */
        x: number;
        /** Scroll delta in Y direction. */
        y: number;
    };
    /**
     * Original DOM event.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/interfaces/MouseEventData#originalevent | input.mouse.MouseEventData.originalEvent API reference}
     */
    originalEvent: MouseEvent | WheelEvent;
}
/**
 * Mouse event callback signature.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/type-aliases/MouseEventHandler | input.mouse.MouseEventHandler API reference}
 */
export type MouseEventHandler = (data: MouseEventData) => void;
/**
 * Mouse events emitted by the mouse input manager.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/interfaces/MouseEventMap | input.mouse.MouseEventMap API reference}
 */
export interface MouseEventMap {
    /**
     * Fires when the mouse button is clicked (full press + release).
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/interfaces/MouseEventMap#mouseclicked | input.mouse.MouseEventMap.mouseClicked API reference}
     */
    mouseClicked: MouseEventHandler;
    /**
     * Fires when the mouse is double-clicked.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/interfaces/MouseEventMap#doubleclicked | input.mouse.MouseEventMap.doubleClicked API reference}
     */
    doubleClicked: MouseEventHandler;
    /**
     * Fires when a mouse button is pressed down.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/interfaces/MouseEventMap#mousepressed | input.mouse.MouseEventMap.mousePressed API reference}
     */
    mousePressed: MouseEventHandler;
    /**
     * Fires when a mouse button is released.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/interfaces/MouseEventMap#mousereleased | input.mouse.MouseEventMap.mouseReleased API reference}
     */
    mouseReleased: MouseEventHandler;
    /**
     * Fires when the mouse moves over the canvas.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/interfaces/MouseEventMap#mousemoved | input.mouse.MouseEventMap.mouseMoved API reference}
     */
    mouseMoved: MouseEventHandler;
    /**
     * Fires when the mouse moves while a button is held down.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/interfaces/MouseEventMap#mousedragged | input.mouse.MouseEventMap.mouseDragged API reference}
     */
    mouseDragged: MouseEventHandler;
    /**
     * Fires when the mouse wheel is scrolled.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input/namespaces/mouse/interfaces/MouseEventMap#mousescrolled | input.mouse.MouseEventMap.mouseScrolled API reference}
     */
    mouseScrolled: MouseEventHandler;
}
