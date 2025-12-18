/**
 * Generic hashing utilities for creating stable hash codes from various data types.
 *
 * These functions are useful for:
 * - Object deduplication (e.g., materials, shaders)
 * - Cache keys
 * - Fast equality comparisons
 *
 * Hash algorithm: Simple 32-bit integer hash with good distribution.
 * Not cryptographically secure, but fast and collision-resistant for typical use cases.
 */
/**
 * Hash a string to a 32-bit integer.
 * Uses the djb2 algorithm variant.
 *
 * @param str - String to hash
 * @returns 32-bit integer hash
 *
 * @example
 * ```ts
 * hashString("hello") // → 99162322
 * hashString("world") // → 113318802
 * ```
 */
export declare function hashString(str: string): number;
/**
 * Hash a number or boolean to an integer.
 * Booleans are converted to 0/1.
 *
 * @param value - Number or boolean to hash
 * @returns Integer hash
 *
 * @example
 * ```ts
 * hashNumber(42)    // → 42
 * hashNumber(3.14)  // → 3
 * hashNumber(true)  // → 1
 * hashNumber(false) // → 0
 * ```
 */
export declare function hashNumber(value: number | boolean): number;
/**
 * Hash an array of numbers.
 * Supports nested arrays (will be flattened).
 *
 * @param arr - Array of numbers or nested arrays
 * @returns Combined hash of all elements
 *
 * @example
 * ```ts
 * hashArray([1, 2, 3])           // → computed hash
 * hashArray([[1, 2], [3, 4]])    // → computed hash (flattened)
 * ```
 */
export declare function hashArray(arr: number[] | number[][]): number;
/**
 * Hash a typed array (Float32Array or Int32Array).
 * For performance, only hashes the first 16 elements for large arrays.
 *
 * @param arr - Typed array to hash
 * @returns Combined hash
 *
 * @example
 * ```ts
 * const arr = new Float32Array([1.0, 2.0, 3.0]);
 * hashTypedArray(arr) // → computed hash
 * ```
 */
export declare function hashTypedArray(arr: Float32Array | Int32Array): number;
export declare function hashObject(obj: any): number;
/**
 * Combine two hash values into a single hash.
 * Uses a simple but effective combination strategy.
 *
 * @param hash1 - First hash value
 * @param hash2 - Second hash value
 * @returns Combined hash
 *
 * @example
 * ```ts
 * const h1 = hashString("hello");
 * const h2 = hashString("world");
 * const combined = combineHashes(h1, h2);
 * ```
 */
export declare function combineHashes(hash1: number, hash2: number): number;
/**
 * Hash a record/object by hashing its sorted keys and values.
 * Keys are sorted to ensure consistent hashing regardless of property order.
 *
 * @param record - Record to hash
 * @param valueHasher - Function to hash each value
 * @returns Combined hash of all key-value pairs
 *
 * @example
 * ```ts
 * const obj = { b: 2, a: 1, c: 3 };
 * const hash = hashRecord(obj, hashNumber);
 * // Keys are sorted: a, b, c → consistent hash
 * ```
 */
export declare function hashRecord<T>(record: Record<string, T>, valueHasher: (value: T) => number): number;
