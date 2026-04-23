/**
 * ~ travelling without arriving
 *
 * @packageDocumentation
 */
export { Textmodifier } from './textmode/Textmodifier';
import './textmode/extensions';
export { GLFramebuffer as TextmodeFramebuffer } from './rendering';
export { TextmodeColor } from './textmode/color';
export { TextmodeCamera } from './textmode/camera';
export { TextmodeGrid } from './textmode/grid/TextmodeGrid';
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
 * import type { TextmodePlugin, TextmodePluginContext } from 'textmode.js/plugins';
 *
 * const MyPlugin: TextmodePlugin = {
 *   name: 'my-plugin',
 *   version: '1.0.0',
 *   install(textmodifier, context: TextmodePluginContext) {
 *     // Extend layers with a new method
 *     context.extendLayer('setMyState', function(value: number) {
 *       // `this` is bound to the TextmodeLayer instance
 *       this.setPluginState('my-plugin', { value });
 *     });
 *
 *     // Hook into layer rendering
 *     context.registerLayerPreRenderHook((layer) => {
 *       const state = layer.getPluginState<{ value: number }>('my-plugin');
 *       if (state && state.value > 0.5) {
 *         // Render custom content based on plugin state
 *       }
 *     });
 *   }
 * };
 * ```
 */
export * as plugins from './textmode/plugins';
/**
 * All filter related modules and types.
 *
 * Provides various image processing filters that can be applied in sequence on a layer's textmode-converted output,
 * such as blur, sharpen, edge detection, and color adjustments.
 * Filters can also be applied globally to all layers as post-processing effects.
 *
 * While `textmode.js` only offers a basic set of filters,
 * additional filters can be implemented and registered via the {@link TextmodeFilterManager},
 * which is accessible through {@link Textmodifier.filters}.
 */
export * as filters from './textmode/filters';
/**
 * All error handling related modules and types.
 */
export * as errors from './textmode/error';
export { GLShader as TextmodeShader } from './rendering/webgl/core/Shader';
export { Textmode as textmode } from './textmode/Textmode';
/** All loading screen related modules and types. */
export * as loading from './textmode/layers/overlays/loading';
/** All media asset related modules and types. */
export * as media from './textmode/media';
/** All font rendering related modules and types. */
export * as fonts from './textmode/fonts';
/** All types and interfaces related to input event handling. */
export * as input from './textmode/input';
/** All modules and types related to multi-layered textmode rendering. */
export * as layering from './textmode/layers';
