import { TextmodeFont } from './Font';
import { TextmodeGrid } from './Grid';
import { TextmodeErrorLevel } from '../errors';
/**
 * Options for initializing a {@link Textmodifier} instance.
 */
export type TextmodeOptions = {
    /** The font size to use for text rendering. Defaults to 16. */
    fontSize?: number;
};
/**
 * Main class for handling textmode rendering in a WebGL context.
 */
export declare class Textmodifier {
    /** The canvas element to capture content from */
    private captureCanvas;
    /** Our WebGL overlay canvas manager */
    private textmodeCanvas;
    /** Core WebGL renderer */
    private renderer;
    private asciiShader;
    private canvasFramebuffer;
    private brightnessConverter;
    private _fontManager;
    private _grid;
    private resizeObserver;
    private resultFramebuffer;
    private constructor();
    /**
     * Static factory method for creating and initializing a Textmodifier instance.
     * @param canvas The HTML canvas element to capture content from.
     * @param opts Optional configuration options for the `Textmodifier` instance.
     */
    static create(canvas: HTMLCanvasElement, opts?: TextmodeOptions): Promise<Textmodifier>;
    private setupEventListeners;
    /**
     * Update the font used for rendering.
     * @param fontUrl The URL of the font to load.
     */
    loadFont(fontUrl: string): Promise<void>;
    /**
     * Apply textmode rendering to the canvas.
     */
    render(): void;
    /**
     * Set the global error handling level for the library. This applies to all `Textmodifier` instances.
     * @param level The error handling level to set.
     */
    setErrorLevel(level: TextmodeErrorLevel): void;
    private resize;
    get grid(): TextmodeGrid;
    get fontManager(): TextmodeFont;
}
