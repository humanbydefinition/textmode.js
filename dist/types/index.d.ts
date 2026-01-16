import { Textmode } from './Textmode';
export { Textmodifier } from './textmode/Textmodifier';
export { GLFramebuffer as TextmodeFramebuffer } from './rendering';
export { TextmodeColor } from './textmode/TextmodeColor';
export { TextmodeCanvas } from './textmode/Canvas';
export { TextmodeGrid } from './textmode/Grid';
export type { TextmodeOptions } from './textmode/types';
export type { TextmodeFramebufferOptions } from './rendering/webgl';
/**
 * All media conversion related modules and types.
 *
 * Responsible for converting images and videos into textmode-renderable formats
 * using various conversion strategies, like brightness- or edge-detection-based conversion.
 *
 * `textmode.js` only comes with a built-in `'brightness'`-based conversion strategy,
 * but custom strategies can be registered via {@link TextmodeConversionManager.register}.
 */
export * as conversion from './textmode/conversion';
/**
 * Plugin system types for extending textmode.js functionality.
 *
 * Plugins can:
 * - Add methods to TextmodeLayer instances (e.g., `.synth()`)
 * - Hook into the render lifecycle (pre/post draw, per-layer rendering)
 * - React to layer creation and disposal events
 * - Access the WebGL renderer, framebuffers, and other internals
 *
 * @example
 * ```ts
 * import type { TextmodePlugin, TextmodePluginAPI } from 'textmode.js/plugins';
 *
 * const MyPlugin: TextmodePlugin = {
 *   name: 'my-plugin',
 *   version: '1.0.0',
 *   install(textmodifier, api) {
 *     // Extend layers with a new method
 *     api.extendLayer('myMethod', function(value) {
 *       this.setPluginState('my-plugin', { value });
 *     });
 *
 *     // Hook into layer rendering
 *     api.registerLayerPreRenderHook((layer, ctx) => {
 *       const state = layer.getPluginState('my-plugin');
 *       if (state) {
 *         // Render plugin content to layer.drawFramebuffer
 *       }
 *     });
 *   }
 * };
 * ```
 */
export * as plugins from './textmode/managers/PluginManager';
/**
 * All filter related modules and types.
 *
 * Provides various image processing filters that can be applied in sequence on a layer's textmode-converted output,
 * such as blur, sharpen, edge detection, and color adjustments. Filters can also be applied globally to all layers as post-processing effects.
 *
 * While `textmode.js` only offers a basic set of filters, additional filters can be implemented and registered via the {@link TextmodeFilterManager},
 * which is accessible through {@link Textmodifier.filters}.
 */
export * as filters from './textmode/filters';
export { TextmodeErrorLevel } from './errors/ErrorHandler';
export { GLShader as TextmodeShader } from './rendering/webgl/core/Shader';
export { Textmode as textmode } from './Textmode';
/** All loading screen related modules and types. */
export * as loading from './textmode/loading';
/** All loadable assets related to textmode rendering. */
export * as loadables from './textmode/loadables';
/** All types and interfaces related to input event handling. */
export * as input from './textmode/managers';
/** All modules and types related to multi-layered textmode rendering. */
export * as layering from './textmode/layers';
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
