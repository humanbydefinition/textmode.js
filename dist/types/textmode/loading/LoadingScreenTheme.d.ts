import type { LoadingScreenTheme, LoadingScreenOptions } from './types';
import type { Textmodifier } from '../Textmodifier';
import type { TextmodeColor } from '../TextmodeColor';
/**
 * Resolves the loading screen theme based on options and background color.
 * @param options Loading screen options.
 * @param background Background color as RGBA or null.
 * @returns The resolved loading screen theme.
 * @ignore
 */
export declare function $resolveTheme(options: LoadingScreenOptions, background: [number, number, number, number] | null): LoadingScreenTheme;
/**
 * Resolves the default color palette based on the theme mode.
 * @param theme The loading screen theme.
 * @returns An array of color strings representing the default palette.
 * @ignore
 */
export declare function $resolveDefaultPalette(theme: LoadingScreenTheme): string[];
/**
 * Resolves an array of color inputs into TextmodeColor instances.
 * @param inputs Input colors as numbers, strings, or TextmodeColor instances.
 * @param textmodifier The Textmodifier instance used to create TextmodeColor objects.
 * @returns An array of TextmodeColor instances.
 * @ignore
 */
export declare function $resolveColorInputs(inputs: (number | string | TextmodeColor)[], textmodifier: Textmodifier): TextmodeColor[];
