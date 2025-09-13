/**
 * Base types and utilities for the mixin system
 */
import type { GLRenderer } from '../../rendering/webgl/Renderer';
import type { TextmodeFont } from '../font';
import type { TextmodeCanvas } from '../Canvas';
import type { TextmodeGrid } from '../Grid';
import type { AnimationController } from '../AnimationController';
import type { GLFramebuffer, Shader } from '../../rendering';
/**
 * Constructor type for mixin pattern
 */
export type Constructor<T = {}> = new (...args: any[]) => T;
/**
 * Mixin function type that takes a base class and returns an extended class
 */
export type Mixin<T> = <TBase extends Constructor<TextmodifierContext>>(Base: TBase) => TBase & Constructor<T>;
/**
 * Essential properties that all mixins can access.
 * This defines the contract for what mixins can expect to be available.
 */
export interface TextmodifierContext {
    /** Core WebGL renderer @ignore */
    readonly _renderer: GLRenderer;
    /** Font management @ignore */
    readonly _font: TextmodeFont;
    /** Canvas management @ignore */
    readonly _canvas: TextmodeCanvas;
    /** Grid management @ignore */
    readonly _grid: TextmodeGrid;
    /** Animation controller for managing rendering loop @ignore */
    readonly _animationController: AnimationController;
    /** Draw shader that contains content drawn by the user @ignore */
    readonly _textmodeDrawShader: Shader;
    /** Framebuffer used for offscreen rendering @ignore */
    readonly _textmodeDrawFramebuffer: GLFramebuffer;
    /** Shader used for converting pixels to textmode grid format @ignore */
    readonly _textmodeConversionShader: Shader;
    /** Main render method @ignore */
    $render(): void;
}
/**
 * Simple utility function to apply multiple mixins to a base class
 * @param Base The base class to extend
 * @param mixins Array of mixin functions to apply
 * @returns The composed class with all mixins applied
 */
export declare function $applyMixins<T extends Constructor>(Base: T, ...mixins: any[]): T;
