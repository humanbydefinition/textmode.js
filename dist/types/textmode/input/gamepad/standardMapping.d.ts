import type { TextmodeStandardAxisName, TextmodeStandardButtonName } from './types';
export declare const STANDARD_BUTTON_INDICES: {
    readonly south: 0;
    readonly east: 1;
    readonly west: 2;
    readonly north: 3;
    readonly l1: 4;
    readonly r1: 5;
    readonly l2: 6;
    readonly r2: 7;
    readonly select: 8;
    readonly start: 9;
    readonly leftStickPress: 10;
    readonly rightStickPress: 11;
    readonly dpadUp: 12;
    readonly dpadDown: 13;
    readonly dpadLeft: 14;
    readonly dpadRight: 15;
    readonly home: 16;
};
export declare const STANDARD_AXIS_INDICES: {
    readonly leftStickX: 0;
    readonly leftStickY: 1;
    readonly rightStickX: 2;
    readonly rightStickY: 3;
};
export declare function getStandardButtonName(buttonIndex: number, mapping: '' | 'standard'): TextmodeStandardButtonName | undefined;
export declare function getStandardAxisName(axisIndex: number, mapping: '' | 'standard'): TextmodeStandardAxisName | undefined;
