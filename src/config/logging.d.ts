export declare let isVerbose: boolean;
export declare function setVerbose(enabled?: boolean): void;
export declare function error(fmt: string, ...args: any[]): void;
export declare function debug(fmt: string, ...args: any[]): void;
export declare function highlight(fmt: string, ...args: any[]): void;
export declare function success(fmt: string, ...args: any[]): void;
export declare function warning(fmt: string, ...args: any[]): void;
export declare function print(fmt: string, ...args: any[]): void;
export declare function data(fmt: string, ...args: any[]): void;
export declare function section(): void;
export declare type LoggerFunction = (fmt: string, ...args: any[]) => void;
/**
 * Create a logger output that features a constant prefix string.
 *
 * @param prefixString the prefix string to be appended before any log entry.
 * @param fn   the logger function to be used (typically one of the other functions in this module)
 *
 * @returns a new LoggerFunction.
 */
export declare function prefix(prefixString: string, fn: LoggerFunction): LoggerFunction;