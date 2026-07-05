import type { GLRenderer } from '../../../rendering/webgl/core/Renderer';
import type { Material } from '../../../rendering/webgl/materials/Material';
import type { UniformValue } from '../../../rendering/webgl/types/UniformTypes';
import type { TextmodeConversionManager, TextmodeConversionSource } from '../../conversion';
import type { ConversionStackState } from './ConversionStackState';
import type { GlyphPaletteTextureCache } from './GlyphPaletteTextureCache';
import type { SourceConversionState } from './SourceConversionState';
export type SourceMaterialFactoryOptions = {
    gl: WebGL2RenderingContext;
    renderer: GLRenderer;
    conversionManager: TextmodeConversionManager;
    source: TextmodeConversionSource;
    stackState: ConversionStackState;
    conversionState: SourceConversionState;
    paletteCache: GlyphPaletteTextureCache;
    getTexture: () => WebGLTexture;
    beforeMaterialUpdate: () => void;
};
export declare class SourceMaterialFactory {
    private readonly _options;
    private _material;
    private _cachedConversionStrategy;
    private _activeConversionStep;
    private _activeConversionPass;
    constructor(_options: SourceMaterialFactoryOptions);
    invalidateMaterials(): void;
    clearStrategyCache(): void;
    getMaterial(): Material;
    getMaterials(): Material[];
    hasFrameOverrides(): boolean;
    createBaseUniforms(): Record<string, UniformValue>;
    get material(): Material | null;
    private _createMaterial;
    private _getConversionStepMaterial;
    private _getConversionStrategy;
    private _getActiveConversionStrategy;
    private _createConversionContext;
}
