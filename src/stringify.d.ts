/**
 * @typedef {object} Options
 * @property {boolean} [eof] include a newline at the end-of-file?
 */
/**
 * @callback Replacer
 * @param {string} value the value to be transformed
 * @param {number} row the row of the value
 * @param {number} col the column of the value
 * @returns {boolean | number | string} the transformed value
 */
/**
 * @typedef {object} StringifyContext
 * @property {boolean} eof include a newline at the end-of-file?
 * @property {Replacer} replacer a custom function to modify the values
 * @property {number} row the current row
 * @property {number} col the current column
 * @property {string} value the current value
 * @property {string} entry the current entry
 * @property {string} output the current output
 */
/**
 * Stringify takes a 2 dimensional array of `[entries][values]` and converts them to CSV
 * @static
 * @param {string[][]} [array] the input array to stringify
 * @param {Options} options an object containing the options
 * @param {Replacer} [replacer] a custom function to modify the values
 * @returns {string} the CSV string
 */
export function stringify(array?: string[][], options?: Options, replacer?: Replacer): string;
export type Options = {
    /**
     * include a newline at the end-of-file?
     */
    eof?: boolean | undefined;
};
export type Replacer = (value: string, row: number, col: number) => boolean | number | string;
export type StringifyContext = {
    /**
     * include a newline at the end-of-file?
     */
    eof: boolean;
    /**
     * a custom function to modify the values
     */
    replacer: Replacer;
    /**
     * the current row
     */
    row: number;
    /**
     * the current column
     */
    col: number;
    /**
     * the current value
     */
    value: string;
    /**
     * the current entry
     */
    entry: string;
    /**
     * the current output
     */
    output: string;
};
