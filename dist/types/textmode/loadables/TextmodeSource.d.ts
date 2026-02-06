import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import type { Material } from '../../rendering/webgl/materials/Material';
import type { UniformValue } from '../../rendering/webgl/types/UniformTypes';
import { TextmodeColor } from '../TextmodeColor';
import type { TextmodeFont } from './font/TextmodeFont';
import type { ITextmodeSource } from './ITextmodeSource';
import { Disposable } from '../../utils/Disposable';
import type { TextmodeConversionMode, TextmodeConversionManager } from '../conversion';
import type { RGB, RGBA } from '../../utils/color';
/**
 * Abstract base class representing a textmode source asset (image, video, texture).
 */
export declare abstract class TextmodeSource extends Disposable implements ITextmodeSource {
    protected _gl: WebGL2RenderingContext;
    protected _renderer: GLRenderer;
    protected _texture: WebGLTexture | null;
    protected _originalWidth: number;
    protected _originalHeight: number;
    protected _width: number;
    protected _height: number;
    protected _material: Material | null;
    protected _activeFont: TextmodeFont | null;
    protected _conversionMode: TextmodeConversionMode;
    private _cachedConversionStrategy;
    private _conversionManager;
    private _frameConversionMode;
    protected _invert: number;
    protected _flipX: number;
    protected _flipY: number;
    protected _charRotation: number;
    protected _charColorMode: 'sampled' | 'fixed';
    protected _cellColorMode: 'sampled' | 'fixed';
    private _frameInvert;
    private _frameFlipX;
    private _frameFlipY;
    private _frameCharRotation;
    private _frameCharColorMode;
    private _frameCellColorMode;
    protected _charColor: RGBA;
    protected _cellColor: RGBA;
    protected _backgroundColor: RGBA;
    protected _glyphColors: RGB[];
    private _characterString;
    private _frameCharColor;
    private _frameCellColor;
    private _frameBackgroundColor;
    private _frameGlyphColors;
    protected constructor(gl: WebGL2RenderingContext, renderer: GLRenderer, texture: WebGLTexture, conversionManager: TextmodeConversionManager, originalWidth: number, originalHeight: number, gridCols: number, gridRows: number);
    private _setFrameOrBaseValue;
    private _setFrameOrBaseValueWithStrategyReset;
    private _setFrameOrBaseColor;
    conversionMode(mode: TextmodeConversionMode): this;
    dispose(): void;
    invert(v?: boolean | number): this;
    flipX(v?: boolean | number): this;
    flipY(v?: boolean | number): this;
    charRotation(degrees: number): this;
    charColorMode(mode: 'sampled' | 'fixed'): this;
    cellColorMode(mode: 'sampled' | 'fixed'): this;
    charColor(colorOrGray: number | string | TextmodeColor, g?: number, b?: number, a?: number): this;
    cellColor(colorOrGray: number | string | TextmodeColor, g?: number, b?: number, a?: number): this;
    background(colorOrGray: number | TextmodeColor | string, g?: number, b?: number, a?: number): this;
    characters(chars: string): this;
    $setActiveFont(font: TextmodeFont): void;
    get texture(): WebGLTexture;
    get width(): number;
    get height(): number;
    get originalWidth(): number;
    get originalHeight(): number;
    /**
     * Recalculate the ideal width/height based on the current grid dimensions.
     * @ignore
     */
    $resize(gridCols: number, gridRows: number): void;
    $getMaterial(): Material;
    /**
     * Check if any draw-scoped overrides are active.
     * @internal
     */
    $hasFrameOverrides(): boolean;
    /**
     * Clear any draw-scoped overrides set during the current frame.
     * @internal
     */
    $clearFrameOverrides(): void;
    protected $beforeMaterialUpdate(): void;
    protected $getActiveTexture(): WebGLTexture;
    private _updateMaterial;
    private _createMaterial;
    private _setColor;
    private _applyCharacterPalette;
    private _getCharacterPalette;
    private _setIdealDimensions;
    createBaseConversionUniforms(): Record<string, UniformValue>;
    private _hasFrameOverrides;
    private _getActiveConversionStrategy;
    private _setFrameColor;
    private _createConversionContext;
}
