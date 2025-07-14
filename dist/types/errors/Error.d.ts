export declare class TextmodeError extends Error {
    readonly originalError?: Error;
    readonly context?: any;
    constructor(message: string, originalError?: Error, context?: any);
    /**
     * Create a formatted error message that includes context
     */
    static createFormattedMessage(message: string, context?: any): string;
    /**
     * Format values for better display in error messages
     */
    private static formatValue;
}
