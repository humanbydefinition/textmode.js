import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import type { Material } from '../../rendering/webgl/materials/Material';
import { TextmodeSource } from './TextmodeSource';
import type { TextmodeConversionManager } from '../conversion';
/**
 * Represents an external texture source for textmode rendering via {@link Textmodifier.createTexture}.
 *
 * This class enables integration with other WebGL-based libraries like three.js, p5.js, Babylon.js,
 * hydra-synth, or any library that renders to a canvas element.
 *
 * It can be drawn to the canvas via {@link Textmodifier.image}.
 *
 * The texture automatically updates each frame to capture the latest content from the source canvas or video.
 *
 * @example
 * ```js
 * // === Three.js Integration ===
 * const threeRenderer = new THREE.WebGLRenderer();
 * // ... setup three.js scene ...
 *
 * const t = textmode.create({ width: 800, height: 600 });
 *
 * let tex;
 *
 * t.setup(() => {
 *     // Create texture from three.js canvas - auto-updates every frame
 *     tex = t.createTexture(threeRenderer.domElement);
 *     tex.characters(" .:-=+*#%@")
 *        .charColorMode("sampled")
 *        .cellColorMode("fixed")
 *        .cellColor(0);
 * });
 *
 * t.draw(() => {
 *     // Render three.js scene first
 *     threeRenderer.render(scene, camera);
 *
 *     // Then render as textmode
 *     t.background(0);
 *     t.image(tex);
 * });
 * ```
 *
 * @example
 * ```js
 * // === hydra-synth Integration ===
 * const hydraInstance = new HydraSynth({ width: 800, height: 600 });
 * hydraInstance.synth.osc(10, 0.1).out();
 *
 * let tex;
 *
 * t.setup(() => {
 *     tex = t.createTexture(hydraInstance.canvas);
 *     tex.characters(" .:-=+*#%@");
 * });
 *
 * t.draw(() => {
 *     t.image(tex);
 * });
 * ```
 */
export declare class TextmodeTexture extends TextmodeSource {
    protected _source: HTMLCanvasElement | HTMLVideoElement;
    protected constructor(gl: WebGL2RenderingContext, renderer: GLRenderer, texture: WebGLTexture, conversionManager: TextmodeConversionManager, originalWidth: number, originalHeight: number, gridCols: number, gridRows: number, source: HTMLCanvasElement | HTMLVideoElement);
    /**
     * Create a TextmodeTexture from an HTML canvas or video element.
     * The texture will automatically update each frame to capture the latest content.
     *
     * @param renderer GLRenderer instance
     * @param conversionManager Conversion manager
     * @param source Canvas or video element to capture from
     * @param gridCols Number of grid columns for sizing
     * @param gridRows Number of grid rows for sizing
     * @returns TextmodeTexture instance
     * @ignore
     */
    static $fromElement(renderer: GLRenderer, conversionManager: TextmodeConversionManager, source: HTMLCanvasElement | HTMLVideoElement, gridCols: number, gridRows: number): TextmodeTexture;
    update(): void;
    /**
     * Get or create the material for rendering this texture.
     * Forces material refresh each frame to capture latest source content.
     * @returns Material
     * @ignore
     */
    $getMaterial(): Material;
    /**
     * Called before material update to refresh texture data from source.
     * @ignore
     */
    protected $beforeMaterialUpdate(): void;
    /**
     * The source element this texture captures from.
     */
    get source(): HTMLCanvasElement | HTMLVideoElement;
}
