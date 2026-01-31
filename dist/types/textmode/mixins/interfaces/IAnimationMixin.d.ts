/**
 * Interface for animation capabilities that will be mixed into Textmodifier
 */
export interface IAnimationMixin {
    /**
     * Set the target frame rate. If called without arguments, returns the current measured frame rate.
     * @param fps The maximum frames per second for rendering (optional).
     *
     * @example
     * ```javascript
     * // Click to toggle between slow-mo (10fps) and turbo (60fps).
     *
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.mouseClicked(() => {
     *   // Toggle speed
     *   const current = t.frameRate();
     *   t.frameRate(current < 30 ? 60 : 10);
     * });
     *
     * // Drops state
     * const drops = Array(50).fill(0).map(() => ({
     *   x: 0, y: 0, speed: 0, len: 0
     * }));
     *
     * // Reset a drop
     * const resetDrop = (d) => {
     *   d.x = (Math.random() - 0.5) * t.grid.cols;
     *   d.y = -t.grid.rows/2 - Math.random() * 20;
     *   d.speed = 0.5 + Math.random();
     *   d.len = 5 + Math.floor(Math.random() * 10);
     * };
     *
     * t.setup(() => {
     *   drops.forEach(resetDrop);
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
     *
     *   for(const d of drops) {
     *     d.y += d.speed;
     *     if (d.y > t.grid.rows/2) resetDrop(d);
     *
     *     for(let i=0; i<d.len; i++) {
     *       t.push();
     *       t.translate(d.x, d.y - i);
     *
     *       // Head is white, tail is green fading out
     *       if (i == 0) t.charColor(200, 255, 200);
     *       else t.charColor(0, 255, 70, 255 - (i/d.len)*255);
     *
     *       // Random character change
     *       const charIdx = Math.floor(Math.random() * chars.length);
     *       t.char(chars[charIdx]);
     *       t.point();
     *       t.pop();
     *     }
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    frameRate(fps?: number): number | void;
    /**
     * Set or get the target frame rate limit.
     *
     * Works similarly to {@link frameRate}, but gets the target frame rate instead of the current measured frame rate.
     *
     * @param fps Optional new target frame rate. If not provided, returns current target frame rate.
     * @returns Current target frame rate when getting, void when setting
     *
     * @example
     * ```javascript
     * // Target FPS oscillates, warping time perception.
     *
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Oscillate target FPS between 5 and 60
     *   const fps = 32.5 + Math.sin(Date.now() * 0.001) * 27.5;
     *   t.targetFrameRate(fps);
     *
     *   // Pulsating Orb
     *   const pulse = Math.sin(t.frameCount * 0.1) * 10 + 15;
     *
     *   t.charColor(255, 100, 200);
     *   t.char('O');
     *   t.ellipse(pulse, pulse);
     *
     *   t.charColor(255);
     *   t.char('·');
     *   t.ellipse(pulse * 0.7, pulse * 0.7);
     *
     *   // Visual indicator of current target
     *   const barWidth = fps;
     *   t.push();
     *   t.translate(0, t.grid.rows/2 - 2);
     *   t.charColor(0, 255, 100);
     *   t.char('|');
     *   t.rect(barWidth, 1);
     *   t.pop();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    targetFrameRate(fps?: number): number | void;
    /**
     * Get the number of milliseconds since the sketch started running.
     *
     * `millis` keeps track of how long a sketch has been running in milliseconds
     * (thousandths of a second). This information is often helpful for timing events
     * and animations.
     *
     * Time tracking begins before the code in {@link setup} runs. If loading screen is
     * enabled, `millis` begins tracking as soon as the loading screen starts.
     *
     * This property is connected to {@link secs} - setting one will affect the other.
     *
     * @returns Number of milliseconds since starting the sketch.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Calculate a heartbeat pulse every 1000ms
     *   const pulse = (t.millis % 1000) / 1000;
     *
     *   // Ease out effect: rapid expansion then fade
     *   // This uses time to drive animation state
     *   const scale = 1 + Math.sin(pulse * Math.PI) * 0.5;
     *   const alpha = 255 * (1 - pulse);
     *
     *   t.char('•');
     *   t.charColor(255, 50, 50, alpha);
     *
     *   // Draw pulsing heart at center
     *   t.rect(10 * scale, 10 * scale);
     * });
     * ```
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Use millis for smooth animation
     *   const time = t.millis / 1000;
     *   const x = Math.sin(time) * 20 + 40;
     *
     *   t.char('O', Math.floor(x), 10);
     * });
     * ```
     *
     * @example
     * ```javascript
     * // Press SPACE to reset the animation timer.
     *
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.keyPressed((data) => {
     *   if (data.key === ' ') {
     *     // Reset the timer to 0
     *     t.millis = 0;
     *   }
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Create a visual timer bar that fills up every 3 seconds
     *   const duration = 3000;
     *   const elapsed = t.millis;
     *   const progress = (elapsed % duration) / duration;
     *
     *   // Draw bar background
     *   const barWidth = 40;
     *   const barHeight = 4;
     *   const w = barWidth * progress;
     *
     *   // Draw empty background (centered)
     *   t.charColor(64);
     *   t.rect(barWidth, barHeight);
     *
     *   // Draw filling bar
     *   // Calculate center for the filled portion to align it to the left
     *   t.push();
     *   t.translate(-barWidth / 2 + w / 2, 0);
     *   t.char('=');
     *   t.charColor(100, 200, 255);
     *   t.rect(w, barHeight);
     *   t.pop();
     *
     *   // Draw numeric timer above
     *   t.push();
     *   t.translate(0, -5);
     *   t.charColor(255);
     *   // Show seconds with 1 decimal place
     *   const timeString = (elapsed / 1000).toFixed(1) + 's';
     *
     *   // Simple manual text drawing
     *   for(let i=0; i<timeString.length; i++) {
     *     t.push();
     *     t.translate(i, 0);
     *     t.char(timeString[i]);
     *     t.point();
     *     t.pop();
     *   }
     *   t.pop();
     *
     *   t.pop();
     * });
     * ```
     */
    get millis(): number;
    /**
     * Set the elapsed milliseconds by adjusting the internal start time.
     *
     * This allows seeking/scrubbing in animations. Setting `millis` will also
     * affect the value returned by {@link secs} since they are connected.
     *
     * @param value The new elapsed time in milliseconds
     *
     * @example
     * ```javascript
     * // Hold SPACE and move mouse to scrub time.
     *
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Manual Time Scrubbing
     *   if (t.isKeyPressed(' ')) {
     *     // Map mouse position to time (0 to 10 seconds)
     *     // Mouse X is center-based (-cols/2 to +cols/2)
     *     const progress = (t.mouse.x + t.grid.cols / 2) / t.grid.cols;
     *     t.millis = Math.max(0, progress * 10000);
     *     t.cursor('ew-resize');
     *   } else {
     *     t.cursor('default');
     *   }
     *
     *   const time = t.millis;
     *
     *   // Draw a spiral that unwinds with time
     *   const count = 256;
     *   const maxRadius = Math.min(t.grid.cols, t.grid.rows) * 0.4;
     *
     *   for (let i = 0; i < count; i++) {
     *     const pct = i / count;
     *     // Angle rotates with time
     *     const angle = i * 0.5 + time * 0.002;
     *     const r = pct * maxRadius;
     *
     *     const x = Math.cos(angle) * r;
     *     const y = Math.sin(angle) * r;
     *
     *     t.push();
     *     t.translate(x, y);
     *
     *     // Color pulse based on time and index
     *     const hue = (time * 0.1 + i * 5) % 255;
     *     t.charColor(hue, 255 - hue, 200);
     *
     *     t.char(i % 3 === 0 ? 'O' : '.');
     *     t.point();
     *     t.pop();
     *   }
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    set millis(value: number);
    /**
     * Get the number of seconds since the sketch started running.
     *
     * `secs` is a convenience property that returns the elapsed time in seconds
     * instead of milliseconds. Equivalent to `millis / 1000`.
     *
     * Time tracking begins before the code in {@link setup} runs. If loading screen is
     * enabled, `secs` begins tracking as soon as the loading screen starts.
     *
     * This property is connected to {@link millis} - setting one will affect the other.
     *
     * @returns Number of seconds since starting the sketch.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Use secs to drive a smooth sine wave animation
     *   const time = t.secs;
     *   const x = Math.sin(time * 2) * 20;
     *   const y = Math.cos(time * 3) * 10;
     *
     *   t.translate(x, y);
     *   t.char('O');
     *   t.charColor(255, 100, 100);
     *   t.rect(3, 3);
     * });
     * ```
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * // Press SPACE to jump forward in time
     * t.keyPressed((e) => {
     *   if (e.key === ' ') {
     *     t.secs += 2; // Jump 2 seconds ahead
     *   }
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Animation driven by t.secs
     *   const time = t.secs;
     *
     *   // Calculate position based on time (wrapping loop)
     *   const loopDuration = 5; // seconds
     *   const progress = (time % loopDuration) / loopDuration;
     *
     *   // Move from left to right (-cols/2 to +cols/2)
     *   const x = (progress - 0.5) * t.grid.cols;
     *
     *   t.translate(x, 0);
     *   t.char('>');
     *   t.charColor(50, 255, 100);
     *   t.rect(4, 4);
     * });
     * ```
     */
    get secs(): number;
    /**
     * Set the elapsed seconds by adjusting the internal start time.
     *
     * This allows seeking/scrubbing in animations. Setting `secs` will also
     * affect the value returned by {@link millis} since they are connected.
     *
     * @param value The new elapsed time in seconds
     *
     * @example
     * ```javascript
     * // Hold SPACE and drag to manipulate time.
     *
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Interaction: Scrub time
     *   if (t.isKeyPressed(' ')) {
     *     // Map mouse position to a 5-second window
     *     const progress = (t.mouse.x + t.grid.cols / 2) / t.grid.cols;
     *     t.secs = Math.max(0, progress * 5);
     *     t.cursor('grabbing');
     *   } else {
     *     t.cursor('default');
     *   }
     *
     *   const time = t.secs;
     *   const length = Math.min(t.grid.rows, t.grid.cols) * 0.35;
     *   // Pendulum physics (approximate)
     *   const angle = Math.sin(time * 3) * Math.PI * 0.3;
     *
     *   const bobX = Math.sin(angle) * length;
     *   const bobY = Math.cos(angle) * length;
     *
     *   // Draw String
     *   t.charColor(80);
     *   t.char('.');
     *   t.line(0, 0, bobX, bobY);
     *
     *   // Draw "Echoes" of the past
     *   for (let i = 1; i <= 4; i++) {
     *     const lag = i * 0.08;
     *     const echoAngle = Math.sin((time - lag) * 3) * Math.PI * 0.3;
     *     const ex = Math.sin(echoAngle) * length;
     *     const ey = Math.cos(echoAngle) * length;
     *
     *     t.push();
     *     t.translate(ex, ey);
     *     t.charColor(50, 100, 255, 100 - i * 20);
     *     t.char('o');
     *     t.ellipse(6 - i, 6 - i);
     *     t.pop();
     *   }
     *
     *   // Draw Main Bob
     *   t.push();
     *   t.translate(bobX, bobY);
     *   // Hot color when moving fast (center), cool when slow (edges)
     *   const speed = Math.abs(Math.cos(time * 3));
     *   t.charColor(255, 100 + speed * 155, 50);
     *   t.char('O');
     *   t.ellipse(8, 8);
     *   t.pop();
     * });
     *
     * t.windowResized(() => {
     *   t.resizeCanvas(window.innerWidth, window.innerHeight);
     * });
     * ```
     */
    set secs(value: number);
    /**
     * Returns the time in milliseconds between the current frame and the previous frame.
     *
     * `deltaTime()` is useful for creating frame-rate-independent animations. By multiplying
     * velocities and movements by `deltaTime()`, animations will run at consistent speeds
     * regardless of the actual frame rate.
     *
     * @returns Time elapsed between current and previous frame in milliseconds.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * let x = 0;
     * const speed = 0.05; // 0.05 grid units per millisecond
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Update position based on elapsed time for consistent speed
     *   x += speed * t.deltaTime();
     *
     *   // Wrap around screen
     *   if (x > t.grid.cols) x = -10;
     *
     *   // Draw moving object
     *   t.translate(x, t.grid.rows / 2);
     *   t.char('>');
     *   t.charColor(255, 100, 50);
     *   t.rect(4, 2);
     * });
     * ```
     */
    deltaTime(): number;
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
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * // Toggle loop on mouse click
     * t.mousePressed(() => {
     *   if (t.isLooping()) {
     *     t.noLoop();
     *     // Manually trigger one more frame to show "PAUSED"
     *     t.redraw();
     *   } else {
     *     t.loop();
     *   }
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   const isRunning = t.isLooping();
     *
     *   // Shapes are centered by default (origin is 0,0)
     *
     *   if (isRunning) {
     *     // Rotate while running
     *     t.rotateZ(t.frameCount * 5);
     *     t.charColor(0, 255, 100);
     *     t.char('►');
     *   } else {
     *     // Static when paused (using last frameCount)
     *     t.rotateZ(t.frameCount * 5);
     *     t.charColor(255, 100, 100);
     *     t.char('║');
     *   }
     *
     *   t.rect(10, 10);
     * });
     * ```
     */
    isLooping(): boolean;
    /**
     * Get the current frame count.
     *
     * The frame count starts at 0, but is incremented at the beginning of each draw cycle.
     * This means that inside the first call to `draw()`, `frameCount` is 1.
     *
     * This value is useful for timing-based animations, patterns, and state changes.
     *
     * @returns The number of frames rendered since the sketch started.
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Use frameCount to rotate a shape over time
     *   t.translate(0, 0);
     *   t.rotateZ(t.frameCount * 2);
     *   t.char('X');
     *   t.rect(10, 10);
     *
     *   // Create a blinking effect
     *   if (t.frameCount % 60 < 30) {
     *     t.translate(15, 0);
     *     t.char('O');
     *     t.rect(5, 5);
     *   }
     * });
     * ```
     */
    get frameCount(): number;
    /**
     * Set the current frame count.
     *
     * Modifying the frame count can be used to reset animations or jump to a specific
     * point in time-based patterns.
     *
     * @param value The new frame count value.
     *
     * @example
     * ```javascript
     * const t = textmode.create();
     *
     * t.keyPressed((data) => {
     *   // Reset animation when SPACE is pressed
     *   if (data.key === ' ') {
     *     t.frameCount = 0;
     *   }
     * });
     * ```
     */
    set frameCount(value: number);
}
