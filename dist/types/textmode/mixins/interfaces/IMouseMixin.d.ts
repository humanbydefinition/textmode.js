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
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * const echoes = [];
     *
     * t.mouseClicked((data) => {
     *   if (data.position.x === Number.NEGATIVE_INFINITY) return;
     *   // Add a new sonar echo at the clicked position (center-based coords)
     *   echoes.push({ x: data.position.x, y: data.position.y, age: 0 });
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Render all active echoes
     *   for (let i = 0; i < echoes.length; i++) {
     *     const e = echoes[i];
     *     e.age += 1;
     *     const maxAge = 60;
     *
     *     if (e.age > maxAge) {
     *       echoes.splice(i, 1);
     *       continue;
     *     }
     *
     *     t.push();
     *     t.translate(e.x, e.y);
     *
     *     const progress = e.age / maxAge;
     *     const radius = progress * 30;
     *     const alpha = 255 * (1 - progress);
     *
     *     t.charColor(100, 200, 255, alpha);
     *     t.char('○');
     *     t.ellipse(radius, radius);
     *
     *     // Inner after-shock
     *     if (progress > 0.2) {
     *       t.charColor(50, 100, 255, alpha * 0.5);
     *       t.char('·');
     *       t.ellipse(radius * 0.6, radius * 0.6);
     *     }
     *     t.pop();
     *   }
     *
     *   // Crosshair at mouse
     *   if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
     *     t.push();
     *     t.translate(t.mouse.x, t.mouse.y);
     *     t.char('+');
     *     t.charColor(255);
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
    mouseClicked(callback: MouseEventHandler): void;
    /**
     * Set a callback function that will be called when the mouse is pressed down.
     *
     * @param callback The function to call when the mouse is pressed
     *
     * @example
     * ```javascript
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * let isPressing = false;
     * const particles = [];
     *
     * t.mousePressed(() => isPressing = true);
     * t.mouseReleased(() => isPressing = false);
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Emit particles while mouse is held
     *   if (isPressing && t.mouse.x !== Number.NEGATIVE_INFINITY) {
     *     for(let k=0; k<5; k++) { // Spawn rate
     *       const angle = Math.random() * Math.PI * 2;
     *       const speed = Math.random() * 0.5 + 0.2;
     *       particles.push({
     *         x: t.mouse.x,
     *         y: t.mouse.y,
     *         vx: Math.cos(angle) * speed,
     *         vy: Math.sin(angle) * speed,
     *         life: 1.0
     *       });
     *     }
     *   }
     *
     *   // Update and draw
     *   for (let i = particles.length - 1; i >= 0; i--) {
     *     const p = particles[i];
     *     p.x += p.vx;
     *     p.y += p.vy;
     *     p.life -= 0.02;
     *
     *     if (p.life <= 0) {
     *       particles.splice(i, 1);
     *       continue;
     *     }
     *
     *     t.push();
     *     t.translate(p.x, p.y);
     *     const chars = ['.', 'o', '*', '@'];
     *     t.char(chars[Math.floor(p.life * 3.99)]);
     *     t.charColor(255, p.life * 255, 100); // Yellow to Red fade
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
     * const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
     *
     * const trail = [];
     * let prev = null;
     *
     * t.mouseMoved((data) => {
     *   if (data.position.x === Number.NEGATIVE_INFINITY) return;
     *
     *   const x = data.position.x;
     *   const y = data.position.y;
     *
     *   // Calculate velocity
     *   const dx = prev ? x - prev.x : 0;
     *   const dy = prev ? y - prev.y : 0;
     *   prev = { x, y };
     *
     *   // Spawn particle with inertia
     *   trail.push({
     *     x: x, y: y,
     *     vx: dx * 0.2 + (Math.random() - 0.5),
     *     vy: dy * 0.2 + (Math.random() - 0.5),
     *     life: 1.0,
     *     char: ['+', '*', '.', '·'][Math.floor(Math.random() * 4)]
     *   });
     * });
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   for (let i = trail.length - 1; i >= 0; i--) {
     *     const p = trail[i];
     *     p.x += p.vx;
     *     p.y += p.vy;
     *     p.life -= 0.02;
     *
     *     if (p.life <= 0) {
     *       trail.splice(i, 1);
     *       continue;
     *     }
     *
     *     t.push();
     *     t.translate(p.x, p.y);
     *     // Color shifts from hot to cool based on life
     *     t.charColor(255 * p.life, 100 + 155 * (1-p.life), 255);
     *     t.char(p.char);
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
