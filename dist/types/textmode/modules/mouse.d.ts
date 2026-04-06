import type { MouseEventHandler, MousePosition } from '../managers/MouseManager';
declare module '../Textmodifier' {
    interface Textmodifier {
        /**
         * Set a callback function that will be called when the mouse is clicked.
         *
         * @param callback The function to call when the mouse is clicked
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/mouseClicked/sketch.js}
         */
        mouseClicked(callback: MouseEventHandler): void;
        /**
         * Set a callback function that will be called when the mouse is pressed down.
         *
         * @param callback The function to call when the mouse is pressed
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/mousePressed/sketch.js}
         */
        mousePressed(callback: MouseEventHandler): void;
        /**
         * Set a callback function that will be called when the mouse is released.
         *
         * @param callback The function to call when the mouse is released
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/mouseReleased/sketch.js}
         */
        mouseReleased(callback: MouseEventHandler): void;
        /**
         * Set a callback function that will be called when the mouse moves.
         *
         * @param callback The function to call when the mouse moves
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/mouseMoved/sketch.js}
         */
        mouseMoved(callback: MouseEventHandler): void;
        /**
         * Set a callback function that will be called when the mouse wheel is scrolled.
         *
         * @param callback The function to call when the mouse wheel is scrolled
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/mouseScrolled/sketch.js}
         */
        mouseScrolled(callback: MouseEventHandler): void;
        /**
         * Get the current mouse position in center-based grid coordinates.
         *
         * Returns the mouse position as grid cell coordinates where `(0, 0)` is the center cell.
         * This matches the drawing coordinate system, so coordinates can be used directly with `translate()`.
         *
         * If the mouse is outside the grid or the instance is not ready,
         * it returns `{ x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY }`.
         *
         * @example
         * {@includeCode ../../../examples/Textmodifier/mouse/sketch.js}
         */
        readonly mouse: MousePosition;
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
         */
        cursor(cursor?: string): void;
    }
}
