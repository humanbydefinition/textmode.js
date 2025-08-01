import type { TextmodeCharacter, GlyphDimensions } from './types.ts';
import type { GLRenderer } from '../../rendering/webgl/Renderer.ts';
import type { Framebuffer } from '../../rendering/webgl/Framebuffer.ts';
/**
 * Handles creation of texture atlases for font rendering.
 * This class manages the Canvas 2D rendering and WebGL framebuffer creation.
 */
export declare class TextureAtlasCreation {
    private _textureCanvas;
    private _textureContext;
    private _renderer;
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
     * @param fontFamilyName Font family name to use
     * @returns Object containing framebuffer, columns, and rows
     */
    createTextureAtlas(characters: TextmodeCharacter[], maxGlyphDimensions: GlyphDimensions, fontSize: number, fontFamilyName: string): {
        framebuffer: Framebuffer;
        columns: number;
        rows: number;
    };
    /**
     * Sets up the canvas for rendering.
     * @param width Canvas buffer width
     * @param height Canvas buffer height
     * @param fontSize Font size
     * @param fontFamilyName Font family name
     * @param logicalWidth Logical width for scaling context
     * @param logicalHeight Logical height for scaling context
     */
    private _setupCanvas;
    /**
     * Renders all characters to the canvas in a grid layout.
     * @param characters Array of characters to render
     * @param maxGlyphDimensions Maximum glyph dimensions
     * @param textureColumns Number of columns in the texture
     * @param fontSize Font size
     */
    private _renderCharactersToCanvas;
    /**
     * Applies a black and white threshold filter to the canvas.
     * This converts antialiased grayscale pixels to pure black or white,
     * ensuring crisp text rendering suitable for NEAREST texture filtering.
     * @param threshold Threshold value (0-255) for black/white conversion
     */
    private _applyBlackWhiteThreshold;
}
