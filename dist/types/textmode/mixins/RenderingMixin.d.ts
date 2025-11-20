import type { Mixin } from './TextmodifierMixin';
import type { IRenderingMixin } from './interfaces/IRenderingMixin';
/**
 * Mixin that adds rendering capabilities to a class by delegating to GLRenderer
 * @param Base The base class to extend
 * @returns Extended class with rendering capabilities
 */
export declare const RenderingMixin: Mixin<IRenderingMixin>;
