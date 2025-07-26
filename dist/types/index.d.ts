import { Textmode } from './Textmode';
export { Textmodifier } from './textmode/Textmodifier';
export { TextmodeFont } from './textmode/font';
export { TextmodeCanvas } from './textmode/Canvas';
export { TextmodeGrid } from './textmode/Grid';
export type { TextmodeOptions } from './textmode/Textmodifier';
export type { TextmodeCharacter } from './textmode/font';
export type { SVGExportOptions } from './export/svg';
export { TextmodeConversionPipeline } from './textmode/ConversionPipeline';
export { TextmodeErrorLevel } from './errors/ErrorHandler';
/** Contains all converters that can be added to a rendering pipeline to shape the textmode output. */
export * as TextmodeConverters from './textmode/converters';
export { Textmode as textmode } from './Textmode';
/**
 * Exports the create, setErrorLevel, and version functions from the Textmode class for UMD compatibility,
 * so calls like `textmode.create()` can be used.
 */
/** @ignore */
export declare const create: typeof Textmode.create;
/** @ignore */
export declare const setErrorLevel: typeof Textmode.setErrorLevel;
/** @ignore */
export declare const version: string;
