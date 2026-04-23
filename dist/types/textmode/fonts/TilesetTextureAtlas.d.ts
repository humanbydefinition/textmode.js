import type { TextmodeGlyph, GlyphDimensions } from './types.ts';
import type { GLRenderer } from '../../rendering/webgl/core/Renderer.ts';
import type { GLFramebuffer } from '../../rendering/webgl/core/Framebuffer.ts';
type ResolvedTilesetLayout = {
    columns: number;
    rows: number;
    marginX: number;
    marginY: number;
    spacingX: number;
    spacingY: number;
    cellWidth: number;
    cellHeight: number;
};
/**
 * Handles repacking authored tileset sheets into the normalized glyph atlas layout.
 */
export declare class TilesetTextureAtlas {
    private _textureCanvas;
    private _textureContext;
    private _renderer;
    private _framebuffer;
    private _columns;
    private _rows;
    constructor(renderer: GLRenderer);
    _createTextureAtlas(characters: readonly TextmodeGlyph[], nativeCellDimensions: GlyphDimensions, source: CanvasImageSource, layout: ResolvedTilesetLayout): void;
    _dispose(): void;
    private _setupCanvas;
    private _renderTiles;
    get framebuffer(): GLFramebuffer | null;
    get columns(): number;
    get rows(): number;
}
export type { ResolvedTilesetLayout };
