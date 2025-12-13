import type { MouseEventHandler, MousePosition } from '../../managers/MouseManager';
/**
 * Capabilities provided by the MouseMixin
 */
export interface IMouseMixin {
    /**
     * Set a callback function that will be called when the mouse is clicked.
     *
     * @param callback The function to call when the mouse is clicked
     *
     * @example
     * ```javascript
     * // Click to spawn ripples.
     *
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * // Store ripples as { x, y } in center-based coordinates
     * const ripples = [];
     *
     * // Create a ripple at the clicked grid cell
     * t.mouseClicked((data) => {
     *   // Skip if mouse is outside the grid
     *   if (data.position.x === Number.NEGATIVE_INFINITY) return;
     *
     *   // Coordinates are already center-based, matching the drawing coordinate system
     *   ripples.push({ x: data.position.x, y: data.position.y, age: 0, maxAge: 20 });
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Update and draw ripples (iterate backwards when removing)
     *   for (let i = ripples.length - 1; i >= 0; i--) {
     *     const r = ripples[i];
     *     r.age++;
     *     const life = r.age / r.maxAge;                    // 0..1
     *     const radius = 1 + life * 7;                      // expands from ~1 to ~8
     *     const intensity = Math.round(255 * (1 - life));   // fades out
     *
     *     // Keep cells dark so characters stand out
     *     t.charColor(intensity, intensity, 255);
     *     t.cellColor(0);
     *
     *     t.push();
     *     // position already in center-based coordinates
     *     t.translate(r.x, r.y);
     *
     *     // Draw a ring by sampling points around the circle
     *     for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
     *       const ox = Math.round(Math.cos(a) * radius);
     *       const oy = Math.round(Math.sin(a) * radius);
     *       t.push();
     *       t.translate(ox, oy);
     *       t.char('*');
     *       t.point();
     *       t.pop();
     *     }
     *
     *     t.pop();
     *
     *     // Remove finished ripples
     *     if (r.age > r.maxAge) {
     *       ripples.splice(i, 1);
     *     }
     *   }
     *
     *   // Show crosshair for the current mouse cell
     *   // Mouse coordinates are center-based, matching the drawing coordinate system
     *   if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
     *     t.push();
     *     t.charColor(180);
     *     t.translate(t.mouse.x, t.mouse.y);
     *     t.char('+');
     *     t.point();
     *     t.pop();
     *   }
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
     * // Hold mouse to spray particles that fall with gravity.
     *
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * const particles = [];
     * let pressing = false;
     *
     * t.mousePressed((data) => {
     *   if (data.position.x === Number.NEGATIVE_INFINITY) return;
     *   pressing = true;
     * });
     *
     * t.mouseReleased(() => {
     *   pressing = false;
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Spawn particles while pressing (mouse coords are center-based)
     *   if (pressing && t.mouse.x !== Number.NEGATIVE_INFINITY) {
     *     const cx = t.mouse.x;
     *     const cy = t.mouse.y;
     *
     *     for (let i = 0; i < 3; i++) {
     *       particles.push({
     *         x: cx,
     *         y: cy,
     *         vx: (Math.random() - 0.5) * 0.8,
     *         vy: Math.random() * -0.5 - 0.2,
     *         age: 0,
     *         maxAge: 30 + Math.random() * 20
     *       });
     *     }
     *   }
     *
     *   // Update and draw particles
     *   for (let i = particles.length - 1; i >= 0; i--) {
     *     const p = particles[i];
     *     p.age++;
     *     p.vy += 0.08; // gravity
     *     p.x += p.vx;
     *     p.y += p.vy;
     *
     *     if (p.age >= p.maxAge) {
     *       particles.splice(i, 1);
     *       continue;
     *     }
     *
     *     const life = 1 - (p.age / p.maxAge);
     *     const brightness = Math.round(255 * life);
     *
     *     t.push();
     *     t.charColor(brightness, brightness * 0.7, 100);
     *     t.translate(Math.round(p.x), Math.round(p.y));
     *     t.char(life > 0.5 ? 'o' : '.');
     *     t.point();
     *     t.pop();
     *   }
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
     * // Drag to draw lines that fade over time.
     *
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * const lines = [];
     * let dragStart = null;
     *
     * t.mousePressed((data) => {
     *   if (data.position.x === Number.NEGATIVE_INFINITY) return;
     *   // Coordinates are already center-based
     *   dragStart = { x: data.position.x, y: data.position.y };
     * });
     *
     * t.mouseReleased((data) => {
     *   if (!dragStart || data.position.x === Number.NEGATIVE_INFINITY) return;
     *   const cx = data.position.x;
     *   const cy = data.position.y;
     *
     *   // Calculate line center and local endpoints
     *   const centerX = (dragStart.x + cx) / 2;
     *   const centerY = (dragStart.y + cy) / 2;
     *   const dx = cx - dragStart.x;
     *   const dy = cy - dragStart.y;
     *
     *   lines.push({
     *     cx: centerX, cy: centerY,
     *     dx: dx, dy: dy,
     *     age: 0, maxAge: 30
     *   });
     *   dragStart = null;
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Draw stored lines with fade
     *   for (let i = lines.length - 1; i >= 0; i--) {
     *     const ln = lines[i];
     *     ln.age++;
     *
     *     if (ln.age >= ln.maxAge) {
     *       lines.splice(i, 1);
     *       continue;
     *     }
     *
     *     const life = 1 - (ln.age / ln.maxAge);
     *     const brightness = Math.round(150 * life);
     *
     *     t.push();
     *     t.charColor(brightness, brightness, 255);
     *     t.char('-');
     *     t.lineWeight(2);
     *     t.translate(ln.cx, ln.cy);
     *     t.line(-ln.dx / 2, -ln.dy / 2, ln.dx / 2, ln.dy / 2);
     *     t.pop();
     *   }
     *
     *   // Draw current drag line (mouse coords are center-based)
     *   if (dragStart && t.mouse.x !== Number.NEGATIVE_INFINITY) {
     *     const cx = t.mouse.x;
     *     const cy = t.mouse.y;
     *     const centerX = (dragStart.x + cx) / 2;
     *     const centerY = (dragStart.y + cy) / 2;
     *     const dx = cx - dragStart.x;
     *     const dy = cy - dragStart.y;
     *
     *     t.push();
     *     t.charColor(255, 200, 0);
     *     t.char('o');
     *     t.lineWeight(2);
     *     t.translate(centerX, centerY);
     *     t.line(-dx / 2, -dy / 2, dx / 2, dy / 2);
     *     t.pop();
     *   }
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
     * // Trail of particles following the mouse.
     *
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * const trail = [];
     * const maxTrail = 120;
     * let lastMouse = null;
     *
     * t.mouseMoved((data) => {
     *   if (data.position.x === Number.NEGATIVE_INFINITY) return;
     *
     *   // Coordinates are already center-based, matching the drawing system
     *   const cx = data.position.x;
     *   const cy = data.position.y;
     *
     *   // Spawn multiple particles based on movement speed
     *   const dx = lastMouse ? cx - lastMouse.x : 0;
     *   const dy = lastMouse ? cy - lastMouse.y : 0;
     *   const speed = Math.sqrt(dx * dx + dy * dy);
     *   const count = Math.max(1, Math.ceil(speed * 1.5));
     *
     *   for (let i = 0; i < count; i++) {
     *     trail.push({
     *       x: cx,
     *       y: cy,
     *       age: 0,
     *       maxAge: 15 + Math.random() * 10
     *     });
     *   }
     *
     *   lastMouse = { x: cx, y: cy };
     *   if (trail.length > maxTrail) trail.splice(0, trail.length - maxTrail);
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Draw and age particles
     *   for (let i = trail.length - 1; i >= 0; i--) {
     *     const p = trail[i];
     *     p.age++;
     *
     *     if (p.age >= p.maxAge) {
     *       trail.splice(i, 1);
     *       continue;
     *     }
     *
     *     const life = 1 - (p.age / p.maxAge);
     *     const brightness = Math.round(255 * life);
     *     const chars = ['.', '*', 'o', '@'];
     *     const idx = Math.floor(life * chars.length);
     *
     *     t.push();
     *     t.charColor(brightness, brightness * 0.6, 255);
     *     t.translate(p.x, p.y);
     *     t.char(chars[Math.min(idx, chars.length - 1)]);
     *     t.point();
     *     t.pop();
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
     * // Scroll to create expanding rings.
     *
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * const rings = [];
     *
     * t.mouseScrolled((data) => {
     *   if (data.position.x === Number.NEGATIVE_INFINITY) return;
     *
     *   // Coordinates are already center-based
     *   const cx = data.position.x;
     *   const cy = data.position.y;
     *
     *   // Use scroll delta to determine ring intensity and direction
     *   const scrollSpeed = 2;
     *   const intensity = Math.min(scrollSpeed * 30, 255);
     *   const scrollDown = (data.delta?.y || 0) > 0;
     *
     *   rings.push({
     *     x: cx,
     *     y: cy,
     *     radius: 1,
     *     maxRadius: 5 + scrollSpeed * 0.5,
     *     color: intensity,
     *     scrollDown: scrollDown,
     *     age: 0,
     *     maxAge: 20
     *   });
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Update and draw rings
     *   for (let i = rings.length - 1; i >= 0; i--) {
     *     const r = rings[i];
     *     r.age++;
     *     r.radius += (r.maxRadius - r.radius) * 0.15;
     *
     *     if (r.age >= r.maxAge) {
     *       rings.splice(i, 1);
     *       continue;
     *     }
     *
     *     const life = 1 - (r.age / r.maxAge);
     *     const brightness = Math.round(r.color * life);
     *
     *     t.push();
     *     // Blue for scroll down, orange for scroll up
     *     if (r.scrollDown) {
     *       t.charColor(brightness * 0.5, brightness * 0.8, 255);
     *     } else {
     *       t.charColor(255, brightness * 0.6, brightness * 0.3);
     *     }
     *     t.translate(r.x, r.y);
     *
     *     // Draw ring
     *     for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
     *       const ox = Math.round(Math.cos(a) * r.radius);
     *       const oy = Math.round(Math.sin(a) * r.radius);
     *       t.push();
     *       t.translate(ox, oy);
     *       t.char('o');
     *       t.point();
     *       t.pop();
     *     }
     *     t.pop();
     *   }
     * });
     * ```
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
     * ```javascript
     * const t = textmode.create({ width: 800, height: 600 });
     *
     * t.draw(() => {
     *     t.background(0);
     *
     *     // Mouse coordinates are center-based, matching the drawing system
     *     if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
     *         t.translate(t.mouse.x, t.mouse.y);
     *         t.char('*');
     *         t.charColor(255, 0, 0);
     *         t.cellColor(100);
     *         t.point();
     *     }
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
     * const t = textmode.create({ width: 800, height: 600 });
     * const target = { width: 30, height: 15 };
     *
     * t.draw(() => {
     *   t.background(0);
     *   t.charColor(255); // keep char visible
     *   t.char('*');
     *   t.rect(target.width, target.height);
     *
     *   // Rectangle is centered at (0, 0) which is grid center
     *   // Mouse coordinates are also center-based, so we can compare directly
     *   const halfRectWidth = target.width / 2;
     *   const halfRectHeight = target.height / 2;
     *
     *   const hovering =
     *     t.mouse.x !== Number.NEGATIVE_INFINITY &&
     *     t.mouse.x >= -halfRectWidth && t.mouse.x < halfRectWidth &&
     *     t.mouse.y >= -halfRectHeight && t.mouse.y < halfRectHeight;
     *
     *   t.cursor(hovering ? 'pointer' : 'default');
     * });
     * ```
     */
    cursor(cursor?: string): void;
}
