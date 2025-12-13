import type { KeyboardEventHandler } from '../../managers/KeyboardManager';
/**
 * Capabilities provided by the KeyboardMixin
 */
export interface IKeyboardMixin {
    /**
     * Check if a specific key is currently being pressed.
     *
     * @param key The key to check (e.g., 'a', 'Enter', 'ArrowLeft')
     * @returns true if the key is currently pressed, false otherwise
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * let playerX = 0;
     * let playerY = 0;
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Check for arrow keys to move a character
     *   if (t.isKeyPressed('ArrowUp')) {
     *     playerY -= 1;
     *   }
     *   if (t.isKeyPressed('ArrowDown')) {
     *     playerY += 1;
     *   }
     *   if (t.isKeyPressed('ArrowLeft')) {
     *     playerX -= 1;
     *   }
     *   if (t.isKeyPressed('ArrowRight')) {
     *     playerX += 1;
     *   }
     *
     *   // Draw player character
     *   t.char('@');
     *   t.charColor(255, 255, 0);
     *   t.translate(playerX, playerY);
     *   t.point();
     * });
     * ```
     */
    isKeyPressed(key: string): boolean;
    /**
     * Set a callback function that will be called when a key is pressed down.
     *
     * @param callback The function to call when a key is pressed
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * let lastKey = '?';
     * let pulse = 0;
     *
     * // Update some visual state when a key is pressed
     * t.keyPressed((data) => {
     *   lastKey = data.key;
     *   pulse = 6; // make the next frames brighter
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Fade brightness back down each frame
     *   const glow = Math.max(0, pulse--);
     *   const brightness = 120 + glow * 20;
     *   t.charColor(brightness, brightness, 0);
     *
     *   // Show the last pressed key at the center of the grid
     *   t.push();
     *   t.char(lastKey.length ? lastKey[0] : '?');
     *   t.point();
     *   t.pop();
     * });
     * ```
     */
    keyPressed(callback: KeyboardEventHandler): void;
    /**
     * Set a callback function that will be called when a key is released.
     *
     * @param callback The function to call when a key is released
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * let lastRelease = '?';
     * let fade = 0;
     *
     * // Capture the most recent key release and trigger a pulse
     * t.keyReleased((data) => {
     *   lastRelease = data.key;
     *   fade = 10;
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Dim the glow over time
     *   const glow = Math.max(0, fade--);
     *   const color = 80 + glow * 17;
     *   t.charColor(color, color, 255);
     *
     *   t.char(lastRelease.length ? lastRelease[0] : '?');
     *   t.point();
     * });
     * ```
     */
    keyReleased(callback: KeyboardEventHandler): void;
    /**
     * Get the last key that was pressed.
     *
     * Returns the key string of the last pressed key, or null if no key has been pressed.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const lastKey = t.lastKeyPressed;
     *   if (lastKey) {
     *     // Display the last pressed key
     *     t.char(lastKey);
     *     t.charColor(255, 255, 255);
     *     t.point();
     *   }
     * });
     * ```
     */
    get lastKeyPressed(): string | null;
    /**
     * Get the last key that was released.
     *
     * Returns the key string of the last released key, or null if no key has been released.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const lastKey = t.lastKeyReleased;
     *   if (lastKey) {
     *     // Display the last released key
     *     t.char(lastKey);
     *     t.charColor(128, 128, 128);
     *     t.point();
     *   }
     * });
     * ```
     */
    get lastKeyReleased(): string | null;
    /**
     * Get all currently pressed keys.
     *
     * Returns an array of key strings that are currently being held down.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *     t.background(0);
     *
     *     const pressed = t.pressedKeys;
     *
     *     // Display all currently pressed keys
     *     pressed.forEach((key, index) => {
     *         t.push();
     *         t.char(key[0] || '?'); // Show first character of key name
     *         t.charColor(255, 200, 100);
     *         t.translate(index, 0);
     *         t.point();
     *         t.pop();
     *     });
     * });
     * ```
     */
    get pressedKeys(): string[];
    /**
     * Get current modifier key states.
     *
     * Returns an object with boolean properties for each modifier key.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *     t.background(0);
     *     const mods = t.modifierState;
     *
     *     // Change behavior based on modifier keys
     *     if (mods.shift) {
     *         // Draw in caps or with different behavior
     *         t.char('S');
     *         t.charColor(255, 255, 0);
     *         t.point();
     *     }
     *
     *     if (mods.ctrl) {
     *         // Control key is pressed
     *         t.translate(2, 0);
     *         t.char('C');
     *         t.charColor(0, 255, 255);
     *         t.point();
     *     }
     * });
     * ```
     */
    get modifierState(): {
        /**
         * Whether the Ctrl key is currently pressed
         */
        ctrl: boolean;
        /**
         * Whether the Shift key is currently pressed
         */
        shift: boolean;
        /**
         * Whether the Alt key is currently pressed
         */
        alt: boolean;
        /**
         * Whether the Meta key *(Command on Mac, Windows key on Windows)* is currently pressed
         */
        meta: boolean;
    };
}
