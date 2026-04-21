/**
 * @callback Replacer
 * @param {string} value Raw value
 * @param {number} row Row of the value
 * @param {number} col Column of the value
 * @returns {boolean | number | string} Transformed value
 */
/**
 * @typedef {object} StringifyContext
 * @property {boolean} eof Include a newline at the end-of-file?
 * @property {Replacer} replacer Replacer function
 * @property {number} row Current row
 * @property {number} col Current column
 * @property {string} value Current value
 * @property {string} entry Current entry
 * @property {string} output Current output
 */
/**
 * Stringify takes a 2 dimensional array of `[entries][values]` and converts them to CSV
 * @static
 * @param {string[][]} [array] CSV (2D) array to format
 * @param {object} [options] CSV 'stringify' options
 * @param {boolean} [options.eof] Include a newline at the end-of-file?
 * @param {Replacer} [replacer] Custom function to modify the values
 * @returns {string} CSV string
 */
export function stringify(array?: string[][], options?: {
    eof?: boolean | undefined;
}, replacer?: Replacer): string;
export type Replacer = (value: string, row: number, col: number) => boolean | number | string;
export type StringifyContext = {
    /**
     * Include a newline at the end-of-file?
     */
    eof: boolean;
    /**
     * Replacer function
     */
    replacer: Replacer;
    /**
     * Current row
     */
    row: number;
    /**
     * Current column
     */
    col: number;
    /**
     * Current value
     */
    value: string;
    /**
     * Current entry
     */
    entry: string;
    /**
     * Current output
     */
    output: string;
};
