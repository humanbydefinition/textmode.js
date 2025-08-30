import type { TXTGenerationOptions } from './types';
/**
 * Generates TXT content from character grid data.
 * This class handles the conversion of character arrays into formatted text strings.
 */
export declare class TXTContentGenerator {
    /**
     * Generates TXT content from a 2D character array
     * @param characterGrid 2D array of characters (rows x columns)
     * @param options Generation options
     * @returns TXT content as string
     */
    $generateTXTContent(characterGrid: string[][], options: TXTGenerationOptions): string;
}
