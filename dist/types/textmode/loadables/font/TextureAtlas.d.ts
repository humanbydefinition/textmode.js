import type { TextmodeCharacter, GlyphDimensions } from './types.ts';
import type { GLRenderer } from '../../../rendering/webgl/core/Renderer.ts';
import type { GLFramebuffer } from '../../../rendering/webgl/core/Framebuffer.ts';
import type { TyprFont } from './typr/types.ts';
/**
 * Handles creation of texture atlases for font rendering.
 * This class manages the Canvas 2D rendering and WebGL framebuffer creation.
 * Supports both Typr.js path-based rendering for uniform cross-browser text
 * and fallback fillText rendering.
 */
export declare class TextureAtlas {
    private _textureCanvas;
    private _textureContext;
    private _renderer;
    private _framebuffer;
    private _columns;
    private _rows;
    /**
     * Creates a new TextureAtlasCreation instance.
     * @param renderer The WebGL renderer instance
     */
    constructor(renderer: GLRenderer);
    /**
     * Creates or updates the texture atlas from the given characters.
     * Reuses the existing framebuffer if possible, resizing if dimensions change.
     * @param characters Array of TextmodeCharacter objects
     * @param maxGlyphDimensions Maximum dimensions of glyphs
     * @param fontSize Font size for rendering
     * @param font Typr.js font data object for path rendering
     */
    $createTextureAtlas(characters: TextmodeCharacter[], maxGlyphDimensions: GlyphDimensions, fontSize: number, font: TyprFont): void;
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
     * Renders a glyph to the canvas using direct path rendering from glyph outline data.
     * @param glyphData Glyph data from Typr.js
     * @param x X position
     * @param y Y position (baseline position)
     * @param scale Scale factor
     */
    private _renderGlyphToCanvas;
    /**
     * Disposes of the texture atlas resources.
     * @ignore
     */
    $dispose(): void;
    /** Returns the WebGL framebuffer containing the texture atlas. */
    get framebuffer(): GLFramebuffer | null;
    /** Returns the number of columns in the texture atlas. */
    get columns(): number;
    /** Returns the number of rows in the texture atlas. */
    get rows(): number;
}
