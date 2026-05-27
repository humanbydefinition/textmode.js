import { Textmodifier } from '../Textmodifier';
import { TextmodeColor } from '../color';
import type { InputEventName } from '../input/core/InputEventRegistry';
interface PrototypeGetterDefinition {
    name: string;
    get(this: Textmodifier): unknown;
}
type ColorStateMethod = {
    (this: Textmodifier): TextmodeColor;
    (this: Textmodifier, gray: number, alpha?: number): void;
    (this: Textmodifier, r: number, g: number, b: number, a?: number): void;
    (this: Textmodifier, value: string | TextmodeColor): void;
};
export declare function installSingleCallbackMethods(events: readonly InputEventName[]): void;
export declare function installPrototypeGetters(getters: readonly PrototypeGetterDefinition[]): void;
export declare function installPrototypeAlias(alias: string, canonical: string): void;
export declare function createColorStateMethod(getNormalizedColor: (this: Textmodifier) => readonly [number, number, number, number], setColor: (this: Textmodifier, color: TextmodeColor) => void): ColorStateMethod;
export {};
