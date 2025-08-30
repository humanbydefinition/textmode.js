import type { Mixin } from './TextmodifierMixin';
import type { Framebuffer, Shader, UniformValue } from '../../rendering';
import type { FramebufferOptions } from '../../rendering/core/Framebuffer';
/**
 * Interface for rendering capabilities that will be mixed into Textmodifier
 */
export interface RenderingCapabilities {
    /**
     * Sets the fill color for subsequent rendering operations
     * @param r Red component (0-255)
     * @param g Green component (0-255, optional)
     * @param b Blue component (0-255, optional)
     * @param a Alpha component (0-255, optional)
     *
     * @example
     * ```javascript
     * const t = await textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   // Set the background color to black
     *   t.background(0);
     *
     *   const centerX = t.width / 2;
     *   const centerY = t.height / 2;
     *   const radius = Math.min(t.width, t .height) / 3;
     *   const speed = 0.02; // Adjust speed of rotation
     *
     *   const angle = t.frameCount * speed;
     *   const x = centerX + Math.cos(angle) * radius - 100;
     *   const y = centerY + Math.sin(angle) * radius - 50;
     *
     *   // Set the fill color to white
     *   t.fill(255);
     *
     *   // Draw a rectangle with the fill color
     *   t.rect(x, y, 200, 150);
     * });
     * ```
     */
    fill(r: number, g?: number, b?: number, a?: number): void;
    /**
     * Sets the stroke color for subsequent rendering operations
     * @param r Red component (0-255)
     * @param g Green component (0-255, optional)
     * @param b Blue component (0-255, optional)
     * @param a Alpha component (0-255, optional)
     *
     * @example
     * ```javascript
     * const t = await textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   // Set the background color to black
     *   t.background(0);
     *
     *   // Set stroke color to red and stroke weight to 4 pixels
     *   t.stroke(255, 0, 0);
     *   t.strokeWeight(4);
     *
     *   // Draw a rectangle with red stroke
     *   t.rect(100, 100, 200, 150);
     *
     *   // Rectangle with both fill and stroke
     *   t.fill(0, 255, 0);
     *   t.stroke(0, 0, 255);
     *   t.strokeWeight(2);
     *   t.rect(350, 100, 200, 150);
     * });
     * ```
     */
    stroke(r: number, g?: number, b?: number, a?: number): void;
    /**
     * Sets the stroke weight (thickness) for subsequent stroke operations
     * @param weight The stroke thickness in pixels
     *
     * @example
     * ```javascript
     * const t = await textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Thin stroke
     *   t.stroke(255);
     *   t.strokeWeight(1);
     *   t.rect(50, 50, 100, 100);
     *
     *   // Thick stroke
     *   t.strokeWeight(8);
     *   t.rect(200, 50, 100, 100);
     * });
     * ```
     */
    strokeWeight(weight: number): void;
    /**
     * Disables stroke rendering for subsequent operations
     *
     * @example
     * ```javascript
     * const t = await textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Rectangle with stroke
     *   t.fill(255, 0, 0);
     *   t.stroke(0, 255, 0);
     *   t.strokeWeight(4);
     *   t.rect(100, 100, 150, 100);
     *
     *   // Rectangle without stroke (fill only)
     *   t.noStroke();
     *   t.rect(300, 100, 150, 100);
     * });
     * ```
     */
    noStroke(): void;
    /**
     * Disables fill rendering for subsequent operations
     *
     * @example
     * ```javascript
     * const t = await textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Rectangle with fill
     *   t.fill(255, 0, 0);
     *   t.stroke(0, 255, 0);
     *   t.strokeWeight(4);
     *   t.rect(100, 100, 150, 100);
     *
     *   // Rectangle without fill (stroke only)
     *   t.noFill();
     *   t.rect(300, 100, 150, 100);
     * });
     * ```
     */
    noFill(): void;
    /**
     * Sets the rotation angle for subsequent rendering operations
     * @param degrees The rotation angle in degrees
     *
     * @example
     * ```javascript
     * const t = await textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Normal rectangle
     *   t.fill(255, 0, 0);
     *   t.rect(100, 100, 150, 100);
     *
     *   // Rotated rectangle
     *   t.push(); // Save current state
     *   t.rotate(45); // Rotate 45 degrees
     *   t.fill(0, 255, 0);
     *   t.rect(300, 100, 150, 100);
     *   t.pop(); // Restore state (no rotation)
     *
     *   // Back to normal (no rotation)
     *   t.fill(0, 0, 255);
     *   t.rect(500, 100, 150, 100);
     * });
     * ```
     */
    rotate(degrees: number): void;
    /**
     * Save the current rendering state (fill, stroke, etc.) to the state stack.
     * Use with {@link pop} to isolate style changes within a block.
     *
     * @example
     * ```javascript
     * const t = await textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Set initial styles
     *   t.fill(255, 0, 0);      // Red fill
     *   t.stroke(0, 255, 0);    // Green stroke
     *   t.strokeWeight(4);      // Thick stroke
     *
     *   t.push(); // Save current state
     *
     *   // Change styles temporarily
     *   t.fill(0, 0, 255);      // Blue fill
     *   t.stroke(255, 255, 0);  // Yellow stroke
     *   t.strokeWeight(2);      // Thin stroke
     *   t.rect(100, 100, 150, 100);
     *
     *   t.pop(); // Restore previous state
     *
     *   // Back to red fill, green stroke, thick stroke
     *   t.rect(300, 100, 150, 100);
     * });
     * ```
     */
    push(): void;
    /**
     * Restore the most recently saved rendering state from the state stack.
     * Use with {@link push} to isolate style changes within a block.
     *
     * @example
     * ```javascript
     * const t = await textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   t.background(0);
     *
     *   // Default styles
     *   t.fill(255);           // White fill
     *   t.stroke(0);           // Black stroke
     *   t.strokeWeight(1);     // Thin stroke
     *
     *   t.push(); // Save current state
     *
     *   // Temporary style changes
     *   t.fill(255, 0, 0);     // Red fill
     *   t.strokeWeight(8);     // Thick stroke
     *   t.rect(50, 50, 100, 100);
     *
     *   t.push(); // Save red style state
     *
     *   t.fill(0, 255, 0);     // Green fill
     *   t.noStroke();          // No stroke
     *   t.rect(200, 50, 100, 100);
     *
     *   t.pop(); // Back to red fill, thick stroke
     *   t.rect(350, 50, 100, 100);
     *
     *   t.pop(); // Back to white fill, black stroke, thin stroke
     *   t.rect(500, 50, 100, 100);
     * });
     * ```
     */
    pop(): void;
    /**
     * Draw a rectangle with the current shader or fill color.
     * @param x X-coordinate of the rectangle
     * @param y Y-coordinate of the rectangle
     * @param width Width of the rectangle
     * @param height Height of the rectangle
     *
     * @example
     * ```javascript
     * const t = await textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   // Set the background color to black
     *   t.background(0);
     *
     *   const centerX = t.width / 2;
     *   const centerY = t.height / 2;
     *   const radius = Math.min(t.width, t .height) / 3;
     *   const speed = 0.02; // Adjust speed of rotation
     *
     *   const angle = t.frameCount * speed;
     *   const x = centerX + Math.cos(angle) * radius - 100;
     *   const y = centerY + Math.sin(angle) * radius - 50;
     *
     *   // Set the fill color to white
     *   t.fill(255);
     *
     *   // Draw a rectangle with the fill color
     *   t.rect(x, y, 200, 150);
     * });
     * ```
     */
    rect(x: number, y: number, width?: number, height?: number): void;
    /**
     * Draw a line from point (x1, y1) to point (x2, y2) with the current stroke settings.
     * Lines respect stroke color, stroke weight, and rotation, but ignore fill properties.
     * @param x1 X-coordinate of the line start point
     * @param y1 Y-coordinate of the line start point
     * @param x2 X-coordinate of the line end point
     * @param y2 Y-coordinate of the line end point
     *
     * @example
     * ```javascript
     * const t = await textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   // Set the background color to black
     *   t.background(0);
     *
     *   // Draw a simple line
     *   t.stroke(255, 0, 0); // Red stroke
     *   t.strokeWeight(2);   // 2px thick
     *   t.line(100, 100, 300, 200);
     *
     *   // Draw an animated rotating line
     *   t.push();
     *   t.stroke(0, 255, 0); // Green stroke
     *   t.strokeWeight(4);   // 4px thick
     *   t.rotate(t.frameCount * 2); // Rotate based on frame count
     *   t.line(400, 300, 600, 300);
     *   t.pop();
     *
     *   // Draw a thick yellow line
     *   t.stroke(255, 255, 0); // Yellow stroke
     *   t.strokeWeight(8);     // 8px thick
     *   t.line(200, 400, 400, 500);
     *
     *   // Line with no stroke won't be visible
     *   t.noStroke();
     *   t.line(500, 100, 700, 200); // This won't render
     * });
     * ```
     */
    line(x1: number, y1: number, x2: number, y2: number): void;
    /**
     * Set the background color for the canvas.
     * @param r Red component (0-255)
     * @param g Green component (0-255, optional)
     * @param b Blue component (0-255, optional)
     * @param a Alpha component (0-255, optional)
     *
     * @example
     * ```javascript
     * const t = await textmode.create({
     *   width: 800,
     *   height: 600,
     * })
     *
     * t.draw(() => {
     *   // Set the background color to black
     *   t.background(0);
     *
     *   const centerX = t.width / 2;
     *   const centerY = t.height / 2;
     *   const radius = Math.min(t.width, t .height) / 3;
     *   const speed = 0.02; // Adjust speed of rotation
     *
     *   const angle = t.frameCount * speed;
     *   const x = centerX + Math.cos(angle) * radius - 100;
     *   const y = centerY + Math.sin(angle) * radius - 50;
     *
     *   // Set the fill color to white
     *   t.fill(255);
     *
     *   // Draw a rectangle with the fill color
     *   t.rect(x, y, 200, 150);
     * });
     * ```
     */
    background(r: number, g?: number, b?: number, a?: number): void;
    /**
     * Create a shader program from vertex and fragment source code.
     * @param vertexSource The GLSL source code for the vertex shader.
     * @param fragmentSource The GLSL source code for the fragment shader.
     * @returns The created shader program for use in `textmode.js`.
     * @ignore
     */
    createShader(vertexSource: string, fragmentSource: string): Shader;
    /**
     * Create a filter shader program from a fragment source code.
     * @param fragmentSource The GLSL source code for the fragment shader.
     * @returns The created filter shader program for use in `textmode.js`.
     */
    createFilterShader(fragmentSource: string): Shader;
    /**
     * Set the current shader for rendering.
     * @param shader The shader program to use for rendering.
     */
    shader(shader: Shader): void;
    /**
     * Set a uniform variable for the current shader.
     * @param name The name of the uniform variable to set.
     * @param value The value to set for the uniform variable.
     */
    setUniform(name: string, value: UniformValue): void;
    /**
     * Draw an image to the canvas.
     * @param source The image source
     * @param posX The x position to draw the image
     * @param posY The y position to draw the image
     * @param width The width to draw the image (optional)
     * @param height The height to draw the image (optional)
     */
    image(source: Framebuffer, posX: number, posY: number, width?: number, height?: number): void;
    /**
     * Clear the canvas.
     */
    clear(): void;
    /**
     * Create a framebuffer.
     * @param width The width in pixels
     * @param height The height in pixels
     * @param options Additional options for the framebuffer
     */
    createFramebuffer(width: number, height: number, options: FramebufferOptions): Framebuffer;
}
/**
 * Mixin that adds rendering capabilities to a class by delegating to GLRenderer
 * @param Base The base class to extend
 * @returns Extended class with rendering capabilities
 */
export declare const RenderingMixin: Mixin<RenderingCapabilities>;
