/**
 * Base types and utilities for the mixin system
 */
import type { ITextmodifier } from '../interfaces';
/**
 * Constructor type for mixin pattern
 */
export type Constructor<T = {}> = new (...args: any[]) => T;
/**
 * Mixin function type that takes a base class and returns an extended class
 */
export type Mixin<T> = <TBase extends Constructor<ITextmodifier>>(Base: TBase) => TBase & Constructor<T>;
/**
 * Simple utility function to apply multiple mixins to a base class
 * @param Base The base class to extend
 * @param mixins Array of mixin functions to apply
 * @returns The composed class with all mixins applied
 */
export declare function $applyMixins<T extends Constructor>(Base: T, ...mixins: any[]): T;
