import type { Mixin } from './TextmodifierMixin';
import type { MouseEventHandler, MousePosition } from '../managers/MouseManager';
/**
 * Capabilities provided by the MouseMixin
 */
export interface MouseCapabilities {
    /**
     * Set a callback function that will be called when the mouse is clicked.
     *
     * @param callback The function to call when the mouse is clicked
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.mouseClicked((data) => {
     *   console.log(`Clicked at grid position: ${data.position.x}, ${data.position.y}`);
     *   console.log(`Button: ${data.button}`); // 0=left, 1=middle, 2=right
     * });
     * ```
     */
    mouseClicked(callback: MouseEventHandler): void;
    /**
     * Set a callback function that will be called when the mouse is pressed down.
     *
     * @param callback The function to call when the mouse is pressed
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.mousePressed((data) => {
     *   console.log(`Mouse pressed at: ${data.position.x}, ${data.position.y}`);
     * });
     * ```
     */
    mousePressed(callback: MouseEventHandler): void;
    /**
     * Set a callback function that will be called when the mouse is released.
     *
     * @param callback The function to call when the mouse is released
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.mouseReleased((data) => {
     *   console.log(`Mouse released at: ${data.position.x}, ${data.position.y}`);
     * });
     * ```
     */
    mouseReleased(callback: MouseEventHandler): void;
    /**
     * Set a callback function that will be called when the mouse moves.
     *
     * @param callback The function to call when the mouse moves
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.mouseMoved((data) => {
     *   if (data.position.x !== -1 && data.position.y !== -1) {
     *     console.log(`Mouse moved to: ${data.position.x}, ${data.position.y}`);
     *     console.log(`Previous position: ${data.previousPosition.x}, ${data.previousPosition.y}`);
     *   }
     * });
     * ```
     */
    mouseMoved(callback: MouseEventHandler): void;
    /**
     * Set a callback function that will be called when the mouse wheel is scrolled.
     *
     * @param callback The function to call when the mouse wheel is scrolled
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.mouseScrolled((data) => {
     *   console.log(`Mouse scrolled at: ${data.position.x}, ${data.position.y}`);
     *   console.log(`Scroll delta: ${data.delta?.x}, ${data.delta?.y}`);
     * });
     * ```
     */
    mouseScrolled(callback: MouseEventHandler): void;
    /**
     * Get the current mouse position in grid coordinates.
     *
     * Returns the mouse position as grid cell coordinates *(column, row)*.
     *
     * If the mouse is outside the grid or the instance is not ready,
     * it returns `{ x: -1, y: -1 }`.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   const mousePos = t.mouse;
     *
     *   if (mousePos.x !== -1 && mousePos.y !== -1) {
     *     // Mouse is over the grid
     *     t.char('*');
     *     t.charColor(255, 0, 0);
     *     t.point(mousePos.x, mousePos.y);
     *   }
     * });
     * ```
     */
    get mouse(): MousePosition;
    /**
     * Set the mouse cursor for the textmode canvas.
     *
     * Provide any valid CSS cursor value (e.g. 'default', 'pointer', 'crosshair', 'move', 'text', 'grab', 'grabbing',
     * 'none', 'zoom-in', 'zoom-out', 'ns-resize', 'ew-resize', 'nwse-resize', 'nesw-resize', etc.),
     * or a CSS `url(...)` cursor. Call with no argument or an empty string to reset to default.
     *
     * See MDN for all options: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
     *
     * @example
     * ```javascript
     * t.cursor('crosshair');
     * // ... later, reset:
     * t.cursor();
     * ```
     */
    cursor(cursor?: string): void;
}
/**
 * Mixin that adds mouse tracking capabilities to Textmodifier.
 *
 * This is a thin wrapper around MouseManager that provides the public API
 * for mouse interaction. All the actual implementation is handled by the
 * MouseManager instance in the TextmodifierContext.
 */
export declare const MouseMixin: Mixin<MouseCapabilities>;
