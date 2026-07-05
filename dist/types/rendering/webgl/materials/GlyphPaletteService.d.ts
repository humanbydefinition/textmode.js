import type { TextmodeGlyphAtlas } from '../../../textmode/fonts/types';
import type { RGB } from '../../../utils/color';
export type ResolvedGlyphPalette = {
    readonly texture: WebGLTexture;
    readonly columns: number;
    readonly rows: number;
    readonly count: number;
    readonly key: string;
};
/**
 * Renderer-owned cache for glyph palette GPU textures.
 *
 * Media conversion and geometry texturing both ask this module to resolve
 * glyph RGB values into a sampler-ready palette, keeping palette upload policy
 * in one place.
 */
export declare class GlyphPaletteService {
    private readonly _gl;
    private readonly _entries;
    private readonly _atlasKeys;
    private readonly _capacity;
    private _clock;
    private _nextAtlasKey;
    constructor(_gl: WebGL2RenderingContext, capacity?: number);
    resolve(colors: RGB[], atlas?: TextmodeGlyphAtlas | null): ResolvedGlyphPalette;
    dispose(): void;
    get size(): number;
    private _upload;
    private _createData;
    private _normalizedColorByte;
    private _getMaxTextureSize;
    private _hash;
    private _sameData;
    private _getAtlasKey;
    private _objectKey;
    private _evictIfNeeded;
}
