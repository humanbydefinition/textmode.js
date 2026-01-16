import type { TextmodePlugin } from './managers/PluginManager';
import type { LoadingScreenOptions } from './loading/';
/**
 * Options when creating a {@link Textmodifier} instance.
 */
export type TextmodeOptions = {
    /**
     * An existing [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) to use instead of creating a new one.
     *
     * **Note:**
     * If using `overlay` mode, this should be the target canvas or video element to overlay on.
     * `textmode.js` will create its own canvas applied on top of the target element, always matching its size and position.
     */
    canvas?: HTMLCanvasElement;
    /** The font size to use for text rendering. Defaults to 16. */
    fontSize?: number;
    /** Maximum frames per second for auto rendering. Defaults to 60. */
    frameRate?: number;
    /** The width of the canvas when creating a new canvas. Defaults to 800. */
    width?: number;
    /** The height of the canvas when creating a new canvas. Defaults to 600. */
    height?: number;
    /**
     * URL or path to a custom font file *(.otf/.ttf)*.
     */
    fontSource?: string;
    /**
     * Use `textmode.js` in overlay mode,
     * which sets up the textmode `<canvas>` on top of an existing HTMLCanvasElement or HTMLVideoElement,
     * automatically resizing and positioning it to match the target element.
     *
     * In this mode `textmode.js` fetches the content of the target element and loads it into an adjustable {@link loadables.TextmodeImage},
     * that can be accessed via {@link Textmodifier.overlay}, and drawn via {@link Textmodifier.image},
     *
     * Useful for applying textmode conversion to p5.js sketches, YouTube videos, and sooo much more.
     *
     * All functionality of `textmode.js` remains available.
     * Resizing the `textmode.js` canvas is not recommended though,
     * since the overlay target automatically updates the size.
     */
    overlay?: boolean;
    /** List of plugins to install when the Textmodifier instance is created. */
    plugins?: TextmodePlugin[];
    /** Configure the built-in loading screen experience. */
    loadingScreen?: LoadingScreenOptions;
};
