import type { IRenderState } from './RenderState';
export declare const TM_MAX_POINT_LIGHTS = 5;
/**
 * Manages lighting state: ambient light, point lights, colors, falloff, and version tracking.
 *
 * Extracted from RenderState to satisfy the Single Responsibility Principle.
 */
export declare class LightingState {
    _ambientLightColor: Float32Array;
    _pointLightCount: number;
    _pointLightPositions: Float32Array;
    _pointLightColors: Float32Array;
    _lightFalloff: Float32Array;
    _lightingVersion: number;
    /**
     * Copy lighting fields to a state snapshot.
     * Inlined array copies for CPU cache efficiency.
     */
    _copyToSnapshot(target: IRenderState): void;
    /**
     * Restore lighting fields from a state snapshot.
     * Inlined array copies for CPU cache efficiency.
     */
    _copyFromSnapshot(source: IRenderState): void;
    _ambientLight(r: number, g: number, b: number): void;
    _pointLight(r: number, g: number, b: number, x: number, y: number, z: number): void;
    _updateLightFalloff(constant: number, linear: number, quadratic: number): void;
    _noLights(): void;
    _resetFrameLights(): void;
}
