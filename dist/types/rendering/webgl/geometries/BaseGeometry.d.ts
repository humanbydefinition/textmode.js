/**
 * Base class for WebGL geometry rendering with shared vertex buffer management
 */
export declare abstract class BaseGeometry {
    protected _gl: WebGLRenderingContext;
    protected _unitBuffer: WebGLBuffer | null;
    protected _bytesPerVertex: number;
    private _attribCache;
    constructor(gl: WebGLRenderingContext);
    /**
     * Ensure the unit buffer is created and bound
     */
    protected _ensureUnitBuffer(): void;
    /**
     * Enable vertex attributes and return their locations
     */
    protected _enableAttribs(): {
        positionLoc: number;
        texLoc: number;
    };
    /**
     * Disable vertex attributes
     */
    protected _disableAttribs(positionLoc: number, texLoc: number): void;
    /**
     * Convert screen coordinates to NDC (Normalized Device Coordinates)
     */
    protected _toNDC(x: number, y: number): {
        nx: number;
        ny: number;
    };
    /**
     * Upload quad vertices to the buffer in NDC coordinates
     */
    protected _uploadQuadNDC(x1: number, y1: number, x2: number, y2: number): void;
    /**
     * Dispose of WebGL resources used by this geometry
     */
    $dispose(): void;
}
