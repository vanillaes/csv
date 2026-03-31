/**
 * @typedef Options
 * @property {boolean} [typed] enable type inference?
 */
/**
 * @callback Reviver
 * @param {boolean | number | string} value the value to be transformed
 * @param {number} row the row of the value
 * @param {number} col the column of the value
 * @returns {boolean | number | string} the transformed value
 */
/**
 * @typedef {object} ParserContext
 * @property {boolean} typed enable type inference?
 * @property {Reviver} reviver the reviver function
 * @property {number} row the current row
 * @property {number} col the current column
 * @property {string} value the current value
 * @property {Array<boolean | number | string>} entry the current entry
 * @property {Array<Array<boolean | number | string>>} output the current output
 */
/**
 * Parse takes a string of CSV data and converts it to a 2 dimensional array
 * @static
 * @param {string} [csv] the CSV string to parse
 * @param {Options} [options] an object containing the options
 * @param {Reviver} [reviver] a custom function to modify the values
 * @returns {Array<Array<boolean | number | string>>} a 2 dimensional array of `[entries][values]`
 */
export function parse(csv?: string, options?: Options, reviver?: Reviver): Array<Array<boolean | number | string>>;
export type Options = {
    /**
     * enable type inference?
     */
    typed?: boolean | undefined;
};
export type Reviver = (value: boolean | number | string, row: number, col: number) => boolean | number | string;
export type ParserContext = {
    /**
     * enable type inference?
     */
    typed: boolean;
    /**
     * the reviver function
     */
    reviver: Reviver;
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
    entry: Array<boolean | number | string>;
    /**
     * the current output
     */
    output: Array<Array<boolean | number | string>>;
};
