/**
 * Interface for animation capabilities that will be mixed into Textmodifier
 */
export interface IAnimationMixin {
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
     *
     * // Draw something at the set frame rate
     * t.draw(() => {
     *   t.background(0);
     *   t.char('A');
     *   t.rect(5, 5);
     * });
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
    * const t = textmode.create({ width: 800, height: 600 });
    *
    * // Toggle loop on SPACE
    * t.keyPressed((data) => {
    *   if (data.key === ' ') {
    *     if (t.isLooping()) {
    *       t.noLoop();
    *     } else {
    *       t.loop();
    *     }
    *   }
    * });
    *
    * t.draw(() => {
    *   t.background(0);
    *   t.char('A');
    *   t.charColor(255, 255, 255);
    *   t.rotateZ(t.frameCount * 2);
    *   t.rect(16, 16);
    * });
    * ```
     */
    noLoop(): void;
    /**
     * Resume the rendering loop if it was stopped by {@link noLoop}.
     *
    * @example
    * ```javascript
    * const t = textmode.create({ width: 800, height: 600 });
    *
    * // Toggle loop on SPACE
    * t.keyPressed((data) => {
    *   if (data.key === ' ') {
    *     if (t.isLooping()) {
    *       t.noLoop();
    *     } else {
    *       t.loop();
    *     }
    *   }
    * });
    *
    * t.draw(() => {
    *   t.background(0);
    *   t.char('A');
    *   t.charColor(255, 255, 255);
    *   t.rotateZ(t.frameCount * 2);
    *   t.rect(16, 16);
    * });
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
    * // Press SPACE to manually trigger single frames while loop is paused.
    *
    * const t = textmode.create({ width: 800, height: 600 });
    *
    * let rotation = 0;
    *
    * t.keyPressed((data) => {
    *   if (data.key === ' ') {
    *     rotation += 15; // Increment rotation
    *     t.redraw(); // Manually trigger one frame
    *   }
    * });
    *
    * t.draw(() => {
    *   if(t.frameCount === 1) {
    *     t.noLoop();
    *   }
    *
    *   t.background(0);
    *
    *   t.push();
    *   t.char('A');
    *   t.charColor(100, 200, 255);
    *   t.rotateZ(rotation);
    *   t.rect(13, 13);
    *   t.pop();
    *
    *   // Show instruction text
    *   t.push();
    *   t.translate(-5, -10);
    *   t.charColor(150);
    *   const msg = 'PRESS SPACE';
    *   [...msg].forEach((char, i) => {
    *     t.push();
    *     t.translate(i, 0);
    *     t.char(char);
    *     t.point();
    *     t.pop();
    *   });
    *   t.pop();
    * });
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
     * console.log(textmodifier.isLooping()); // true (looping)
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
