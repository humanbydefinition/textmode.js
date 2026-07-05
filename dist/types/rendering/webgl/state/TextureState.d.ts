import type { TextmodeSource } from '../../../textmode/media/TextmodeSource';
import type { RGBA } from '../../../utils/color';
import type { GLFramebuffer } from '../core/Framebuffer';
import type { IRenderState } from './RenderState';
export type GeometryGlyphPalette = {
    texture: WebGLTexture;
    columns: number;
    rows: number;
    count: number;
};
export type SourceGeometryTextureState = {
    kind: 'source';
    source: TextmodeSource;
    palette: GeometryGlyphPalette;
    brightnessStart: number;
    brightnessEnd: number;
    invert: boolean;
    flipX: boolean;
    flipY: boolean;
    charRotation: number;
    charColorMode: 'sampled' | 'fixed';
    cellColorMode: 'sampled' | 'fixed';
    charColor: RGBA;
    cellColor: RGBA;
};
export type FramebufferGeometryTextureState = {
    kind: 'framebuffer';
    framebuffer: GLFramebuffer;
    textures: WebGLTexture[];
    width: number;
    height: number;
    attachmentCount: number;
};
export type EmptyGeometryTextureState = {
    kind: 'none';
    source: null;
    framebuffer: null;
};
export type NormalizedGeometryTextureState = SourceGeometryTextureState | FramebufferGeometryTextureState | EmptyGeometryTextureState;
export declare function createEmptyGeometryTextureState(): EmptyGeometryTextureState;
export declare function createGeometryTextureSnapshotSlot(): NormalizedGeometryTextureState;
export declare class TextureState {
    private readonly _current;
    _version: number;
    constructor();
    _setSourceTexture(textureState: SourceGeometryTextureState): void;
    _setFramebufferTexture(framebuffer: GLFramebuffer): void;
    _clearTexture(): void;
    _copyToSnapshot(target: IRenderState): void;
    _copyFromSnapshot(source: IRenderState): void;
    get current(): NormalizedGeometryTextureState;
}
