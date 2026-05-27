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
export { TextmodeFont, TextmodeTileset } from './textmode/fonts';
export { TextmodeLayer, TextmodeLayerManager } from './textmode/layers';
export { TextmodeImage, TextmodeSource, TextmodeTexture, TextmodeVideo } from './textmode/media';
export { TextmodeRandom } from './textmode/random';
export { TextmodeConversionManager } from './textmode/conversion';
export { TextmodeFilterManager } from './textmode/filters';
export { TextmodeError, TextmodeErrorLevel, ErrorLayerController } from './textmode/error';
export { LoadingLayerController } from './textmode/layers/overlays/loading';
export { INPUT_EVENT_NAMES } from './textmode/input';
export { TEXTMODE_LAYER_BLEND_MODES } from './textmode/layers';
export type { TextmodeOptions } from './textmode/types';
export type { TextmodeRandomSeed } from './textmode/random';
export type { TextmodeFramebufferOptions } from './rendering/webgl';
export type { TextmodeLayerBlendMode, TextmodeLayerOptions } from './textmode/layers/types';
export type { TextmodeGlyph, TextmodeTilesetOptions, GlyphData } from './textmode/fonts';
export type { BuiltInConversionMode, TextmodeConversionMode, TextmodeConversionContext, TextmodeConversionPassContext, TextmodeConversionStep, TextmodeConversionStepOptions, TextmodeColorInput, TextmodeConversionStrategy, } from './textmode/conversion';
export type { BuiltInFilterName, BuiltInFilterParams, FilterName } from './textmode/filters';
export type { ErrorScreenRendererContext } from './textmode/error';
export type { LoadingScreenOptions, LoadingScreenRendererContext, LoadingScreenState, } from './textmode/layers/overlays/loading';
export type { InputEventMap, InputEventName, InputEventOwner } from './textmode/input';
export type { TextmodeCanvasHandle, TextmodePlugin, TextmodePluginContext, TextmodePluginHook, LayerLifecycleHook, LayerRenderHook, SetupLifecycleHook, LayerExtensionImplementation, SourceExtensionImplementation, } from './textmode/plugins';
/**
 * Media conversion modules and types.
 *
 * Use this namespace to configure or extend the strategies that convert images,
 * videos, and textures into textmode-renderable data.
 *
 * `textmode.js` includes the built-in `'brightness'` strategy. Custom strategies
 * can be registered via {@link TextmodeConversionManager.register}.
 */
export * as conversion from './textmode/conversion';
/**
 * Plugin system types for extending textmode.js.
 *
 * Plugins can:
 * - Add methods to `TextmodeLayer` instances (for example, `.synth()`)
 * - Hook into setup, draw, and per-layer render lifecycle events
 * - React to layer creation and disposal
 * - Access renderer, framebuffer, and source internals through the plugin context
 *
 * @example
 * ```ts
 * import type { TextmodePlugin, TextmodePluginContext } from 'textmode.js';
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
 * Filter modules and types.
 *
 * Filters can be queued on a layer's textmode-converted output or applied globally
 * after all visible layers have been composited.
 *
 * `textmode.js` includes a small built-in filter set. Additional filters can be
 * implemented and registered via {@link TextmodeFilterManager}, available through
 * {@link Textmodifier.filters}.
 */
export * as filters from './textmode/filters';
/**
 * Error handling modules and types.
 */
export * as errors from './textmode/error';
export { GLShader as TextmodeShader } from './rendering/webgl/core/Shader';
export { Textmode as textmode } from './textmode/Textmode';
/** Loading screen modules and types. */
export * as loading from './textmode/layers/overlays/loading';
/** Media asset modules and types. */
export * as media from './textmode/media';
/** Font and tileset modules and types. */
export * as fonts from './textmode/fonts';
/** Input event modules and types. */
export * as input from './textmode/input';
/** Layering modules and types. */
export * as layering from './textmode/layers';
/** Deterministic pseudo-random number modules and types. */
export * as random from './textmode/random';
