import type { GLRenderer } from '../core/Renderer';
import type { Material } from './Material';
import type { FramebufferGeometryTextureState, SourceGeometryTextureState } from '../state/TextureState';
type TexturedMaterialState = SourceGeometryTextureState | FramebufferGeometryTextureState;
export declare class TexturedMaterialCache {
    private readonly _renderer;
    private readonly _materials;
    private readonly _objectKeys;
    private _nextObjectKey;
    constructor(_renderer: GLRenderer);
    materialFor(state: TexturedMaterialState): Material;
    dispose(): void;
    get size(): number;
    private _signature;
    private _textureKey;
    private _objectKey;
}
export {};
