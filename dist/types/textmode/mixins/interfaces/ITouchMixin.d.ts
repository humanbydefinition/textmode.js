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
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * const ripples = [];
     *
     * t.touchStarted((data) => {
     *   // Spawn a ripple at touch location with random color
     *   ripples.push({
     *     x: data.touch.x,
     *     y: data.touch.y,
     *     r: Math.random() * 255,
     *     g: Math.random() * 255,
     *     b: Math.random() * 255,
     *     startFrame: t.frameCount
     *   });
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Update and draw ripples
     *   for (let i = ripples.length - 1; i >= 0; i--) {
     *     const ripple = ripples[i];
     *     const age = t.frameCount - ripple.startFrame;
     *     const size = age * 0.5;
     *     const alpha = Math.max(0, 255 - age * 4);
     *
     *     if (alpha <= 0) {
     *       ripples.splice(i, 1);
     *       continue;
     *     }
     *
     *     t.push();
     *     t.translate(ripple.x, ripple.y);
     *     t.char('O');
     *     t.charColor(ripple.r, ripple.g, ripple.b, alpha);
     *     t.ellipse(size, size);
     *     t.pop();
     *   }
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
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * // Position of our draggable object
     * let posX = 0;
     * let posY = 0;
     *
     * t.touchMoved((data) => {
     *   const { touch, previousTouch } = data;
     *
     *   // If we have history, calculate the delta and move the object
     *   if (previousTouch) {
     *     posX += touch.x - previousTouch.x;
     *     posY += touch.y - previousTouch.y;
     *   }
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Draw the object at its current position
     *   t.push();
     *   t.translate(posX, posY);
     *
     *   // Visual flair: color changes based on position
     *   const r = Math.abs(Math.sin(posX * 0.05)) * 255;
     *   const b = Math.abs(Math.cos(posY * 0.05)) * 255;
     *   t.charColor(r, 200, b);
     *
     *   t.char('◈');
     *   t.rect(8, 8);
     *   t.pop();
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
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * const ghosts = [];
     *
     * t.touchEnded((data) => {
     *   // Record where touch ended to show a fading "ghost"
     *   ghosts.push({
     *     x: data.touch.x,
     *     y: data.touch.y,
     *     alpha: 255
     *   });
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Draw and update ghosts
     *   for (let i = ghosts.length - 1; i >= 0; i--) {
     *     const g = ghosts[i];
     *
     *     t.push();
     *     t.translate(g.x, g.y);
     *     t.char('○');
     *     t.charColor(255, 100, 100, g.alpha);
     *     t.ellipse(10, 10);
     *     t.pop();
     *
     *     g.alpha -= 10;
     *     if (g.alpha <= 0) ghosts.splice(i, 1);
     *   }
     *
     *   if (ghosts.length === 0) {
     *     t.charColor(100);
     *     t.char('?');
     *     t.rect(1, 1);
     *   }
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
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * let msg = 'OK';
     * let colorIntensity = 100;
     *
     * t.touchStarted(() => { msg = 'TOUCH'; colorIntensity = 200; });
     * t.touchEnded(() => { msg = 'OK'; colorIntensity = 100; });
     *
     * // Cancellation happens when browser interrupts (e.g. alt-tab)
     * t.touchCancelled((data) => {
     *   msg = 'CANCEL';
     *   colorIntensity = 0; // Red
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Draw status indicator
     *   t.char(msg.charAt(0));
     *   t.charColor(255, colorIntensity, colorIntensity);
     *   t.rotateZ(t.frameCount * 0.1);
     *   t.rect(15, 15);
     *
     *   // Reset if cancelled after a while
     *   if (msg === 'CANCEL' && t.frameCount % 60 === 0) {
     *       msg = 'OK';
     *       colorIntensity = 100;
     *   }
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
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * const markers = [];
     *
     * // Add a temporary marker where the user taps
     * t.tap((data) => {
     *   markers.push({
     *     x: data.touch.x,
     *     y: data.touch.y,
     *     life: 60
     *   });
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Draw markers at their tapped positions
     *   for (let i = markers.length - 1; i >= 0; i--) {
     *     const m = markers[i];
     *
     *     t.push();
     *     // Coordinates are already relative to center!
     *     t.translate(m.x, m.y);
     *
     *     const alpha = (m.life / 60) * 255;
     *     t.char('X');
     *     t.charColor(255, 100, 100, alpha);
     *     t.rect(3, 3);
     *     t.pop();
     *
     *     m.life--;
     *     if (m.life <= 0) markers.splice(i, 1);
     *   }
     *
     *   if (markers.length === 0) {
     *      t.charColor(100);
     *      t.char('?');
     *      t.rect(1, 1);
     *   }
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
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * let pulse = 0;
     * let activeColor = t.color(100, 200, 255);
     *
     * t.doubleTap((data) => {
     *   // Trigger visual feedback at the tap location
     *   pulse = 20;
     *   // Randomize color
     *   activeColor = t.color(Math.random() * 255, 200, Math.random() * 255);
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Animate pulse
     *   if (pulse > 0) pulse--;
     *
     *   // Draw central interactive box
     *   t.char('▓');
     *   t.charColor(activeColor);
     *
     *   const size = 15 + pulse;
     *   t.rect(size, size);
     *
     *   // Draw visual echo if pulsing
     *   if (pulse > 0) {
     *     t.push();
     *     t.char('░');
     *     t.charColor(255, 255, 255, pulse * 12);
     *     t.rect(size + 5, size + 5);
     *     t.pop();
     *   }
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
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * const bursts = [];
     *
     * t.longPress((data) => {
     *   // Spawn an expanding energy burst at the long press location
     *   bursts.push({
     *     x: data.touch.x,
     *     y: data.touch.y,
     *     life: 0
     *   });
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Animate bursts
     *   for (let i = bursts.length - 1; i >= 0; i--) {
     *     const b = bursts[i];
     *     b.life += 1;
     *
     *     t.push();
     *     t.translate(b.x, b.y);
     *     t.rotateZ(b.life * 5);
     *
     *     const size = b.life * 1.5;
     *     const alpha = Math.max(0, 255 - b.life * 4);
     *
     *     t.char('☼');
     *     t.charColor(255, 200, 100, alpha);
     *     t.rect(size, size);
     *     t.pop();
     *
     *     if (b.life > 60) bursts.splice(i, 1);
     *   }
     *
     *   if (bursts.length === 0) {
     *     t.charColor(100);
     *     t.char('?');
     *     t.rect(1, 1);
     *   }
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
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * let arrow = '•';
     * let r = 128, g = 128, b = 128;
     *
     * t.swipe((data) => {
     *   // Update visual state based on swipe direction
     *   switch (data.direction) {
     *     case 'up':    arrow = '▲'; r = 255; g = 100; b = 100; break;
     *     case 'down':  arrow = '▼'; r = 100; g = 255; b = 100; break;
     *     case 'left':  arrow = '◀'; r = 100; g = 100; b = 255; break;
     *     case 'right': arrow = '▶'; r = 255; g = 255; b = 100; break;
     *   }
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Pulse effect
     *   const size = 8 + Math.sin(t.frameCount * 0.1) * 2;
     *
     *   // Draw the direction indicator
     *   t.char(arrow);
     *   t.charColor(r, g, b);
     *   t.rect(size, size);
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
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * let currentScale = 1.0;
     *
     * // Handle pinch gestures to zoom
     * t.pinch((data) => {
     *   // Limit scale between 0.5x and 5x
     *   currentScale = Math.max(0.5, Math.min(5.0, data.scale));
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Draw a shape scaled by the pinch gesture
     *   const size = 20 * currentScale;
     *
     *   t.char('▒');
     *   t.charColor(255, 100 + currentScale * 20, 150);
     *   t.rect(size, size);
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
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * let rotation = 0;
     *
     * t.rotateGesture((data) => {
     *   // Accumulate the delta rotation (in degrees)
     *   rotation += data.deltaRotation;
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Rotate the coordinate system by the accumulated angle
     *   t.rotateZ(rotation);
     *
     *   // Draw a "dial" or "gear" shape
     *   t.char('☼');
     *   t.charColor(100, 255, 200);
     *   t.rect(20, 20);
     *
     *   // Add a marker to make rotation obvious
     *   t.push();
     *   t.translate(15, 0); // Offset from center
     *   t.char('•');
     *   t.charColor(255, 100, 100);
     *   t.rect(5, 5);
     *   t.pop();
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
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Visualize all active touches
     *   for (const touch of t.touches) {
     *     t.push();
     *     // touch.x and touch.y are already center-relative
     *     t.translate(touch.x, touch.y);
     *
     *     const pulse = 1 + Math.sin(t.frameCount * 0.2) * 0.5;
     *     const radius = (touch.pressure || 0.5) * 20 * pulse;
     *
     *     // Draw glowing ring
     *     t.char('○');
     *     t.charColor(255, 100, 150);
     *     t.ellipse(radius, radius);
     *
     *     // Draw center point with ID digit
     *     t.char((touch.id % 9 + 1).toString());
     *     t.charColor(255);
     *     t.point();
     *
     *     t.pop();
     *   }
     *
     *   // Hint text if no touches
     *   if (t.touches.length === 0) {
     *     t.char('?');
     *     t.charColor(80);
     *     t.point();
     *   }
     * });
     * ```
     */
    get touches(): TouchPosition[];
}
