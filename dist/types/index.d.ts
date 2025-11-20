import { Textmode } from './Textmode';
export { Textmodifier } from './textmode/Textmodifier';
export { GLFramebuffer as TextmodeFramebuffer } from './rendering';
export { TextmodeColor } from './textmode/TextmodeColor';
export { TextmodeCanvas } from './textmode/Canvas';
export { TextmodeGrid } from './textmode/Grid';
export type { TextmodeOptions } from './textmode/types';
export type { TextmodeFramebufferOptions } from './rendering/webgl';
export { registerConversionStrategy, unregisterConversionStrategy, getConversionStrategy, } from './textmode/conversion';
export type { TextmodeConversionStrategy, TextmodeConversionContext, TextmodeConversionMode, } from './textmode/conversion';
export type { TextmodePlugin, TextmodePluginAPI, } from './textmode/managers/PluginManager';
export { TextmodeErrorLevel } from './errors/ErrorHandler';
export { Textmode as textmode } from './Textmode';
/** All loading screen related modules and types. */
export * as loading from './textmode/loading';
/** All loadable assets related to textmode rendering. */
export * as loadables from './textmode/loadables';
/** All types and interfaces related to input event handling. */
export * as input from './textmode/managers';
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
