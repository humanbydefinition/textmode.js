import type { GLRenderer } from '../../rendering/webgl/core/Renderer';
import type { Material } from '../../rendering/webgl/materials/Material';
import { TextmodeColor } from '../TextmodeColor';
import type { TextmodeFont } from './font/TextmodeFont';
import type { ITextmodeSource } from './ITextmodeSource';
import type { TextmodeConversionMode, TextmodeConversionManager } from '../conversion';
type GlyphColor = [number, number, number];
export declare abstract class TextmodeSource implements ITextmodeSource {
    protected _gl: WebGL2RenderingContext;
    protected _renderer: GLRenderer;
    protected _texture: WebGLTexture;
    protected _originalWidth: number;
    protected _originalHeight: number;
    protected _width: number;
    protected _height: number;
    protected _material: Material | null;
    protected _activeFont: TextmodeFont | null;
    protected _conversionMode: TextmodeConversionMode;
    private _cachedConversionStrategy;
    private _conversionManager;
    protected _invert: number;
    protected _flipX: number;
    protected _flipY: number;
    protected _charRotation: number;
    protected _charColorMode: 'sampled' | 'fixed';
    protected _cellColorMode: 'sampled' | 'fixed';
    protected _charColor: [number, number, number, number];
    protected _cellColor: [number, number, number, number];
    protected _backgroundColor: [number, number, number, number];
    protected _glyphColors: GlyphColor[];
    private _characterString;
    protected constructor(gl: WebGL2RenderingContext, renderer: GLRenderer, texture: WebGLTexture, conversionManager: TextmodeConversionManager, originalWidth: number, originalHeight: number, width: number, height: number);
    conversionMode(mode: TextmodeConversionMode): this;
    $dispose(): void;
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
    /**
     * Set the active font for the current render pass.
     * Called by the renderer before getMaterial() to ensure the source uses the correct layer's font.
     * @param font The font to use for this render
     * @ignore
     */
    $setActiveFont(font: TextmodeFont): void;
    get texture(): WebGLTexture;
    get width(): number;
    get height(): number;
    get originalWidth(): number;
    get originalHeight(): number;
    $getMaterial(): Material;
    protected $beforeMaterialUpdate(): void;
    protected abstract $getActiveTexture(): WebGLTexture;
    private _updateMaterial;
    private _setColor;
    private _applyCharacterPalette;
    createBaseConversionUniforms(): Record<string, any>;
    private _getActiveConversionStrategy;
    private _createConversionContext;
}
export {};
