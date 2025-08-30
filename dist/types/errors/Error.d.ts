export declare class TextmodeError extends Error {
    constructor(message: string, context?: any);
    /**
     * Create a formatted error message that includes context
     */
    static $createFormattedMessage(message: string, context?: any): string;
    /**
     * Format values for better display in error messages
     */
    private static _formatValue;
}
