/**
 * @callback Reviver
 * @param {boolean | number | string} value Raw value
 * @param {number} row Row of the value
 * @param {number} col Column of the value
 * @returns {boolean | number | string} Transformed value
 */
/**
 * @typedef {object} ParserContext
 * @property {boolean} typed Enable type inference?
 * @property {Reviver} reviver Reviver function
 * @property {number} row Current row
 * @property {number} col Current column
 * @property {string} value Current value
 * @property {Array<boolean | number | string>} entry Current entry
 * @property {Array<Array<boolean | number | string>>} output Current output
 */
/**
 * Parse takes a string of CSV data and converts it to a 2 dimensional array
 * @static
 * @param {string} [csv] CSV string to parse
 * @param {object} [options] CSV 'parse' options
 * @param {boolean} [options.typed] Enable type inference?
 * @param {Reviver} [reviver] Custom function to modify the values
 * @returns {Array<Array<boolean | number | string>>} 2 dimensional array of `[entries][values]`
 */
export function parse(csv?: string, options?: {
    typed?: boolean | undefined;
}, reviver?: Reviver): Array<Array<boolean | number | string>>;
export type Reviver = (value: boolean | number | string, row: number, col: number) => boolean | number | string;
export type ParserContext = {
    /**
     * Enable type inference?
     */
    typed: boolean;
    /**
     * Reviver function
     */
    reviver: Reviver;
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
    entry: Array<boolean | number | string>;
    /**
     * Current output
     */
    output: Array<Array<boolean | number | string>>;
};
