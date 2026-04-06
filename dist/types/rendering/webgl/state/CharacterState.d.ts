import type { RGB, RGBA } from '../../../utils/color';
import type { IRenderState } from './RenderState';
/**
 * Manages character rendering state: character, colors, flip, invert, rotation, and line weight.
 *
 * Extracted from RenderState to satisfy the Single Responsibility Principle.
 */
export declare class CharacterState {
    _currentLineWeight: number;
    _currentCharacter: RGB;
    _currentCharacterString: string;
    _currentCharColor: RGBA;
    _currentCellColor: RGBA;
    _flipHorizontally: boolean;
    _flipVertically: boolean;
    _invert: boolean;
    _charRotation: number;
    _canvasBackgroundColor: RGBA;
    /**
     * Copy character fields to a state snapshot.
     * Inlined array element copies for performance.
     */
    _copyToSnapshot(target: IRenderState): void;
    /**
     * Restore character fields from a state snapshot.
     * Inlined array element copies for performance.
     */
    _copyFromSnapshot(source: IRenderState): void;
    _setLineWeight(weight: number): void;
    _setCharacter(character: RGB): void;
    _setCharacterString(char: string): void;
    _setCharColor(r: number, g?: number, b?: number, a?: number): void;
    _setCellColor(r: number, g?: number, b?: number, a?: number): void;
    _setFlipHorizontally(flip: boolean): void;
    _setFlipVertically(flip: boolean): void;
    _setInvert(invert: boolean): void;
    _setCharRotation(rotation: number): void;
    _setCanvasBackground(r: number, g: number, b: number, a: number): void;
}
