import type { TextmodeCharacter, GlyphDimensions } from './types.ts';
import type { GLRenderer } from '../../rendering/webgl/Renderer.ts';
import type { GLFramebuffer } from '../../rendering/webgl/Framebuffer.ts';
import type { TyprFont } from './typr/types.ts';
/**
 * Handles creation of texture atlases for font rendering.
 * This class manages the Canvas 2D rendering and WebGL framebuffer creation.
 * Supports both Typr.js path-based rendering for uniform cross-browser text
 * and fallback fillText rendering.
 */
export declare class TextureAtlasCreation {
    private _textureCanvas;
    private _textureContext;
    private _renderer;
    private _fontTableReader;
    /**
     * Creates a new TextureAtlasCreation instance.
     * @param renderer The WebGL renderer instance
     */
    constructor(renderer: GLRenderer);
    /**
     * Creates a texture atlas from the given characters.
     * @param characters Array of TextmodeCharacter objects
     * @param maxGlyphDimensions Maximum dimensions of glyphs
     * @param fontSize Font size for rendering
     * @param fontDataOrFamilyName Either Typr.js font data object for path rendering, or font family name string for fillText rendering
     * @returns Object containing framebuffer, columns, and rows
     */
    createTextureAtlas(characters: TextmodeCharacter[], maxGlyphDimensions: GlyphDimensions, fontSize: number, fontDataOrFamilyName: TyprFont | string): {
        framebuffer: GLFramebuffer;
        columns: number;
        rows: number;
    };
    /**
     * Sets up the canvas for rendering.
     * @param width Canvas buffer width
     * @param height Canvas buffer height
     */
    private _setupCanvas;
    /**
     * Renders all characters to the canvas in a grid layout using Typr.js paths.
     * @param characters Array of characters to render
     * @param maxGlyphDimensions Maximum glyph dimensions
     * @param textureColumns Number of columns in the texture
     * @param fontSize Font size
     * @param fontData Typr.js font data
     */
    private _renderCharacters;
    /**
     * Gets glyph data for a character using Typr.js
     * @param fontData Typr.js font data
     * @param character Character to get glyph data for
     * @returns Parsed glyph data or null if not found
     */
    private _getGlyphData;
    /**
     * Gets the advance width for a glyph
     * @param fontData The Typr.js font data
     * @param glyphIndex The glyph index
     * @returns The advance width in font units
     */
    private _getGlyphAdvanceWidth;
    /**
     * Renders a glyph to the canvas using direct path rendering from glyph outline data.
     * @param glyphData Glyph data from Typr.js
     * @param x X position
     * @param y Y position (baseline position)
     * @param scale Scale factor
     */
    private _renderGlyphToCanvas;
}
