import type { Textmodifier } from '../../Textmodifier';
import { type InputEventMap } from './InputEventRegistry';
type RoutableEmitter = {
    _on(event: PropertyKey, handler: unknown): () => void;
    _off(event: PropertyKey, handler: unknown): void;
    _once(event: PropertyKey, handler: unknown): () => void;
};
export declare function getInputEventEmitter<K extends keyof InputEventMap>(self: Textmodifier, event: K): RoutableEmitter;
export declare function installInputEventRouter(prototype: Textmodifier): void;
export {};
