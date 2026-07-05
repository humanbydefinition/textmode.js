import type { RGB } from '../../../utils/color';
import type { TextmodeGlyphAtlas } from '../../fonts/types';
import type { GlyphPaletteService } from '../../../rendering/webgl/materials/GlyphPaletteService';
import type { CharacterPaletteTexture, NormalizedConversionStep } from './types';
export declare class GlyphPaletteTextureCache {
    private readonly _service;
    private _basePalette;
    private _framePalette;
    private _baseDirty;
    private _frameDirty;
    private _activeGlyphAtlas;
    constructor(_service: GlyphPaletteService);
    setActiveGlyphAtlas(atlas: TextmodeGlyphAtlas): void;
    markBaseDirty(): void;
    markFrameDirty(): void;
    clearFrame(): void;
    getBase(colors: RGB[]): CharacterPaletteTexture;
    getFrame(colors: RGB[]): CharacterPaletteTexture;
    getStep(step: NormalizedConversionStep, colors: RGB[]): CharacterPaletteTexture;
    disposeStep(step: NormalizedConversionStep): void;
    disposeStack(stack: NormalizedConversionStep[] | null): void;
    disposeAll(): void;
    get basePalette(): CharacterPaletteTexture | null;
    get framePalette(): CharacterPaletteTexture | null;
    private _upload;
}
