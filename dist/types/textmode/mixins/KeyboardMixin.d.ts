import type { Mixin } from './TextmodifierMixin';
import type { KeyboardEventHandler } from '../managers/KeyboardManager';
/**
 * Capabilities provided by the KeyboardMixin
 */
export interface KeyboardCapabilities {
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
     *   t.point(playerX, playerY);
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
     * t.keyPressed((data) => {
     *   console.log(`Key pressed: ${data.key}`);
     *   if (data.key === 'Enter') {
     *     console.log('Enter key was pressed!');
     *   }
     *   if (data.ctrlKey && data.key === 's') {
     *     console.log('Ctrl+S was pressed!');
     *   }
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
     * t.keyReleased((data) => {
     *   console.log(`Key released: ${data.key}`);
     *   if (data.key === ' ') {
     *     console.log('Spacebar was released!');
     *   }
     * });
     * ```
     */
    keyReleased(callback: KeyboardEventHandler): void;
}
/**
 * Mixin that adds keyboard interaction capabilities to Textmodifier.
 *
 * This is a thin wrapper around KeyboardManager that provides the public API
 * for keyboard interaction. All the actual implementation is handled by the
 * KeyboardManager instance in the TextmodifierContext.
 *
 * Provides p5.js-like keyboard functionality including key state tracking,
 * event callbacks, and special key handling.
 */
export declare const KeyboardMixin: Mixin<KeyboardCapabilities>;
