import type { GLShader } from '../../rendering';
import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import type { TextmodeFont } from '../loadables/font/TextmodeFont';
import type { TextmodeSource } from '../loadables/TextmodeSource';
/**
 * Type representing the available textmode conversion modes
 * @ignore
 */
export type TextmodeConversionMode = 'brightness' | 'accurate' | (string & {});
/**
 * Interface for the context provided to conversion strategies
 * @ignore
 */
export interface TextmodeConversionContext {
    renderer: GLRenderer;
    gl: WebGL2RenderingContext;
    font: TextmodeFont;
    source: TextmodeSource;
    gridWidth: number;
    gridHeight: number;
}
/**
 * Interface for a textmode conversion strategy
 * @ignore
 */
export interface TextmodeConversionStrategy {
    readonly id: TextmodeConversionMode;
    createShader(context: TextmodeConversionContext): GLShader;
    createUniforms(context: TextmodeConversionContext): Record<string, any>;
}
/**
 * Register a conversion strategy
 * @param strategy The conversion strategy to register
 * @ignore
 */
export declare function registerConversionStrategy(strategy: TextmodeConversionStrategy): void;
/**
 * Unregister a conversion strategy by its ID
 * @param id The ID of the conversion strategy to unregister
 * @ignore
 */
export declare function unregisterConversionStrategy(id: TextmodeConversionMode): void;
/**
 * Get a registered conversion strategy by its ID
 * @param id The ID of the conversion strategy
 * @returns The conversion strategy, or undefined if not found
 * @ignore
 */
export declare function getConversionStrategy(id: TextmodeConversionMode): TextmodeConversionStrategy | undefined;
