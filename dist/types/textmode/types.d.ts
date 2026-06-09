import type { TextmodePlugin } from './plugins/contracts';
import type { LoadingScreenOptions } from './layers/overlays/loading';
/**
 * Options when creating a {@link Textmodifier} instance via {@link textmode.create}.
 */
export type TextmodeOptions = {
    /**
     * Existing [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
     * or HTMLVideoElement to use instead of letting `textmode.js` create a canvas.
     *
     * **Note:**
     * If using `overlay` mode, this should be the target canvas or video element to overlay on.
     * `textmode.js` will create its own canvas applied on top of the target element, always matching its size and position.
     */
    canvas?: HTMLCanvasElement | HTMLVideoElement;
    /**
     * Use an external WebGL2 context instead of creating a new one.
     * Useful for integrating with three.js, Babylon.js, hydra-synth, or other WebGL libraries
     * that share the same canvas.
     */
    gl?: WebGL2RenderingContext;
    /** The font size to use for text rendering. Defaults to 16. */
    fontSize?: number;
    /** Maximum frames per second for auto rendering. Defaults to 60. */
    frameRate?: number;
    /**
     * Seed used by the instance-scoped random generator.
     *
     * Set this when a sketch should produce the same random sequence each time it runs.
     */
    seed?: string | number;
    /** The width of the canvas when creating a new canvas. Defaults to 800. */
    width?: number;
    /** The height of the canvas when creating a new canvas. Defaults to 600. */
    height?: number;
    /**
     * Pixel density multiplier for HiDPI/Retina displays. Defaults to `1`.
     *
     * For internally-created canvases, the backing store size is set to
     * `width * pixelDensity × height * pixelDensity` while the CSS display
     * size stays at `width × height`.
     *
     * Has no effect when using an externally-supplied `gl` or `canvas`.
     */
    pixelDensity?: number;
    /**
     * URL or path to a custom font file *(.otf, .ttf, or .woff)*.
     */
    fontSource?: string;
    /**
     * Render `textmode.js` as an overlay on top of an existing canvas or video element.
     *
     * Overlay mode creates a textmode `<canvas>` that follows the target element's
     * size and position. The target content is exposed as an adjustable
     * {@link media.TextmodeImage} through {@link Textmodifier.overlay} and can be drawn
     * with {@link Textmodifier.image}.
     *
     * This is useful for applying textmode conversion to p5.js sketches, videos,
     * and other canvas-based renderers. Manual textmode canvas resizing is not
     * recommended in overlay mode because the target element controls the size.
     */
    overlay?: boolean;
    /** List of plugins to install when the Textmodifier instance is created. */
    plugins?: TextmodePlugin[];
    /** Configure the built-in loading screen experience. */
    loadingScreen?: LoadingScreenOptions;
};
