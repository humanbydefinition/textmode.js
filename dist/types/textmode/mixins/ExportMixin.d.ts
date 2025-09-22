import type { Mixin } from './TextmodifierMixin';
import { type SVGExportOptions } from '../../export/svg';
import { type TXTExportOptions } from '../../export/txt';
import { type ImageExportOptions } from '../../export/image';
/**
 * Interface for export capabilities that will be mixed into Textmodifier
 */
export interface ExportCapabilities {
    /**
     * Generate the current textmode rendering as a text string.
     * @param options Options for text generation *(excluding filename)*
     * @returns Textmode grid content as a string.
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = textmode.create(canvas, {renderMode: 'manual'});
     *
     * // Get the current rendering as a text string
     * const textString = textmodifier.toString({
     *   preserveTrailingSpaces: false,
     *   lineEnding: 'lf'
     * });
     *
     * // Print to console or use otherwise
     * console.log(textString);
     * ```
     */
    toString(options?: TXTExportOptions): string;
    /**
     * Export the current textmode rendering to a TXT file.
     * @param options Options for TXT export
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = textmode.create(canvas, {renderMode: 'manual'});
     *
     * // Export the current rendering to a TXT file
     * textmodifier.saveStrings({
     *   filename: 'my_textmode_rendering',
     *   preserveTrailingSpaces: false
     * });
     * ```
     */
    saveStrings(options?: TXTExportOptions): void;
    /**
     * Generate the current textmode rendering as an SVG string.
     * @param options Options for SVG generation *(excluding filename)*
     * @returns SVG content as a string.
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = textmode.create(canvas, {renderMode: 'manual'});
     *
     * // Get the current rendering as an SVG string
     * const svgString = textmodifier.toSVG({
     *   includeBackgroundRectangles: true,
     *   drawMode: 'fill'
     * });
     *
     * // Print to console or use otherwise
     * console.log(svgString);
     * ```
     */
    toSVG(options?: SVGExportOptions): string;
    /**
     * Export the current textmode rendering to an SVG file.
     * @param options Options for SVG export
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = textmode.create(canvas, {renderMode: 'manual'});
     *
     * // Export the current rendering to an SVG file
     * textmodifier.saveSVG({
     *   filename: 'my_textmode_rendering',
     * });
     * ```
     */
    saveSVG(options?: SVGExportOptions): void;
    /**
     * Export the current textmode rendering to an image file.
     * @param options Options for image export
     *
     * @example
     * ```javascript
     * // Fetch a canvas element to apply textmode rendering to
     * const canvas = document.querySelector('canvas#myCanvas');
     *
     * // Create a Textmodifier instance
     * const textmodifier = textmode.create(canvas, {renderMode: 'manual'});
     *
     * // Export the current rendering to a PNG file *(default)*
     * textmodifier.saveCanvas();
     *
     * // Export with custom options
     * textmodifier.saveCanvas({
     *   filename: 'my_textmode_rendering',
     *   format: 'jpg',
     *   quality: 0.8,
     *   scale: 2.0,
     *   backgroundColor: 'white'
     * });
     * ```
     */
    saveCanvas(options?: ImageExportOptions): Promise<void>;
}
/**
 * Mixin that adds export capabilities to a class
 * @param Base The base class to extend
 * @returns Extended class with export capabilities
 */
export declare const ExportMixin: Mixin<ExportCapabilities>;
