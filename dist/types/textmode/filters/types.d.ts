/**
 * Built-in filter names provided by textmode.js
 */
export type BuiltInFilterName = 'invert' | 'grayscale' | 'sepia' | 'threshold';
/**
 * Filter name type that allows both built-in and custom filter names
 */
export type FilterName = BuiltInFilterName | string;
/**
 * Filter parameter types for built-in filters.
 *
 * Most filters accept either a single number (for the primary parameter)
 * or an object with named properties.
 */
export interface BuiltInFilterParams {
    /** Inverts all colors (no params needed) */
    invert: void;
    /** Converts to grayscale. Amount: 0-1, default 1 */
    grayscale: number | {
        amount?: number;
    } | void;
    /** Applies sepia tone. Amount: 0-1, default 1 */
    sepia: number | {
        amount?: number;
    } | void;
    /** Black/white threshold. Threshold: 0-1, default 0.5 */
    threshold: number | {
        threshold?: number;
    };
}
