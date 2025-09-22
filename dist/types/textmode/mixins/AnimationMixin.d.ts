import type { Mixin } from './TextmodifierMixin';
/**
 * Interface for animation capabilities that will be mixed into Textmodifier
 */
export interface AnimationCapabilities {
    /**
     * Set the maximum frame rate. If called without arguments, returns the current measured frame rate.
     * @param fps The maximum frames per second for rendering.
     *
     * @example
     * ```javascript
     * // Create a Textmodifier instance
     * const textmodifier = textmode.create();
     *
     * // Set the maximum frame rate to 30 FPS
     * textmodifier.frameRate(30);
     * ```
     */
    frameRate(fps?: number): number | void;
    /**
     * Stop the automatic rendering loop.
     *
     * This method pauses the render loop without, allowing
     * it to be resumed later with {@link loop}. This is useful for temporarily pausing
     * animation while maintaining the ability to continue it.
     *
     * @example
     * ```javascript
     * // Create a textmodifier instance in auto mode
     * const textmodifier = textmode.create();
     *
     * // The render loop is running by default
     * console.log(textmodifier.isLooping()); // true
     *
     * // Stop the automatic rendering loop
     * textmodifier.noLoop();
     * console.log(textmodifier.isLooping()); // false
     *
     * // Resume the rendering loop
     * textmodifier.loop();
     * console.log(textmodifier.isLooping()); // true
     * ```
     */
    noLoop(): void;
    /**
     * Resume the rendering loop if it was stopped by {@link noLoop}.
     *
     * @example
     * ```javascript
     * // Create a textmodifier instance
     * const textmodifier = textmode.create();
     *
     * // Stop the loop
     * textmodifier.noLoop();
     *
     * // Resume the loop
     * textmodifier.loop();
     *
     * // You can also use this pattern for conditional animation
     * if (someCondition) {
     *   textmodifier.loop();
     * } else {
     *   textmodifier.noLoop();
     * }
     * ```
     */
    loop(): void;
    /**
     * Execute the render function a specified number of times.
     *
     * This method is useful when the render loop has been stopped with {@link noLoop},
     * allowing you to trigger rendering on demand.
     *
     * @param n The number of times to execute the render function. Defaults to 1.
     *
     * @example
     * ```javascript
     * // Create a textmodifier instance
     * const textmodifier = textmode.create();
     *
     * // Set up drawing
     * textmodifier.draw(() => {
     *   textmodifier.background(0);
     *
     *   textmodifier.char("A");
     *   textmodifier.charColor(255, 0, 0);
     *   textmodifier.rect(10, 10, 50, 50);
     * });
     *
     * textmodifier.noLoop();
     * textmodifier.redraw(3); // Render 3 times despite loop being stopped
     * ```
     */
    redraw(n?: number): void;
    /**
     * Check whether the textmodifier is currently running the automatic render loop.
     * @returns True if the render loop is currently active, false otherwise.
     *
     * @example
     * ```javascript
     * const textmodifier = textmode.create(canvas);
     *
     * // Check loop status in different states
     * console.log(textmodifier.isLooping()); // true (looping)
     *
     * textmodifier.noLoop();
     * console.log(textmodifier.isLooping()); // false (not looping)
     *
     * textmodifier.loop();
     * console.log(textmodifier.isLooping()); // true (alooping)
     * ```
     */
    isLooping(): boolean;
    /**
     * Get the current frame count.
     */
    get frameCount(): number;
    /**
     * Set the current frame count.
     */
    set frameCount(value: number);
}
/**
 * Mixin that adds animation capabilities to a class
 * @param Base The base class to extend
 * @returns Extended class with animation capabilities
 */
export declare const AnimationMixin: Mixin<AnimationCapabilities>;
