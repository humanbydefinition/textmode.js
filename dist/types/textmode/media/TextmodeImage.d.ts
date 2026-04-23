import { TextmodeSource } from './TextmodeSource';
/**
 * Represents an image uploaded for textmode rendering via {@link Textmodifier.loadImage}.
 *
 * It can be drawn to the canvas via {@link Textmodifier.image}.
 *
 * An image uploaded currently runs through an adjustable brightness-converter that converts
 * the original image into a textmode representation using characters.
 * Those adjustable options are available via chainable methods on this class.
 *
 * @example
 * {@includeCode ../../../examples/TextmodeImage/creation/sketch.js}
 */
export declare class TextmodeImage extends TextmodeSource {
    private constructor();
}
