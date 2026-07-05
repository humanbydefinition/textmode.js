/**
 * ~ travelling without arriving
 *
 * @packageDocumentation
 */
export { Textmodifier } from './textmode/Textmodifier';
import './textmode/extensions';
export { GLFramebuffer as TextmodeFramebuffer } from './rendering';
export { TextmodeCamera } from './textmode/camera';
export { TextmodeGrid } from './textmode/grid/TextmodeGrid';
export { TextmodeFont, TextmodeTileset } from './textmode/fonts';
export { TextmodeLayer, TextmodeLayerManager } from './textmode/layers';
export { TextmodeImage, TextmodeSource, TextmodeTexture, TextmodeVideo } from './textmode/media';
export { TextmodeVector } from './textmode/math';
export { TextmodeGlyphRamp } from './textmode/glyph';
export { TextmodeRandom } from './textmode/random';
export { TextmodeConversionManager } from './textmode/conversion';
export { TextmodeFilterManager } from './textmode/filters';
export { TextmodeError, TextmodeErrorLevel, ErrorLayerController } from './textmode/error';
export { LoadingLayerController } from './textmode/layers/overlays/loading';
export { INPUT_EVENT_NAMES } from './textmode/input';
export { TEXTMODE_LAYER_BLEND_MODES, LayerBlendMode } from './textmode/layers';
export { ShapeAssemblyMode } from './textmode/extensions/shapes2d';
export { TEXTMODE_EASE_NAMES } from './utils/math';
export type { TextmodeOptions } from './textmode/types';
export type { TextmodeEaseName } from './utils/math';
export type { TextmodeFramebufferOptions } from './rendering/webgl';
export type { TextmodeLayerBlendMode, TextmodeLayerOptions } from './textmode/layers/types';
export type { TextmodeGlyph, TextmodeGlyphAtlas, TextmodeTilesetOptions, GlyphData } from './textmode/fonts';
export type { GridPosition } from './textmode/grid';
export type { TextmodeLightColorInput } from './textmode/extensions/lighting';
export type { BuiltInConversionMode, TextmodeConversionMode, TextmodeConversionContext, TextmodeConversionSource, TextmodeConversionPassContext, TextmodeConversionStep, TextmodeConversionStepOptions, TextmodeColorInput, TextmodeConversionStrategy, } from './textmode/conversion';
export type { BuiltInFilterName, BuiltInFilterParams, FilterContext, FilterName, TextmodeFilterStrategy, TextmodeFilterUniformDefinitions, } from './textmode/filters';
export type { ErrorScreenRendererContext, TextmodeErrorFormatOptions } from './textmode/error';
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
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/conversion | conversion API reference}
 */
export * as conversion from './textmode/conversion';
/**
 * Color objects, color modes, and types.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color | color API reference}
 */
export * as color from './textmode/color';
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
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/plugins | plugins API reference}
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
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/filters | filters API reference}
 */
export * as filters from './textmode/filters';
/**
 * Error handling modules and types.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/errors | errors API reference}
 */
export * as errors from './textmode/error';
export { GLShader as TextmodeShader } from './rendering/webgl/core/Shader';
export { Textmode as textmode } from './textmode/Textmode';
/**
 * Loading screen modules and types.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/loading | loading API reference}
 */
export * as loading from './textmode/layers/overlays/loading';
/**
 * Media asset modules and types.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/media | media API reference}
 */
export * as media from './textmode/media';
/**
 * Font and tileset modules and types.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/fonts | fonts API reference}
 */
export * as fonts from './textmode/fonts';
/**
 * Input event modules and types.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/input | input API reference}
 */
export * as input from './textmode/input';
/**
 * Layering modules and types.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/layering | layering API reference}
 */
export * as layering from './textmode/layers';
/**
 * Deterministic pseudo-random number modules and types.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/classes/TextmodeRandom | TextmodeRandom API reference}
 */
export * as random from './textmode/random';
