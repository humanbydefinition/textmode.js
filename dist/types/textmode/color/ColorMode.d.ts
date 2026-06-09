import type { RGBA, TextmodeColorTuple } from '../../utils/color';
/**
 * Color interpretation mode used by {@link Textmodifier.colorMode}.
 */
export type TextmodeColorMode = 'rgb' | 'hsb' | 'hsl';
/**
 * Current color mode and channel maximums used by color parsing APIs.
 */
export type TextmodeColorModeState = {
    /** Active color interpretation mode. */
    mode: TextmodeColorMode;
    /** Maximum values for channels 1, 2, 3, and alpha. */
    maxes: [number, number, number, number];
};
export declare function getDefaultColorModeMaxes(mode: TextmodeColorMode): [number, number, number, number];
export declare function createDefaultColorModeState(): TextmodeColorModeState;
export declare function createColorModeState(mode: TextmodeColorMode, max1?: number, max2?: number, max3?: number, maxA?: number): TextmodeColorModeState;
export declare function resolveNumericColor(value: number | TextmodeColorTuple, g: number | undefined, b: number | undefined, a: number | undefined, state: TextmodeColorModeState): RGBA;
