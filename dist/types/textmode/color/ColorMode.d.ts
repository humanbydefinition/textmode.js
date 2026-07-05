import type { RGBA, TextmodeColorTuple } from '../../utils/color';
/**
 * Color interpretation mode used by {@link Textmodifier.colorMode}.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color/type-aliases/TextmodeColorMode | color.TextmodeColorMode API reference}
 */
export type TextmodeColorMode = 'rgb' | 'hsb' | 'hsl';
/**
 * Current color mode and channel maximums used by color parsing APIs.
 *
 * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color/type-aliases/TextmodeColorModeState | color.TextmodeColorModeState API reference}
 */
export type TextmodeColorModeState = {
    /**
     * Active color interpretation mode.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color/type-aliases/TextmodeColorModeState#mode | color.TextmodeColorModeState.mode API reference}
     */
    mode: TextmodeColorMode;
    /**
     * Maximum values for channels 1, 2, 3, and alpha.
     *
     * @see {@link https://code.textmode.art/api/textmode.js/namespaces/color/type-aliases/TextmodeColorModeState#maxes | color.TextmodeColorModeState.maxes API reference}
     */
    maxes: [number, number, number, number];
};
export declare function getDefaultColorModeMaxes(mode: TextmodeColorMode): [number, number, number, number];
export declare function createDefaultColorModeState(): TextmodeColorModeState;
export declare function createColorModeState(mode: TextmodeColorMode, max1?: number, max2?: number, max3?: number, maxA?: number): TextmodeColorModeState;
export declare function resolveNumericColor(value: number | TextmodeColorTuple, g: number | undefined, b: number | undefined, a: number | undefined, state: TextmodeColorModeState): RGBA;
