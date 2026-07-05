import type { RGBA } from '../../../utils/color';
import type { TextmodeColorInput, TextmodeConversionMode, TextmodeConversionStep } from '../../conversion';
import type { GlyphPaletteTextureCache } from './GlyphPaletteTextureCache';
import type { SourceConversionState } from './SourceConversionState';
import type { NormalizedConversionStep } from './types';
export declare class ConversionStackState {
    private readonly _sourceState;
    private readonly _paletteCache;
    private readonly _resolveColor;
    private _conversionMode;
    private _frameConversionMode;
    private _conversionStack;
    private _frameConversionStack;
    constructor(_sourceState: SourceConversionState, _paletteCache: GlyphPaletteTextureCache, _resolveColor: (color: TextmodeColorInput) => RGBA);
    get conversionMode(): TextmodeConversionMode;
    setConversionMode(mode: TextmodeConversionMode, frame: boolean): void;
    setConversions(steps: TextmodeConversionStep[], frame: boolean): boolean;
    clearConversions(frame: boolean): void;
    clearFrameOverrides(): void;
    getActiveStack(): NormalizedConversionStep[] | null;
    getSingleMode(): TextmodeConversionMode;
    hasFrameOverrides(): boolean;
    invalidateMaterials(): void;
    refreshPalettes(): void;
    dispose(): void;
    get debugSnapshot(): {
        conversionMode: string;
        conversionStack: NormalizedConversionStep[] | null;
        frameConversionStack: NormalizedConversionStep[] | null;
    };
    private _normalizeStep;
    private _assertColorMode;
    private _normalizeOptions;
    private _normalizeBrightnessRange;
    private _refreshStackPalettes;
}
