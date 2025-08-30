/**
 * Font-related constants and configuration values.
 * Centralizes magic numbers and configuration to improve maintainability.
 */
/**
 * Character mapping platform and encoding preferences.
 * Ordered by preference for Unicode character mapping.
 */
export declare const CMAP_PLATFORM_PREFERENCES: readonly ["p3e1", "p3e10", "p0e3", "p0e4"];
/**
 * Control characters that are allowed in text rendering.
 * Most control characters are filtered out, but these common ones are preserved.
 */
export declare const ALLOWED_CONTROL_CHARACTERS: readonly [9, 10, 13];
/**
 * Character code ranges to filter out during character extraction.
 */
export declare const FILTERED_CHARACTER_RANGES: readonly [{
    readonly start: 0;
    readonly end: 31;
}, {
    readonly start: 127;
    readonly end: 159;
}];
/**
 * Font table format constants.
 */
export declare const CMAP_FORMATS: {
    readonly BMP_UNICODE: 4;
    readonly FULL_UNICODE: 12;
};
/**
 * Default font metrics and sizing constants.
 */
export declare const FONT_DEFAULTS: {
    readonly SIZE: 16;
    readonly FAMILY_NAME: "UrsaFont";
    readonly ATLAS_PADDING: 1;
};
/**
 * Cache size limits to prevent excessive memory usage.
 */
export declare const CACHE_LIMITS: {
    readonly GLYPH_INDEX_CACHE: 10000;
    readonly CMAP_TABLE_CACHE: 100;
    readonly FONT_METRICS_CACHE: 1000;
};
/**
 * Sentinel values used in font tables.
 */
export declare const FONT_SENTINELS: {
    readonly CMAP_END_MARKER: 65535;
};
/**
 * WebGL texture configuration for font atlases.
 */
export declare const TEXTURE_CONFIG: {
    readonly FILTER: "nearest";
    readonly WRAP: "clamp-to-edge";
};
