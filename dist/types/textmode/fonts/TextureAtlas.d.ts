import type { GLRenderer } from '../../rendering/webgl/core/Renderer.ts';
import type { GLFramebuffer } from '../../rendering/webgl/core/Framebuffer.ts';
import { CanvasAtlasSurface } from './CanvasAtlasSurface.ts';
/**
 * Builds normalized glyph atlases from Typr outline data.
 */
export declare class TextureAtlas {
    _surface: CanvasAtlasSurface;
    /**
     * Creates a new TextureAtlas instance.
     * @param renderer The WebGL renderer instance
     */
    constructor(renderer: GLRenderer);
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
     * @param context Canvas 2D context to draw into
     * @param glyphData Glyph data from Typr.js
     * @param x X position
     * @param y Y position (baseline position)
     * @param scale Scale factor
     */
    private _renderGlyphToCanvas;
    /** Returns the WebGL framebuffer containing the glyph atlas. */
    get framebuffer(): GLFramebuffer | null;
    /** Returns the number of columns in the glyph atlas. */
    get columns(): number;
    /** Returns the number of rows in the glyph atlas. */
    get rows(): number;
}
